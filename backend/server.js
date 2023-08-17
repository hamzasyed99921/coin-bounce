const express = require('express')
const {PORT} = require('./config')
const dbConnect = require('./database/index')
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser');
const cors = require('cors')

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000']
}

const app = express()

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json({limit: '50mb'}));
app.use(router)
app.use('/storage', express.static('storage'))
app.use(errorHandler);

dbConnect();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})