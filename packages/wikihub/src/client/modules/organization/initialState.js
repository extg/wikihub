export default {
  isFetching: false,
  items: [],
  filters: {
    // title,
    // siteUrl,
    // lineup,
    // sum,
    // description,
    // goals,
    // values,
    // possibilities,
    // benefits,
    // needs,
    // fbUrl,
    // vkUrl,
    // igUrl,
    // contacts,
    // tags,
    // officialContacts,
    // representativeOfTheManagement,
    // regionality,
    // roundedIn,
    // updatedAt,
    search: {
      type: 'search',
      fields: [
        ['title'],
        ['tags'],
      ],
      value: null,
    },
    tags: {
      type: 'array',
      value: [
        // {
        //   label: 'MOSCOW_NEVER_SLEEP',
        //   value: 'MOSCOW_NEVER_SLEEP',
        // },
      ],
    },
  }
}
