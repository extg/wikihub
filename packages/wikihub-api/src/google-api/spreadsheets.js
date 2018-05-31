import google from 'googleapis'

const {spreadsheets} = google.sheets('v4')

/**
 * https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
 */
export function getTable({auth, spreadsheetId, range}) {
  return new Promise((resolve, reject) =>
    spreadsheets.values.get({
      auth,
      spreadsheetId,
      range,
    }, function(err, response) {
      if (err) {
        reject(err)
      } else {
        resolve(response.values)
      }
    })
  )
}
