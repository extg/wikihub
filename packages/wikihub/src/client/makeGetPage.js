const makeGetPage = ({
 currentPage = 1,
 perPage = 10,
}) =>
  data => data.slice((currentPage - 1) * perPage, currentPage * perPage)

export default makeGetPage
