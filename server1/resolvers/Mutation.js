const Mutation = {
    createUser: async (root, args, {currentUser} ) => {

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        console.log('user', currentUser)
    
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        })
        return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
  
      },
      login: async ( root, args ) => {
        console.log('args ',args, '/n password')
        const user = await User.findOne({ username: args.username})
        console.log('user ', user)
  
        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }
        
      const userForToken = {
        username: user.username,
        id: user._id,
      }
    }
}

module.exports = Mutation