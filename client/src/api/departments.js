import {$fetch, $fethAuth} from "./index";

export const getAllDepartments = async () => {
    const {data} = await $fetch.get('api/departments');
    return data;
}

export const createDepartment = async (department) => {
    const {data} = await $fethAuth.post('api/departments', department);
    return data;
}

export const createSupplier = async (supplier) => {
    const {data} = await $fethAuth.post('api/suppliers', supplier);
    return data;
}

export const createProduct = async (product) => {
    const {data} = await $fethAuth.post('api/products', product);
    return data;
}

export const getAllSuppliers = async () => {
    const {data} = await $fetch.get('api/suppliers');
    return data;
}

export const getAllProducts = async () => {
    const {data} = await $fetch.get('api/products?departmentId=all&orderBy=default');
    return data;
}