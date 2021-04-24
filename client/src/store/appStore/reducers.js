import { createReducer } from '@reduxjs/toolkit';

import { setChecks, setDepartments, setProducts, setSuppliers, setUsers } from './actions';

const initialState = {
    checks: [],
    departments: [
        {
            id: 1,
            name: 'Продукты',
            maxWorkers: 15,
            maxGoods: 1000,
            img: '',
        },
        {
            id: 2,
            name: 'Одежда',
            maxWorkers: 10,
            maxGoods: 600,
            img: '',
        },
        {
            id: 3,
            name: 'Канцтовары',
            maxWorkers: 6,
            maxGoods: 20000,
            img: '',
        },
        {
            id: 4,
            name: 'Бытовая техника',
            maxWorkers: 18,
            maxGoods: 100,
            img: '',
        },
    ],
    products: [],
    suppliers: [],
    users: [
        {
            id: 1,
            email: 'test@mail.ru',
            name: 'Nikita',
            role: 'ADMIN',
            department: 'Продукты',
            phoneNumber: '+375298408010',
            monthSales: 4
        },
        {
            id: 2,
            email: 'test2@mail.ru',
            name: 'Andrey',
            role: 'USER',
            department: 'Одежда',
            phoneNumber: '+375298408010',
            monthSales: 11
        },
        {
            id: 3,
            email: 'test3@mail.ru',
            name: 'Kostya',
            role: 'USER',
            department: 'Продукты',
            phoneNumber: '+375298408010',
            monthSales: 3
        },
        {
            id: 4,
            email: 'test4@mail.ru',
            name: 'Anton',
            role: 'USER',
            department: 'Продукты',
            phoneNumber: '+375298408010',
            monthSales: 6
        },{
            id: 5,
            email: 'test5@mail.ru',
            name: 'Kostya',
            role: 'USER',
            department: 'Канцтовары',
            phoneNumber: '+375298408010',
            monthSales: 16
        }
    ],
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
  });