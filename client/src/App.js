import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import { useQuery, useLazyQuery, useApolloClient, useSubscription, updateCacheWith } from '@apollo/client'
import Notify from './components/Notify'
import Users from './components/Users'
import UserForm from './components/UserForm'
import { ALL_USERS } from './queries/query'
import { USER_ADDED } from './queries/subscription'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

import './App.css';

function App() {
  //const [page, setPage] = useState('welcome')
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

  useSubscription(USER_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedUser = subscriptionData.data.userAdded
      console.log(addedUser.name, 'addedSubscription')
      notify(`${addedUser.name} added`)
      updateCacheWith(addedUser)
    }
  })
  

 if (allUsers.loading)  {
  return <div>loading...</div>
}

const padding = {
  padding: 5
}

  return (
    <div className="App">


<table className='menu'>
        <tbody>
          <tr>
            <td><Link style={padding} to="/">Home</Link></td>
            <td><Link style={padding} to="/users">users</Link></td>
            <td><Link style={padding} to="/addUser">adduser</Link></td>
            <td>      
              {token === null ?
              <Link style={padding} to="/login">login</Link> :  <p style={padding}>{user} logged in</p>}
            </td>
            <td> 
            {token === null ? null :
              <button onClick={() => logout()}>logout</button>}
            </td>
          </tr>
        </tbody>
      </table>

      <div>
      <Notify errorMessage={errorMessage} />
  </div>


    <Switch>
      <Route path="/users">
      <Users
        show={true}
        users = {allUsers.data}
      />
      </Route>
      <Route path="/addUser">
      <UserForm
        show={true}
        setError={notify}
        token={token}     
      />

      </Route>
      <Route path="/login">
      <LoginForm
        setError={notify}
        setUser={setUser}
        setToken={setToken}
        token={token}     
      />

      </Route>
      <Route path="/">
      
      </Route>
    </Switch>


    </div>
  );
}

export default App;
