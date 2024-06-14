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
  
      const adminUser = await User.create({
        username: 'admin',
        email: 'admin@email.com',
        password: 'pass',
        isAdmin: true,
      })
  
      console.log(`🧑‍🎨 ${adminUser.username} user created 🧑‍🎨`)
  
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

