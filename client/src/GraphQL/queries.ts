import {gql} from "@apollo/client"


export const GetAllRooms = gql`
    query{
        getRooms{
            id
            room_name
            room_limit
            MemberCount
        }
    }

`


export const GetRoomMessages = gql`
    query GetRoomMessages($roomId:Int!){
        getRoomMessages(roomId:$roomId){
           room_name
           room_limit
           users{
             id
             user_name
             profile_url
           }
           messages{
                id
                message
                user{
                    id
                    user_name
                    profile_url
                }
           }
        }
    }
`

export const GetCurrentUser = gql`
    query GetCurrentUser($userId:String!){
        getCurrentUser(userId:$userId){
            id
            user_name
            profile_url
            roomId
        }
    }
`