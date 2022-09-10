const {gql} = require("apollo-server-express")
const UserModel = require("../models/users")
const RoomModel = require("../models/rooms")
const {v4} = require("uuid")
const MessageModel = require("../models/messages")


const Resolver = {
    Query:{
        getRooms: async ()=>{
            try {

               const rooms = await RoomModel.findAll()
               
               return rooms

            }catch (error) {
                //...
            }
        }
    },
    Mutation:{
        createUser : async (parent,args,context,info)=>{
            try {

                await UserModel.create({
                    id:v4(),
                    user_name:args.userName,
                    profile_url:""
                })

                return {state:"success"}

            } catch (error) {
                
                return {state:"fail"}
            }
        },
        createMessage : async (parent,args,context,info)=>{

            try {

                const message = await MessageModel.create({
                    message:args.message,
                    UserId:args.userId,
                    RoomId:args.RoomId
                })

                
                //context.socket.to("certain client").emit("messageOut",{message:message})

            } catch (error) {
                
                return {state:"fail"}
            }
            
        },
        async createRoom(parent,args,context,info){
            console.log("inside room")
            try {
                
                const Room = await RoomModel.create({
                    room_name:args.roomName,
                    room_limit:args.roomLimit
                })

                return Room

            } catch (error) {
                ////
            }

        }
    }
}


module.exports = Resolver;