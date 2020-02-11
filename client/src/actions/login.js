import axios from 'axios'
import { setNotes } from './note'
import { setCategories } from './category'

export const loginUser = (user) => {
    return {
        type : 'SET_USER',
        payload : user
    }
}


export const startLoginUser = (formData, props) => {
    return dispatch => {
        axios.post('http://localhost:3015/users/login', formData)
            .then(response => {
                if(response.data._id) {
                    const { user, token } = response.data
                    localStorage.setItem('authToken', token)
                    dispatch(loginUser(user))
                   
                    return Promise.all([ axios.get('http://localhost:3015/notes', {
                        headers : {
                            'x-auth' : token
                        }
                    }), axios.get('http://localhost:3015/categories', {
                        headers : {
                            'x-auth' : token
                        }
                    })])
                } 
            })
            .then(responses => {
                const [notes, categories] = responses
                dispatch(setNotes(notes.data))
                dispatch(setCategories(categories.data))
                props.history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const startSetUser = () => {
    const req1 = axios.get('http://localhost:3015/users/account', {
        headers : {
            'x-auth' : localStorage.getItem('authToken')
        }
    })
    const req2 = axios.get('http://localhost:3015/notes', {
        headers : {
            'x-auth' : localStorage.getItem('authToken')
        }
    })
    const req3 = axios.get('http://localhost:3015/categories', {
        headers : {
            'x-auth' : localStorage.getItem('authToken')
        }
    })
    return dispatch => {
        Promise.all([req1, req2, req3])
            .then(responses => {
                const [user, notes, categories] = responses
                dispatch(loginUser(user.data))
                dispatch(setNotes(notes.data))
                dispatch(setCategories(categories.data))
            })
    }
}



