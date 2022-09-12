import {gql} from "@apollo/client"


export const CreateUser = gql`
    mutation CreateUser($userName:String!){
        createUser(userName:$userName){
            state
            UserToken
        }
    }
`

export const CreateMessage = gql`
    mutation CreateMessage($message:String! $roomId:Int! $userId:String!){
        createMessage(message:$message roomId:$roomId userId:$userId){
            state
        }
    }
`

export const CreateRoom = gql`
    mutation CreateRoom($roomName:String! $roomLimit:Int!){
        createRoom(roomName:$roomName roomLimit:$roomLimit){
            id
            room_name
            room_limit
        }
    }
`

export const JoinRoom = gql`
    mutation JoinRoom($roomId:Int! $userId:String!){
        joinRoom(roomId:$roomId userId:$userId){
            state
        }
    }
`


