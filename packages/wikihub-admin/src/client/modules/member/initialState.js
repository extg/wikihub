export default {
  isFetching: false,
  items: [],
  allIds: [],
  byId: {},
  currentId: null,
  pagination: {
    currentPage: 1,
    lastPage: undefined,
    perPage: 10,
  },
  filters: {
    search: {
      type: 'search',
      value: null,
      fields: [
        ['name'], // path
      ],
    },
    // fieldOfExpertise: {
    //   type: 'text',
    //   value: null,
    // },
    city: {
      type: 'text',
      value: null,
    },
    // company: {
    //   type: 'text',
    //   value: null,
    // },
    tags: {
      type: 'array',
      value: [
        // {
        //   label: 'MOSCOW_NEVER_SLEEP',
        //   value: 'MOSCOW_NEVER_SLEEP',
        // },
      ],
    },
  },
  fieldsOfExpertise: [
    'Федерация рестораторов и отельеров',
    'Экспертное сообщество',
    'ФРИИ',
    'Клуб Лидеров',
    'Инвестиционный клуб Капитал/СОБА',
    'PRSPB/Сообщество Питерских Блогеров',
    'Союз Машиностроителей России',
  ],
}
