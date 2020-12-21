import { gql  } from '@apollo/client'

export const USER_ADDED = gql`
  subscription {
    userAdded {
      ...UserDetails
    }
  }
  
  
  fragment UserDetails on User {
        id
        username
        name
  }
`