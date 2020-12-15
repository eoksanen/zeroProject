import React from 'react'


  const Notify = ({errorMessage}) => {
      
    if ( !errorMessage ) {
      return null
    }
    return (
      <div style={{color: 'red'}}>
        {console.log(errorMessage), errorMessage}
      </div>
    )
  }

  export default Notify