const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8080
const dbConnection = require('./knex/knex')
const cookieParser = require('cookie-parser')

const petsRoute = require('./Routes/petsRoute')
const usersRoute = require('./Routes/usersRoute')

app.use(cors({ origin: ['http://localhost:3000', 'https://products-client.vercel.app'], credentials: true }))
app.use(cookieParser())
app.use(express.json())

app.use('/pets', petsRoute)
app.use('/users', usersRoute)


async function migrateAndListen() {
    try {
      const migration = await dbConnection.migrate.latest();
      if (migration) {
        console.log(migration);
        console.log('Connected to DB');
        app.listen(PORT, () => {
          console.log(`Server is listening on http://localhost:8080`);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  migrateAndListen();