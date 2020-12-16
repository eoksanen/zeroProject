import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useLazyQuery } from '@apollo/client'
import { CREATE_USER } from '../queries/mutation'
import Notify from './Notify'

const UserForm = (props) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')


  const [ createUser ] = useMutation(CREATE_USER, {
    // refetchQueries: [ { query: ALL_USERS } ],
    onError: (error) => {
        props.setError(error.graphQLErrors[0] ? error.graphQLErrors[0].message :'something went wrong')
    },
    
    update: (store, response) => {
      props.updateCacheWith(response.data.addBook)
    },
    /*
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [ ...dataInStore.allBooks, response.data.addBook ]
        }
      })
    }*/
  })


  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

   createUser({ variables: { username,  name, password } })
    
    console.log('create user...', createUser)
    console.log('add user...', username, name, password )

    setUsername('')
    setName('')
    setPassword('')
  }


  if(!props.token){
    return null
  }

  return (
    <div>
          <h2> Add User </h2>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
     
        <button type='submit'>create user</button>
      </form>
    </div>
  )
}

export default UserForm