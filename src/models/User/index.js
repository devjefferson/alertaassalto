const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  email:{
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password:{
    type:String,
    required: true,
    select: false
  },
  seal:[{
      type: String
    }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,

  },
  lastacessAt: {
    type: Date,

  }
})

UserSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  return next()
})

module.exports = mongoose.model('users', UserSchema)