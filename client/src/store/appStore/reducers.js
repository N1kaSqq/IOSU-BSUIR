import { createReducer } from '@reduxjs/toolkit';

import { setChecks, setDepartments, setProducts, setSuppliers, setUsers, setCurrentCheck } from './actions';

const initialState = {
    checks: [],
    departments: [],
    products: [],
    suppliers: [],
    users: [],
    currentCheck: {},
}

export default createReducer(initialState, (builder) => {
    builder
      .addCase(setChecks, (state, action) => {
        state.checks = action.payload;
      })
      .addCase(setDepartments, (state, action) => {
        state.departments = action.payload;
      })
      .addCase(setProducts, (state, action) => {
        state.products = action.payload;
      })
      .addCase(setSuppliers, (state, action) => {
        state.suppliers = action.payload;
      })
      .addCase(setUsers, (state, action) => {
        state.users = action.payload;
      })
      .addCase(setCurrentCheck, (state, action) => {
        state.currentCheck = action.payload;
      })
  });