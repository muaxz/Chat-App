const express = require('express')
const DB = require("./DataBase")
const UserModel = require("./models/users")
const RoomModel = require("./models/rooms")
const MessageModel = require("./models/messages")
const {ApolloServer} = require("apollo-server-express")
const typeDefs = require("./Schema/typeDefs")
const resolvers = require("./Schema/resolvers")
const cors = require("cors")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http,{cors:{origin:"http://localhost:3000"}})
const port = 3001


app.use(cors({origin:"http://localhost:3000"}))

io.on("connection",(socket)=>{
    
    socket.on("connected",({userId,roomId})=>{
       socket[socket.id] = userId
       if(roomId)
       socket.join(roomId.toString())
    })
    
    socket.on("joinRoom",({userState,roomId,currentUserRoom})=>{
        
     
       if(currentUserRoom === 0){

          socket.join(roomId.toString())
          socket.broadcast.emit("roomNumberUp",roomId)
          io.to(roomId.toString()).emit("newMember",{user:userState,roomId:roomId})

       }else{

          socket.join(roomId.toString())
          socket.to(currentUserRoom.toString()).emit("outMember",{userId:userState.id})
          io.to(roomId.toString()).emit("newMember",{user:userState,roomId:roomId})
          socket.broadcast.emit("roomNumberUp",roomId)
          socket.broadcast.emit("roomNumberDown",currentUserRoom)
          socket.leave(currentUserRoom.toString())

       }

    }) 

    socket.on("leaveRoom",({currentUserRoom,userId})=>{
      io.emit("roomNumberDown",currentUserRoom)
      socket.to(currentUserRoom.toString()).emit("outMember",{userId:userId})
      socket.leave(currentUserRoom.toString())
      UserModel.update({roomId:null},{where:{id:userId}})
    })


})

async function startApolloServer(){

  const apolloServer =  new ApolloServer({typeDefs,resolvers,csrfPrevention:true,context:({req,res})=>{return{req:req,res:res,socket:io}}})

  await apolloServer.start()

  apolloServer.applyMiddleware({app,path:"/graphql"})
}

startApolloServer()

DB.sync().then(()=>console.log("added to db"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

http.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})