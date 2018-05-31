import chalk from 'chalk'
import Promise from 'bluebird'
import mysql from 'mysql2'
import {
  map,
  reduce,
} from 'ramda'

import {loadData} from '../../middlewares/googleApiMiddleware'
import connect from '../connect'
import {
  getAllTags,
  getAllCities,
  formatStringValuesArray,
  reduceByKey,
  insertCities,
  insertTags,
  insertUsers,
  insertEventTypes,
  insertEvents,
  insertVenues,
  insertGroups,
} from './helpers'

function sync(strict = false) {
  // strict mode означает что системные поля не обновляются, т.е. обновляются только данные
  console.log(chalk.cyan(`Synchronization of the database in ${strict ? 'strict' : 'normal'} mode...`))

  return Promise.props({
    conn: connect(),
    data: loadData(),
  })
  .then(({conn, data}) => Promise.props({
    conn,
    data: Promise.props({
      ...data,
      city: insertCities({conn, data}),
      tag: insertTags({conn, data}),
    }),
  }))
  .then(({conn, data}) => Promise.props({
    conn,
    data: Promise.props({
      ...data,
      eventType: insertEventTypes({conn, data}),
      venue: insertVenues({conn, data}),
    }),
  }))
  .then(({conn, data}) => Promise.props({
    conn,
    data: Promise.props({
      ...data,
      user: insertUsers({conn, data}),
      event: insertEvents({conn, data}),
      group: insertGroups({conn, data}),
    }),
  }))
  .then(({conn, data}) => {
    console.log('ok')
  })
}

export default sync
