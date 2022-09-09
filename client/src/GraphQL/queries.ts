import {gql} from "@apollo/client"


export const GetAllRooms = gql`
    query{
        getRooms{
            id
            room_name
        }
    }

`