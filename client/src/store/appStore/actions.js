import { createAction} from '@reduxjs/toolkit';

export const setChecks = createAction('app/checks');
export const setDepartments = createAction('app/departments');
export const setProducts = createAction('app/products');
export const setSuppliers = createAction('app/suppliers');
export const setUsers = createAction('app/users');
export const setCurrentCheck = createAction('app/currentCheck');