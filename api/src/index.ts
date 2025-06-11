import express, { Request, Response } from 'express'


const app = express()
const port:number = 3000

app.use(express.json())

app.get(
  '/',
  (req: Request,res: Response) =>{
    res.send('ts says hello!')
  }
)

app.listen(
  port,
  () => console.log(`http://localhost:${port}/ microsoft says hello!`)
)
