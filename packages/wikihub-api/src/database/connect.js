import Promise from 'bluebird'
import mysql from 'mysql2'

const DB_CONNECTION = process.env.DB_CONNECTION
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_DATABASE = process.env.DB_DATABASE
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD

function connect() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: DB_HOST,
      user: DB_USERNAME,
      database: DB_DATABASE,
    })

    connection.connect(function(error) {
      if (error) {
        reject(error)
        return;
      }

      resolve(connection)
    });
  })
}

export default connect
