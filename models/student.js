const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  age: {
    type: Number,
    default: 18
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  }
}, {
  // timestamps va créer automatiquement sans qu'on
  // ait a le spécifier les clés `createdAt` et `updatedAt`
  timestamps: true
})

// c'est ici que mongoose fait le lien entre collection et schema
// cette ligne va créer la collection `student` avec le schema `studentSchema`
const Student = mongoose.model('Student', studentSchema)

module.exports = Student
