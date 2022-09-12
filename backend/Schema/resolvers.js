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
        },
        async getRoomMessages(parent,args,context,info){

            try {

                const Messages = await RoomModel.findOne({
                    where:{
                        id:args.roomId,
                    },
                    include:[{
                        model:MessageModel,
                        include:{
                            model:UserModel
                        }
                    },{
                        model:UserModel
                    }],
                })

                return Messages.toJSON();

            } catch (error) {
                //....
            }
        },
        async getCurrentUser(parent,args,context,info){

            try {
                
                const currentUser = UserModel.findOne({
                    where:{
                        id:args.userId
                    }
                })

                return currentUser;

            } catch (error) {
                //...
            }

        }
    },
    Mutation:{
        createUser : async (parent,args,context,info)=>{
            try {
                
                const randomGeneratedUserId = v4()
                await UserModel.create({
                    id:randomGeneratedUserId,
                    user_name:args.userName,
                    profile_url:""
                })
                
                return {state:"success",UserToken:randomGeneratedUserId}

            } catch (error) {
                
                return {state:"fail"}
            }
        },
        createMessage : async (parent,args,context,info)=>{
            console.log("inside")
            try {

                const message = await MessageModel.create({
                    message:args.message,
                    userId:args.userId,
                    roomId:args.roomId
                })

                
                context.socket.to("").emit("messageOut",{message:message})


                return {state:"success"}
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

        },
        async joinRoom(parent,args,context,info){

            try {

                const currentRoom = await RoomModel.findOne({
                    where:{
                        id:args.roomId
                    },
                    include:{
                        model:UserModel
                    }
                })
               
                if(currentRoom.room_limit > currentRoom.users.length){
                     console.log("inside lol")
                     const currentUser = await UserModel.findOne({where:{id:args.userId}})
                     await currentUser.update({roomId:args.roomId})
                     context.socket.to(args.roomId).emit("newMember",currentUser.toJSON())
                     return {state:"success"}
                }
                
                //const user = await UserModel.update({roomId:args.roomId},{where:{id:args.userId}})
                //console.log(user)

                //context.socket.to("ceratin_client").emit("newMember",{})

            } catch (error) {

                    return {state:"fail"}

            }

        }
    }
}


module.exports = Resolver;