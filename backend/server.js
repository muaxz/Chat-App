const express = require('express')
const DB = require("./DataBase")
const UserModel = require("./models/users")
const RoomModel = require("./models/rooms")
const MessageModel = require("./models/messages")
const {ApolloServer} = require("apollo-server-express")
const typeDefs = require("./Schema/typeDefs")
const resolvers = require("./Schema/resolvers")
const app = express()
const port = 3001


async function startApolloServer(){

  const apolloServer =  new ApolloServer({typeDefs,resolvers,csrfPrevention:true,context:({req,res})=>{return{req:req,res}}})

  await apolloServer.start()

  apolloServer.applyMiddleware({app,path:"/graphql"})
}

startApolloServer()

DB.sync().then(()=>console.log("added to db"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})