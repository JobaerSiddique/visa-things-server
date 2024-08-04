import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import router from './app/routes'
import notFound from './app/middlewares/notFound'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
const app = express()


app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/v1/api',router)

app.get('/', (req, res) => {
  res.send('Server is Started Successfully')
})

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;