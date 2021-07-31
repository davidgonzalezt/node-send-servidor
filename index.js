const express = require('express')
const conectDB = require('./config/db')
const cors = require('cors')

// create server 
const app = express();

// conect DB
conectDB();

// cors
const optionsCors = {
  origin: process.env.FRONTEND_URL
}

app.use(cors(optionsCors))

// app port
const port = process.env.PORT || 4000

// able read values
app.use(express.json())

// app routes

// enable public folder
app.use(express.static('uploads'))

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/links', require('./routes/links'))
app.use('/api/files', require('./routes/files'))
app.use('/api/csv', require('./routes/csv'))

// run app  
app.listen(port, '0.0.0.0', () => {
  console.log(`server run on port ${port}`)
});
