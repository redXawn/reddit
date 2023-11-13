import { combineReducers } from 'redux';

import loading from './loading';
import forum from './forum';
import thread from './thread';

const rootReducer = combineReducers({
  loading,
  forum,
  thread,
});

export default rootReducer;
