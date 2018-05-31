/**
 * Get all groups
 * @param req
 * @param res
 * @returns void
 */
export function getAll(req, res) {
  // try {
  //   const source = fs.readFileSync(path.resolve(__dirname, '../seeds/group/data.csv'), 'utf8')
  //   csv.parse(source, {columns: true}, (err, data) => res.json(addIdAndLogoToGroups(data)))
  // } catch (err) {
  //   console.log(err) // eslint-disable no-console
  //   res.status(403).end(err)
  // }

  res.json(res.locals.googleApiData.groups)
}
