import React,{createContext, useEffect, useState} from 'react';
import {useQuery} from "@apollo/client"
import {} from "../GraphQL/queries"
import {io} from "socket.io-client"

export const UserContext = createContext<any>("")

interface Props{
    children:JSX.Element
}

const socket = io("http://localhost:3001")

export default function UserLoginContext(props:Props){

    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [userState,setUserState] = useState<{userName:string,profileUrl:string,id:string}>({
        userName:"",
        profileUrl:"",
        id:"",
    })
    const [isUserInRoom,setisUserInRoom] = useState(false)


    return(

        <UserContext.Provider value={{userState,isLoggedIn,setIsLoggedIn,isUserInRoom,setisUserInRoom,socket}}>
            {props.children}
        </UserContext.Provider>

    )

}