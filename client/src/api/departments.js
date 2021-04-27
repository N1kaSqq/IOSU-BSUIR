import {$fetch, $fethAuth} from "./index";

export const getAllDepartments = async () => {
    const {data} = await $fetch.get('api/departments');
    return data;
}