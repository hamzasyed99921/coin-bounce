const express = require('express')
const {PORT} = require('./config')
const dbConnect = require('./database/index')
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser');

const app = express()

app.use(cookieParser())
app.use(express.json());
app.use(router)
app.use(errorHandler);
app.use('/storage', express.static('storage'))

dbConnect();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})