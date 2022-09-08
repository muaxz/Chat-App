const {gql} = require("apollo-server-express")


const TypeDefs = gql`

    type StateResponse{
        state:String!
    }
    
    type Message { 
        id:Int!
        message:String!
    }

    type Query {
        getRoomMessages : [Message!]!
    }

    type Mutation {
        createUser(userName:String!) : StateResponse!
        createMessage(message:String! roomId:Int! userId:String!) : StateResponse!
    }
`

module.exports = TypeDefs