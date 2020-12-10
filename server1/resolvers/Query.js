const Query = {
    me: async (root, args, context) => {

      return context.currentUser

    },
}

module.exports = Query