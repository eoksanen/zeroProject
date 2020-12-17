const mutation = require('./mutation.js')

const { AuthenticationError, PubSub } = require('apollo-server')

const pubsub = new PubSub()


  const Subscription = {
    userAdded: {
      subscribe: () => pubsub.asyncIterator(['USER_ADDED'])
    }
}


module.exports = Subscription