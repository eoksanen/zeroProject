import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import { useQuery, useApolloClient  } from '@apollo/client'
import Notify from './components/Notify'
import Users from './components/Users'
import UserForm from './components/UserForm'
import { ALL_USERS } from './queries/query'

import './App.css';

function App() {
  const [page, setPage] = useState('welcome')
  const [token, setToken] = useState(localStorage.getItem('zero-user-token') ? localStorage.getItem('zero-user-token') : null)
  const [errorMessage, setErrorMessage] = useState(null)
  const[ user, setUser ] = useState(null)

  const client = useApolloClient()

  const allUsers = useQuery(ALL_USERS)

  console.log('all Users ',allUsers)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
/*
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook.title, 'added')
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })
  */

 if (allUsers.loading)  {
  return <div>loading...</div>
}

  return (
    <div className="App">

      <div>
      <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('users')}>users</button>
        {token ? <button onClick={() => setPage('addUser')}>add User</button> 
        : null }
        {!token ? <button onClick={() => setPage('login')}>login</button> 
        : <button onClick={() => logout()}>logout</button>}</div>

      <Users
        show={page === 'users'}
        users = {allUsers.data}
      />



      <UserForm
        show={page === 'addUser'}
        setError={notify}
        token={token}
        
      />

      <LoginForm
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
        setUser={setUser}
        
      />


    </div>
  );
}

export default App;
