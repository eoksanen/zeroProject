const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { AuthenticationError, PubSub } = require('apollo-server')

const pubsub = new PubSub()


const resolvers = {

Query: {
    me: async (root, args, context) => {

      return context.currentUser

    },
    allUsers: async () => {
      return await User.find({},{id:1, name:1, username:1})
    }
},

Mutation: {
    createUser: async (root, args, {currentUser} ) => {

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        console.log('user', currentUser)
        
      if (!args.password || args.password.length < 4){

        console.log('passu ',args.password.length)
      
        return response.status(400).json({
          error: "password must be over 3 characters"
        })
      }

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)
    
        const user = new User({
          username: args.username,
          name: args.name,
          passwordHash,
        })
        user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
        pubsub.publish('USER_ADDED', { userAdded: user })
        return user
  
      },
      removeUser: async (root, args, {currentUser} ) => {
        console.log('args ',args,)

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        console.log('user', currentUser)

        const user = await User.findById(args.id)

        if(user.id) {

        await User.findByIdAndRemove(args.id)
        pubsub.publish('USER_REMOVED', { userRemoved: user })
        return user
        } else {
          throw new ForbiddenError("User not exist")
        }


      },
      login: async ( root, args ) => {
        console.log('args ',args, '/n password')
        const user = await User.findOne({ username: args.username})
        console.log('user ', user)

        const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.passwordHash)
    
      if (!(user && passwordCorrect)) {
          throw new UserInputError("wrong credentials")
        }
        
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
},

Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator(['USER_ADDED'])
    },
    userRemoved: {
      subscribe: () => pubsub.asyncIterator(['USER_REMOVED'])
    }
  }
}

module.exports = resolvers