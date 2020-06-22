// React
import React, { useState } from 'react'
import { AUTH_TOKEN, USER_NAME } from '../../../constants'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'

import "./Login.scss"

export const Login = ({logoutMessage}) => {

    const history = useHistory()

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
        { token, user { name } }
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
        { token, user { name } }
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
            default:true
        )
        {
            id
            name
            color
            default
        }
      }
    `

    const [loginState, setLoginState] = useState({login:true})
    const [error, setError] = useState({isError:false})
    const {login, email, password, name} = loginState

    const handleLoginState = (state) =>{
        setLoginState(state)
    }

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
    const _saveUserData = (token,user) => {
        localStorage.setItem(AUTH_TOKEN, token)
        localStorage.setItem(USER_NAME, user.name)
    }

    const _confirm = async (data) => {
        const { token, user } = login ? data.login : data.signup
        _saveUserData(token, user)
    }

    return(
        <div id='login-page'>
            <h1>Todo List</h1>
            <h2>{login?'Login':'Signup'}</h2>
            {
                error.isError
                ? <p className='login-message'>{error.message}</p>
                : logoutMessage
                ? <p className='login-message'>{logoutMessage}</p>
                : ''     
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
                    onChange={e=>handleLoginState({...loginState, name:e.target.value})}
                    type="text"
                    placeholder="Your name"
                />}
                <input 
                    value={email}
                    onChange={e=>handleLoginState({...loginState, email:e.target.value})}
                    type="text"
                    placeholder="Your email address"
                />
                <input 
                    value={password}
                    onChange={e=>handleLoginState({...loginState, password:e.target.value})}
                    type="password"
                    placeholder={login?'Enter your password':'Chose a safe password'}
                />
                <input
                    value={login?'Login':'Create account'}
                    type='submit'
                />
                <div id='sign-switch' onClick={e=>{
                        setError({isError:false})
                        handleLoginState({...loginState, login:!login})
                    }}>
                    {login?'No account? Signup':'Already have an account'}
                </div>
            </form>
        </div>
    )

}