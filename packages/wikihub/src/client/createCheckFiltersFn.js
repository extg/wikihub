import {
  path as get,
  map,
  pipe,
  join,
  difference,
} from 'ramda'

const getPlaintText = fields =>
    obj => pipe(
      map(fieldPath => get(fieldPath, obj)),
      join(' ')
    )(fields)

const createCheckFiltersFn = filters =>
  item => {
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        const {
          value,
          path: valuePath,
          fields = [],
          type,
        } = filters[key]

        const getValue = get(valuePath || [key])
        const getSearchText = getPlaintText(fields)

        if (value !== null) {
          switch (type) {
            case 'array':
              const flattenValue = value.map(t => t.value) // [{value: '...', label: '...'}, ...] => ['...', '...', ...]
              const eventProp = getValue(item) || [] // ensure that is array

              if(difference(flattenValue, eventProp).length !== 0) {
                return false
              }
              break

            case 'search':
              if (!(new RegExp(value, 'gi').test(getSearchText(item)))) {
                return false
              }
              break

            case 'text':
            default:
              if (value !== getValue(item)) {
                return false
              }
          }
        }
      }
    }

    return true
  }

export default createCheckFiltersFn
