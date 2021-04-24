import { combineReducers } from '@reduxjs/toolkit';

import user from './userStore/reducers';
import app from './appStore/reducers';

export default combineReducers({
    user,
    app,
});