const Query = {
    me: async (root, args, context) => {

      return context.currentUser

    },
}

export default Query