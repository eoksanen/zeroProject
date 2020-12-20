import React from 'react'
import {useMutation} from '@apollo/client'
import { DELETE_USER, LOGIN, TEST, CREATE_USER } from '../queries/mutation'

const Users = ({users, setError}) => {

    const [removeUser] = useMutation(DELETE_USER, {
        //refetchQueries: [{query: ME}],
        onError: (error) => {
          setError(error.graphQLErrors[0].message)
        }
    })

    const [ createUser ] = useMutation(CREATE_USER, {
        // refetchQueries: [ { query: ALL_USERS } ],
        onError: (error) => {
            setError(error.graphQLErrors[0] ? error.graphQLErrors[0].message : null)
        },
       /* 
        update: (store, response) => {
          updateCacheWith(user)
          
        },*/
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

    const [ login, result ] = useMutation(LOGIN, {
        //refetchQueries: [{query: ME}],
        onError: (error) => {
          setError(error.graphQLErrors[0].message)
        }
      })

    const deleteUser = (id) => {
        /*
        const username = "bookeater"
        const password = "lipton7"

        login({ variables: { username, password } })
        
        */
        /*
       const username = 'testi kymppi'
       const name = 'testi kymppi'
       const password = 'testi kymppi'

       createUser({ variables: { username,  name, password } })
        */
       removeUser({ variables: {id}})
        
        console.log('removed user id: ',id)
        

    }


//if(!show) return null

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                <tr>
                    <th>name</th>
                    <th>
                    username
                    </th>

                </tr>
                {users.allUsers.map(a =>
                    <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.username}</td>
                    <td><button onClick={()=>deleteUser(a.id)}>DEL</button></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )

}

export default Users