import { useState, useEffect } from 'react'
import api from '../api'

export const useCategoryApi = () => {

    /* state hook */
    const [categories, setCategories] = useState({isLoading:true, isError: false, data:[]})
    const [reload, setReload] = useState(false)

    /* fetch categories */
    useEffect(() => {
        const fetchData = async () => {
            setCategories({ isLoading: true })
            await api.getAllCategories()
                .then(categories => {
                    setCategories({
                        isLoading: false,
                        isError: false,
                        data:categories.data.data
                    })
                })
                .catch(error => {
                    setCategories({
                        isLoading: false,
                        isError: true,
                        data: []
                    })
                })
        }
        fetchData()
    }, [reload])

    const reloadCategories = () => {
        setReload(!reload)
    }

    return [categories, reloadCategories]
}