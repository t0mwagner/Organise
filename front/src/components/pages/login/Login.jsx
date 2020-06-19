// React
import React, { useState } from 'react'
import { AUTH_TOKEN } from '../../../constants'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { createBrowserHistory } from 'history'

import "./Login.scss"

let history = createBrowserHistory()

export const Login = (props) => {

    const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
        $email: String!
        $password: String!
        $name: String!
    ){
        signup(
            email:$email
            password:$password
            name:$name
        )
        { token }
    }
    `
    const LOGIN_MUTATION = gql`
    mutation LoginMutation(
        $email: String!
        $password: String!
    )
    {
        login(
            email:$email
            password:$password
        )
        { token }
    }
    `
    const CREATE_FIRST_PROJECT = gql`
    mutation addProject(
        $name:String!
        $color:String!
    ){
        postProject(
            name:$name
            color:$color
        )
        {
            id
            name
            color
        }
      }
    `

    const [loginState, setState] = useState({login:true})
    const [error, setError] = useState({isError:false})
    const {login, email, password, name} = loginState

    const [ addFirstProject ] = useMutation(CREATE_FIRST_PROJECT)
    const [ addUser ] = useMutation(
        SIGNUP_MUTATION,
        {
            onCompleted: async (data) =>{
                _confirm(data)
                await addFirstProject({variables : {name:'General', color:'#ED0E7A'}})
                setError({isError:false})
                history.push('/')
                history.go(0)
            },
            onError:(error)=> setError({isError:true, message:error.message})
        })
    const [ loginUser ] = useMutation(
        LOGIN_MUTATION,
        {
            onCompleted:(data) =>{
                _confirm(data)
                setError({isError:false})
                history.push('/')
                history.go(0)
            },
            onError:(error)=>setError({isError:true, message:error.message})
        })

    // To change for better
    const _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }

    const _confirm = async (data) => {
        const { token } = login? data.login : data.signup
        _saveUserData(token)
    }


    return(
        <div id='login-page'>
            <h1>Todo List</h1>
            <h2>{login?'Login':'Signup'}</h2>
            {
                error.isError
                && <h3>{error.message}</h3>              
            }
            <form id='login-form' onSubmit={e=>{
                e.preventDefault()
                if (login) {
                    loginUser({ variables: { email: email, password: password }})
                } else {
                    addUser({ variables: { email: email, password: password, name:name }})
                }
            }}>
                {!login &&
                <input 
                    value={name}
                    onChange={e=>setState({...loginState, name:e.target.value})}
                    type="text"
                    placeholder="Your name"
                />}
                <input 
                    value={email}
                    onChange={e=>setState({...loginState, email:e.target.value})}
                    type="text"
                    placeholder="Your email address"
                />
                <input 
                    value={password}
                    onChange={e=>setState({...loginState, password:e.target.value})}
                    type="password"
                    placeholder={login?'Enter your password':'Chose a safe password'}
                />
                <input
                    value={login?'Login':'Create account'}
                    type='submit'
                />
                <div id='sign-switch' onClick={e=>{
                        setError({isError:false})
                        setState({...loginState, login:!login})
                    }}>
                    {login?'No account? Signup':'Already have an account'}
                </div>
            </form>
        </div>
    )

}