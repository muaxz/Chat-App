import {gql} from "@apollo/client"


export const GetAllRooms = gql`
    query{
        getRooms{
            id
            room_name
        }
    }

`


export const GetRoomMessages = gql`
    query GetRoomMessages($roomId:String!){
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
    query GetCurrentUser{
        getCurrentUser{
            user_name
            id
        }
    }
`