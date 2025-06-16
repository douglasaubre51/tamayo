import express from 'express'
import mongoose from 'mongoose'


// init api
const app = express()
const port:number = 3000

// middleware
app.use(express.json())

// init mongo db
mongoose.connect(
    'mongodb+srv://allen:chancellor66@neliel.ptcuka3.mongodb.net/tamayodb?retryWrites=true&w=majority&appName=Neliel'
)
.then(()=> console.log("connected to neliel cluster's tamayodb!"))
.catch((e)=> console.log(`error connecting to db:\n ${e.message}`))

// start api
app.listen(
  port,
  () => console.log(`http://localhost:${port}/ tamayo says hello!`)
)
