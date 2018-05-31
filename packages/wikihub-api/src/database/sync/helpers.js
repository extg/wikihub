import chalk from 'chalk'
import mysql from 'mysql2'
import {
  pipe,
  map,
  reduce,
  uniq,
  uniqBy,
  equals,
  filter,
  find,
  propEq,
  values,
} from 'ramda'
import moment from 'moment'

// tests for splitTags
function splitTagsSpec() {
  const tagsSets = [
    [
      'tag1',
      'tag1 ',
      '#tag1',
      '#tag1 ',
    ],
    [
      'tag1 tag2',
      'tag1  tag2',
      'tag1   tag2',
      'tag1   tag2 ',
      'tag1,tag2',
      'tag1,,tag2',
      'tag1,,,tag2',
      'tag1, tag2',
      'tag1 ,tag2',
      'tag1 , tag2',
      'tag1, tag2',
      'tag1 ,tag2',
      'tag1 , tag2',
      'tag1,  tag2',
      'tag1  ,tag2',
      'tag1  ,  tag2',
      'tag1,  tag2',
      'tag1  ,tag2',
      'tag1  ,  tag2',
      'tag1  ,  tag2 ',
      '#tag1 #tag2',
      '#tag1  #tag2',
      '#tag1   #tag2',
      '#tag1   #tag2 ',
      '#tag1,#tag2',
      '#tag1,,#tag2',
      '#tag1,,,#tag2',
      '#tag1, #tag2',
      '#tag1 ,#tag2',
      '#tag1 , #tag2',
      '#tag1, #tag2',
      '#tag1 ,#tag2',
      '#tag1 , #tag2',
      '#tag1,  #tag2',
      '#tag1  ,#tag2',
      '#tag1  ,  #tag2',
      '#tag1,  #tag2',
      '#tag1  ,#tag2',
      '#tag1  ,  #tag2',
      '#tag1  ,  #tag2 ',
    ],
    [
      'tag1 tag2 tag3 tag4',
      'tag1  tag2  tag3  tag4',
      'tag1   tag2   tag3   tag4',
      'tag1   tag2   tag3   tag4 ',
      'tag1,tag2,tag3,tag4',
      'tag1,,tag2,,tag3,,tag4',
      'tag1,,,tag2,,,tag3,,,tag4',
      'tag1, tag2, tag3, tag4',
      'tag1 ,tag2 ,tag3 ,tag4',
      'tag1 , tag2 , tag3 , tag4',
      'tag1, tag2, tag3, tag4',
      'tag1 ,tag2 ,tag3 ,tag4',
      'tag1 , tag2 , tag3 , tag4',
      'tag1,  tag2,  tag3,  tag4',
      'tag1  ,tag2  ,tag3  ,tag4',
      'tag1  ,  tag2  ,  tag3  ,  tag4',
      'tag1,  tag2,  tag3,  tag4',
      'tag1  ,tag2  ,tag3  ,tag4',
      'tag1  ,  tag2  ,  tag3  ,  tag4',
      'tag1  ,  tag2  ,  tag3  ,  tag4 ',
      '#tag1 #tag2 #tag3 #tag4',
      '#tag1  #tag2  #tag3  #tag4',
      '#tag1   #tag2   #tag3   #tag4',
      '#tag1   #tag2   #tag3   #tag4 ',
      '#tag1,#tag2,#tag3,#tag4',
      '#tag1,,#tag2,,#tag3,,#tag4',
      '#tag1,,,#tag2,,,#tag3,,,#tag4',
      '#tag1, #tag2, #tag3, #tag4',
      '#tag1 ,#tag2 ,#tag3 ,#tag4',
      '#tag1 , #tag2 , #tag3 , #tag4',
      '#tag1, #tag2, #tag3, #tag4',
      '#tag1 ,#tag2 ,#tag3 ,#tag4',
      '#tag1 , #tag2 , #tag3 , #tag4',
      '#tag1,  #tag2,  #tag3,  #tag4',
      '#tag1  ,#tag2  ,#tag3  ,#tag4',
      '#tag1  ,  #tag2  ,  #tag3  ,  #tag4',
      '#tag1,  #tag2,  #tag3,  #tag4',
      '#tag1  ,#tag2  ,#tag3  ,#tag4',
      '#tag1  ,  #tag2  ,  #tag3  ,  #tag4',
      '#tag1  ,  #tag2  ,  #tag3  ,  #tag4 ',
      '#tag1  #tag2  #tag3  #tag4',
      '#tag1   #tag2   #tag3   #tag4',
      '#tag1   #tag2   #tag3   #tag4 ',
    ]
  ]
  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  function testTags(tagsSet, match) {
    tagsSet.forEach(tags => {
      const result = splitTags(tags)

      arraysEqual(result, match)
        ? console.log(chalk.green('.'), tags, result, match)
        : console.log(chalk.red('?'), tags, result, match)
    })
  }

  testTags(tagsSets[0], ['tag1'])
  testTags(tagsSets[1], ['tag1', 'tag2'])
  testTags(tagsSets[2], ['tag1', 'tag2', 'tag3', 'tag4'])
  testTags(['Образование'], ['образование'])
}
// splitTagsSpec()

function findByKey(key, value, obj) {
  return find(propEq(key, value), obj)
}

export function splitTags(tags) {
  if (Array.isArray(tags)) {
    return tags
  }

  return (tags && typeof tags === 'string')
    ? tags
      .toLocaleLowerCase()
      .toLowerCase()
      .replace(/#?([a-zа-я_]+)/g, '$1')
      .split(/\s*,+\s*|\s+/g)
      .filter(Boolean)
    : []
}

export const getAllTags = pipe(
  reduce((result, item) => result.concat(splitTags(item.tags)), []),
  uniq,
  filter(Boolean),
)

export const getAllVenues = pipe(
  reduce((result, {location: {city, name, address}}) => result.concat({city, name, address}), []),
  uniqBy(equals),
  filter(Boolean),
)

export const getAllByKey = key => pipe(
  reduce((result, item) => result.concat(item[key]), []),
  uniq,
  filter(Boolean),
)

export function formatStringValuesArray(values) {
  return `(${values.map(value => mysql.escape(value)).join('), (')})`
}

export const reduceByKey = key => (
  reduce((result, row) => {
    result[row[key]] = row
    return result
  }, {})
)


export function insertCities({conn, data}) {
  const table = '`CITY`'
  const key = 'city'
  const values = formatStringValuesArray([
    ...getAllByKey('city')(data.events),
    ...getAllByKey('city')(data.members),
    ...getAllByKey('city')(data.groups),
  ])
  const sql = mysql.format(
    `INSERT INTO ${table} (${key}) VALUES ${values} ON DUPLICATE KEY UPDATE ${key}=${key}`
  )

  return Promise.resolve()
    .then(() => query(conn, sql))
    .then(() => query(conn, `SELECT * from ${table}`))
    .then(reduceByKey(key))

}

export function insertVenues({conn, data}) {
  return Promise.all(map(
    ({name, address, city}) => query(conn, 'INSERT IGNORE INTO ?? SET ?', ['VENUE', {name, address, city_id: data.city[city].id}]),
    getAllVenues(data.events),
  ))
  .then(() => query(conn, 'SELECT * from ??', ['VENUE']))
  .then(reduceByKey('id'))
}

export function insertTags({conn, data}) {
  const table = '`TAG`'
  const key = 'tag'
  const values = formatStringValuesArray([
    ...getAllTags(data.events),
    ...getAllTags(data.members),
    ...getAllTags(data.groups),
  ])
  const sql = mysql.format(
    `INSERT INTO ${table} (${key}) VALUES ${values} ON DUPLICATE KEY UPDATE ${key}=${key}`
  )

  return Promise.resolve()
    .then(() => query(conn, sql))
    .then(() => query(conn, `SELECT * from ${table}`))
    .then(reduceByKey(key))

}

export function insertUsers({conn, data}) {
  return Promise.all(map(
    member => query(conn, `REPLACE INTO ?? SET ?`, ['USER', mapMemberToUser(member, data)]),
    data.members,
  ))
  .then(() => Promise.all(map(
    member => Promise.all(map(
      tag => query(conn, `INSERT INTO ?? SET ?`, ['USER_TAG', {user_id: member.id, tag_id: data.tag[tag].id}]),
      splitTags(member.tags),
    )),
    data.members,
  )))
  .then(() => query(conn, 'SELECT * from ??', ['USER']))
  .then(reduceByKey('id'))
}

export function insertEventTypes({conn, data}) {
  const table = '`EVENT_TYPE`'
  const key = 'type'
  const values = formatStringValuesArray(getAllByKey('type')(data.events))
  const sql = mysql.format(
    `INSERT INTO ${table} (${key}) VALUES ${values} ON DUPLICATE KEY UPDATE ${key}=${key}`
  )

  return Promise.resolve()
    .then(() => query(conn, sql))
    .then(() => query(conn, `SELECT * from ${table}`))
    .then(reduceByKey(key))

}

export function insertEvents({conn, data}) {
  return Promise.all(map(
    event => query(conn, `REPLACE INTO ?? SET ?`, ['EVENT', mapEvent(event, data)]),
    data.events,
  ))
    .then(() => Promise.all(map(
      event => Promise.all(map(
        tag => query(conn, `INSERT INTO ?? SET ?`, ['EVENT_TAG', {event_id: event.id, tag_id: data.tag[tag].id}]),
        splitTags(event.tags),
      )),
      data.events,
    )))
    .then(() => Promise.all(map(
      event => Promise.all(map(
        date => query(conn, `INSERT INTO ?? SET ?`, ['EVENT_TIMETABLE', {
          event_id: event.id,
          ...date,
        }]),
        getDates(event.startDate, event.endDate, event.startTime, event.endTime),
      )),
      data.events,
    )))
    .then(() => query(conn, 'SELECT * from ??', ['EVENT']))
    .then(reduceByKey('id'))
}

export function insertGroups({conn, data}) {
  return Promise.all(map(
    group => query(conn, `REPLACE INTO ?? SET ?`, ['GROUP', mapGroup(group, data)]),
    data.groups,
  ))
    .then(() => Promise.all(map(
      group => Promise.all(map(
        tag => query(conn, `INSERT INTO ?? SET ?`, ['GROUP_TAG', {group_id: group.id, tag_id: data.tag[tag].id}]),
        splitTags(group.tags),
      )),
      data.groups,
    )))
    .then(() => query(conn, 'SELECT * from ??', ['GROUP']))
    .then(reduceByKey('id'))
}

function query(conn, sql, values) {
  return new Promise((resolve, reject) => (
    conn.query(sql, values, function (error, results) {
      if (error) {
        reject(error)
        return
      }

      resolve(results)
    })
  ))
}

function getDates(startDate, endDate, startTime, endTime) {
  const DATE_FORMAT = 'DD.MM.YYYY'
  const TIME_FORMAT = 'HH:mm'

  const MYSQL_DATE_FORMAT = 'YYYY-MM-DD'
  const MYSQL_TIME_FORMAT = 'HH:mm:ss'

  const sd = moment(startDate, DATE_FORMAT)
  const ed = moment(endDate, DATE_FORMAT)
  const st = moment(startTime, TIME_FORMAT)
  const et = moment(endTime, TIME_FORMAT)

  let days = ed.diff(sd, 'days') + 1 // кол-во дней
  let results = []

  while (days--) {
    results.push({
      date: moment(ed).subtract(days, 'days').format(MYSQL_DATE_FORMAT),
      start_time: st.format(MYSQL_TIME_FORMAT),
      end_time: et.format(MYSQL_TIME_FORMAT),
    })
  }

  // console.log(results)
  return results
}

export function mapMemberToUser({
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
}, {city: cities}) {
  return ({
    id,
    email,
    fullname: name,
    imge_url: imageUrl,
    ability,
    tel,
    vk_url: vkUrl,
    fb_url: fbUrl,
    ig_url: igUrl,
    site_url: siteUrl,
    additional_info: additionalInfo,
    city_id: city ? cities[city].id : null,
  })
}

function mapEvent({
  id,
  title,
  type,
  location,
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
}, {eventType, venue}) {
  return {
    id,
    title,
    event_type_id: eventType[type].id,
    site_url: siteUrl,
    summary: null,
    description: null,
    hosted_by: hostedBy,
    visible,
    venue_id: location && location.name ? findByKey('name', location.name, values(venue)).id : null,
  }
}

function mapGroup({
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
}, {city: cities}) {

  return {
    id,
    name: title,
    lineup,
    image_url: imageUrl,
    site_url: siteUrl,
    vk_url: vkUrl,
    fb_url: fbUrl,
    ig_url: igUrl,
    summary: sum,
    description,
    city_id: city ? cities[city].id : null,
  }
}

function log(...args) {console.log(...args); return args[args.length - 1];}

