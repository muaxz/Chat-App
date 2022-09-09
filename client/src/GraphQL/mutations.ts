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


