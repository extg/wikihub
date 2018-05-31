import {sync} from './database'

sync()
  .catch(error => {
    console.error(error.sqlMessage, error.stack,  error.stack, error)
  })
