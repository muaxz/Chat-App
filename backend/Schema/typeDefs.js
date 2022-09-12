const {gql} = require("apollo-server-express")


const TypeDefs = gql`

    type StateResponse{
        state:String!
        UserToken:String!
    }   
    
    type User{
        id:String!
        user_name:String!
        profile_url:String!
    }
    
    type Message { 
        id:Int!
        message:String!
        roomId:Int!
        user:User!
    }
    
    type Room{
        id:Int!
        room_name:String!
        room_limit:Int! 
        messages:[Message!]!
        users:[User!]!
    }

    type Query {
        getRooms : [Room!]!
        getRoomMessages(roomId:Int!) : Room!
        getCurrentUser(userId:String!) : User!
    }

    type Mutation {
        createUser(userName:String!) : StateResponse!
        createMessage(message:String! roomId:Int! userId:String!) : StateResponse!
        createRoom(roomName:String! roomLimit:Int!) : Room!
        joinRoom(roomId:Int! userId:String!) : StateResponse!
    }
`

module.exports = TypeDefs