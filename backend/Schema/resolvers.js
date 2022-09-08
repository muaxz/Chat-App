const {gql} = require("apollo-server-express")
const UserModel = require("../models/users")
const RoomModel = require("../models/rooms")
const {v4} = require("uuid")
const MessageModel = require("../models/messages")


const Resolver = {
    Query:{
        getRoomMessages : async (parent,args,context,info)=>{
            
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
        }
    }
}


module.exports = Resolver;