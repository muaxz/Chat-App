import {gql} from "@apollo/client"


export const CreateUser = gql`
    mutation CreateUser($userName:String!){
        createUser(userName:$userName){
            state
        }
    }
`

export const CreateMessage = gql`
    mutation CreateUser($message:String! $RoomId:Int! $UserId:String!){
        createUser(message:$message RoomId:$RoomId UserId:$UserId){
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


