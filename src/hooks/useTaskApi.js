import  { useState, useEffect } from 'react'
import api from '../api'

export const useTaskApi = () => {

    /* Local states hooks */
    const [tasks, setTasks] = useState({isLoading: true, isError: false, data:[]})
    const [reload, setReload] = useState(false)
    
    /* fetch tasks */
    useEffect(() => {
        const fetchData = async () => {
            setTasks({ isLoading: true })
            await api.getAllTasks()
                .then(tasks => {
                    setTasks({
                        isLoading: false,
                        isError: false,
                        data: tasks.data.data
                    })
                })
                .catch(error => {
                    setTasks({
                        isLoading: false,
                        isError: true,
                        data: []
                    })
                })
        }
        fetchData()
    },[reload])

    const reloadTasks = (data) => {
        setTasks({isLoading: false, isError: false, data:data})
    }

    return [tasks, reloadTasks]
}