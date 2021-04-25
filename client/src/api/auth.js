import {$fetch, $fethAuth} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (
    email,
    password,
    name,
    phoneNumber,
    contractNumber,
    birthDate,
    employmentDate,
    salary,
    departmentId,
    role
    ) => {
    const {data} = await $fetch.post('api/users/register', {
        email,
        password,
        name,
        phoneNumber,
        contractNumber,
        birthDate,
        employmentDate,
        salary,
        departmentId,
        role
    });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const login = async (contractNumber, password) => {
    const {data} = await $fetch.post('api/users/login', {contractNumber, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const check = async () => {
    const {data} = await $fethAuth.get('api/users/isAuth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}