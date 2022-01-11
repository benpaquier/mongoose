const express = require("express")
const app = express()

const Student = require("../models/student")

app.get('/count', async (req, res) => {
  try {
    const studentsCount = await Student.find().count().exec()
    res.json({ studentsCount })
  } catch(err) {
    res.status(500).json({ error: err })
  }
})

app.get('/', async (req, res) => {
  try {
    // syntaxe avec promise (grace a exec)
    const students = await Student.find({})
      .select("-password -createdAt -updatedAt -__v")
      .sort({ age: 'desc' })
      .exec()

    res.json(students)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

app.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const student = await Student.findOne({ _id: id }).exec()
    // const student = await Student.findById(id).exec()
    res.json(student)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

app.put('/:id', async (req, res) => {
  const { id } = req.params

  try {
    // au lieu de faire comme ca avec 2 requetes vers la db
    // await Student.updateOne({ _id: id }, {
    //   $set: {
    //     firstName: "ewoifherio"
    //   }
    // })

    // const student = await Student.findOne({ _id: id })
    
    const student = await Student.findOneAndUpdate(
      // filter
      { _id: id },
      // les données qu'on met a jour
      {
        $set: { ...req.body }
      },
      // les options, new permet de retourner l'etudiant à jour
      { new: true }
    ).exec()

    res.json(student)
  } catch(err) {
    res.status(500).json({ error: err })
  }
})

app.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Student.deleteOne({ _id: id }).exec()
    res.status(200).json({ success: "Student deleted" })
  } catch(err) {
    res.status(500).json({ error: err })
  }
})

app.post('/', async (req, res) => {
  // 2 manières pour créer un document en base de donnée
  
  // 1ere méthode
  // on crée un nouvel etudiant avec le model Student
  const student = new Student({
    ...req.body
  })

  student.save((err, student) => {
    if (err) {
      res.status(500).json({ error: err })
      return
    }

    res.json(student)
  })

  // student.save()

  // 2eme méthode
  // Student.create({ ...req.body }, (err, student) => {
  //   if (err) {
  //     res.status(500).json({ error: err })
  //     return
  //   }

  //   res.json(student)
  // })
})

module.exports = app