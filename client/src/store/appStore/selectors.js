import { createSelector } from 'reselect';

const getAppStore= (state) => state.app;

export const getChecks = createSelector(getAppStore, (app) => app.checks);
export const getDepartments = createSelector(getAppStore, (app) => app.departments);
export const getProducts = createSelector(getAppStore, (app) => app.products);
export const getSuppliers = createSelector(getAppStore, (app) => app.suppliers);
export const getUsers = createSelector(getAppStore, (app) => app.users);
export const getCurrentCheck = createSelector(getAppStore, (app) => app.currentCheck);