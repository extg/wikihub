import {combineEpics} from 'redux-observable'

import {epics} from 'offer'

const rootEpic = combineEpics(
  epics,
);

export default rootEpic
