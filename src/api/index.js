import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertTask = payload => api.post(`/task`, payload)
export const getAllTasks = () => api.get(`/task/all`)
export const updateTaskById = (id, payload) => api.put(`/task/${id}`, payload)
export const deleteTaskById = id => api.delete(`/task/${id}`)
export const getTaskById = id => api.get(`/task/${id}`)
export const getTaskByCategoryId = id => api.get(`/task/category/${id}`)

export const insertCategory = payload => api.post(`/category`, payload)
export const getAllCategories = () => api.get(`/category/all`)
export const updateCategoryById = (id, payload) => api.put(`/category/${id}`, payload)
export const deleteCategoryById = id => api.delete(`/category/${id}`)
export const getCategoryById = id => api.get(`/category/${id}`)

const apis = {
    insertTask,
    getAllTasks,
    updateTaskById,
    deleteTaskById,
    getTaskById,
    getTaskByCategoryId,

    insertCategory,
    getAllCategories,
    updateCategoryById,
    deleteCategoryById,
    getCategoryById
}

export default apis