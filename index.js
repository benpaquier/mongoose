const express = require("express")
const app = express()
const port = 5000
const { dbConnect } = require("./config/db")

const studentsRoutes = require("./routes/students")

dbConnect()

app.use(express.json())

app.use('/students', studentsRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})