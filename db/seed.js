import Exhibition from "../models/exhibition.js";
import User from "../models/user.js";
import { connectToDb, truncateDb, disconnectDb } from './helpers.js'
import exhibitionData from "./data/exhibition-data.js";

async function seed() {
    try {
      await connectToDb()
      console.log('🎨 Database Connected 🎨')
  
      await truncateDb()
      console.log('🖌️  Database Dropped 🖌️')
  
      const users = await User.create({
        firstName: 'Admin',
        username: 'admin',
        email: 'admin@email.com',
        password: 'pass',
        isAdmin: true,
      },
      {
        firstName: 'Emma',
        username: 'efrith',
        email: 'emma.frith@education.gov.uk',
        password: 'Password',
        isAdmin: true,
      },
      {
        firstName: 'Dan',
        username: 'dp-daly',
        email: 'danpatdaly@gmail.com',
        password: 'Password',
        isAdmin: true,
      },
      {
        firstName: 'Lana',
        username: 'delrey',
        email: 'lana@delrey.com',
        password: 'Password',
        isAdmin: false,
      },
      {
        firstName: 'Gloria',
        username: 'gloriosa',
        email: 'gloria@gmail.com',
        password: 'Password',
        isAdmin: false,
      }
    )
  
      console.log(`🧑‍🎨 ${users.length} users created 🧑‍🎨`)
  
      const exhibitions = await Exhibition.create(exhibitionData)
  
      console.log(`🎨 ${exhibitions.length} exhibitions added to Database 🎨`)
  
    } catch (err) {
      console.log('🥺 Something went wrong 🥺')
      console.log(err)
    }
  
    await disconnectDb()
    console.log('Bye bye 🖌️')
  }
  
  seed()

