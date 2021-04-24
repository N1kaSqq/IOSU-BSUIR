import { createSelector } from 'reselect';

const getUserStore = (state) => state.user;

export const getUser = createSelector(getUserStore, (user) => user.user);
export const getIsAuth = createSelector(getUserStore, (user) => user.isAuth);