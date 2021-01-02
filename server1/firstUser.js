const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('./utils/config')
const User = require('./models/user')





const saltRounds = 10

const addUser = async (username, name,  password ) => {


    await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

    console.log('credientials ', username, name, password)

    if(username && password){

    const passwordHash = await bcrypt.hash(password, saltRounds)

    console.log(passwordHash)

    const user = new User({
        username, 
        name,
        passwordHash,
    })

    console.log(user)

    await user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })

    } else {
        console.log("addUser(credientials)")
    }
}

const numberOfAddedUsers = 100

for (i = 0; i < numberOfAddedUsers; i++) {
  addUser(`test${i}`,`test${i}`,`test${i}`)
}



