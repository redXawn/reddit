import { combineReducers } from 'redux';

import loading from './loading';
import forum from './forum';

const rootReducer = combineReducers({
  loading,
  forum,
});

export default rootReducer;
