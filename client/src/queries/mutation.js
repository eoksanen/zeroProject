import { gql  } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_USER = gql`
mutation createUser($username: String!, $name: String!, $password: String! ) {
  createUser (
        username: $username,
        name: $name,
        password: $password
    ){ ...UserDetails
  }
}

fragment UserDetails on User {
        username
        name
        passwordHash

  }
`

export const EDIT_BORN = gql`
  mutation editBorn($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
    }
  }
`

