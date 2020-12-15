export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
  
  fragment BookDetails on Book {
    title
      author {
        name
        born
      }
      published
      genres
  }
`