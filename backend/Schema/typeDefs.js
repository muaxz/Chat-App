const {gql} = require("apollo-server-express")


const TypeDefs = gql`

    type StateResponse{
        state:String!
    }   
    
    type Room{
        id:Int!
        room_name:String!
        room_limit:Int!
    }

    type Message { 
        id:Int!
        message:String!
    }

    type Query {
        getRooms : [Room!]!
    }

    type Mutation {
        createUser(userName:String!) : StateResponse!
        createMessage(message:String! roomId:Int! userId:String!) : StateResponse!
        createRoom(roomName:String roomLimit:Int!) : Room!
    }
`

module.exports = TypeDefs