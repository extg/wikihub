import path from 'path'
import Promise from 'bluebird'
import parseDuration from 'parse-duration'
import {
  map,
  filter,
  defaultTo,
} from 'ramda'

import {authorizeByJwt} from '../google-api/authorize'
import {getTable} from '../google-api/spreadsheets'
import {splitTags} from '../database/sync/helpers'

const SCOPES = process.env.GOOGLE_API_SCOPES
const SPREADSHEET_ID = process.env.GOOGLE_API_SPREADSHEET_ID
const EVENTS_RANGE = process.env.GOOGLE_API_EVENTS_RANGE
const MEMBERS_RANGE = process.env.GOOGLE_API_MEMBERS_RANGE
const GROUPS_RANGE = process.env.GOOGLE_API_GROUPS_RANGE
const EXPIRATION_INTERVAL = process.env.GOOGLE_API_EXPIRATION_INTERVAL
const GOOGLE_API_LOGIN_CREDENTIALS_PATH = path.resolve(process.env.GOOGLE_API_LOGIN_CREDENTIALS_PATH)

// TODO: require from root
const LOGIN_CREDENTIALS = require(GOOGLE_API_LOGIN_CREDENTIALS_PATH)

let lastUpdateTime = new Date()

function needsUpdates(
  lastTime = lastUpdateTime,
  currentTime = new Date(),
  period = parseDuration(EXPIRATION_INTERVAL),
) {
  return (currentTime.getTime() - lastTime.getTime()) > period
}

const filterVisible = filter(row => row.visible)

const defaultToArray = defaultTo([])

const mapMembers = map(row => {
  const [
    id,
    name,
    job,
    imageUrl,
    ability,
    email,
    tel,
    vkUrl,
    fbUrl,
    igUrl,
    siteUrl,
    tags,
    additionalInfo,
    city,
    visible,
  ] = row

  return {
    id: Number(id),
    name,
    job,
    imageUrl,
    ability,
    email,
    tel,
    vkUrl,
    fbUrl,
    igUrl,
    siteUrl,
    tags,
    additionalInfo,
    city,
    visible: visible === '1',
  }
})

const mapGroups = map(row => {
  const [
    id,
    title,
    imageUrl,
    description,
    lineup,
    siteUrl,
    sum,
    vkUrl,
    fbUrl,
    igUrl,
    contacts,
    tags,
    region,
    goals,
    values,
    possibilities,
    benefits,
    needs,
    representativeOfTheManagement,
    officialContacts,
    roundedIn,
    updatedAt,
    visible,
    city,
  ] = row

  return {
    id: Number(id),
    title,
    imageUrl,
    lineup,
    sum,
    visible: visible === '1',
    tags,
    vkUrl,
    fbUrl,
    igUrl,
    siteUrl,
    contacts,
    description,
    region,
    goals,
    values,
    possibilities,
    benefits,
    needs,
    representativeOfTheManagement,
    officialContacts,
    roundedIn,
    updatedAt,
    city,
  }
})

function mapEvents(data = []) {
  // console.log(data)

  return data.map(row => {
    const [
      id,
      title,
      type,
      startDate,
      endDate,
      startTime,
      endTime,
      city,
      venueName,
      venueAddress,
      hostedBy,
      siteUrl,
      tags,
      visible,
    ] = row

    return {
      id,
      title,
      type,
      dates: [{date: startDate, startTime, endTime}],
      location: {name: venueName, city, address: venueAddress},
      company: hostedBy,
      tags: splitTags(tags),
      startDate,
      endDate,
      startTime,
      endTime,
      visible: visible === '1',
    }
  })
}

const getEvents = () =>
  getSpreadsheet(EVENTS_RANGE)
    .then(defaultToArray)
    .then(mapEvents)
    .then(filterVisible)

const getMembers = () =>
  getSpreadsheet(MEMBERS_RANGE)
    .then(defaultToArray)
    .then(mapMembers)
    .then(filterVisible)

const getGroups = () =>
  getSpreadsheet(GROUPS_RANGE)
    .then(defaultToArray)
    .then(mapGroups)
    .then(filterVisible)

function getSpreadsheet(range) {
  return (
    authorizeByJwt(LOGIN_CREDENTIALS, SCOPES)
      .then(auth => ({
        auth,
        spreadsheetId: SPREADSHEET_ID,
        range,
      }))
      .then(getTable)
      .catch(err => {
        console.error(err) // eslint-disable-line no-console
      })
  )
}

export function loadData() {
  return Promise.props({
    events: getEvents(),
    members: getMembers(),
    groups: getGroups(),
  }).then(data => {
    // global variable for needsUpdates function
    lastUpdateTime = new Date()

    return data
  })
}

export default function makeGoogleApiMiddleware() {
  let storage = loadData()

  // TODO: сделать чтобы данные начинали загружаться асинхронно
  // в то время как отдаются старые
  return function googleApiMiddleware(req, res, next) {
    const result = needsUpdates()
      ? loadData()
      : storage

    result
      .then(function (data) {
        storage = Promise.resolve(data)
        res.locals.googleApiData = data

        next()
      })
      .catch(function (err) {
        next(err)
      })
  }
}
