const express = require('express')
const conectDB = require('./config/db')

// create server 
const app = express();

// conect DB
conectDB();

// app port
const port = process.env.PORT || 4000

// able read values
app.use(express.json())

// app routes

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/links', require('./routes/links'))
app.use('/api/files', require('./routes/files'))
app.use('/api/csv', require('./routes/csv'))

// run app  
app.listen(port, '0.0.0.0', () => {
  console.log(`server run on port ${port}`)
});
