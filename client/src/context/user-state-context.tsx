import React,{createContext, useEffect, useRef, useState} from 'react';
import {useQuery} from "@apollo/client"
import {GetCurrentUser} from "../GraphQL/queries"
import {io} from "socket.io-client"

export const UserContext = createContext<any>("")

interface Props{
    children:JSX.Element
}

const socket = io("http://localhost:3001")

export default function UserLoginContext(props:Props){

    const {data,loading,error} = useQuery<any,{userId:string}>(GetCurrentUser,{variables:{userId:localStorage.getItem("userId")!}})
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false)
    const [userState,setUserState] = useState<{userName:string,profileUrl:string,id:string}>({
        userName:"",
        profileUrl:"",
        id:"",
    })
    const [isUserInRoom,setisUserInRoom] = useState<boolean>(false)
    const [currentUserRoom,setCurrentUserRoom] = useState<number>(0)

    useEffect(()=>{

        socket.on("connect",()=>{
            console.log("connected")
        })

        if(data){
            setUserState(data.getCurrentUser)
            socket.emit("connected",data.getCurrentUser.id)
        }   

    },[data])

    return(

        <UserContext.Provider value={{userState,isLoggedIn,setIsLoggedIn,isUserInRoom,setisUserInRoom,socket,currentUserRoom,setCurrentUserRoom}}>
            {props.children}
        </UserContext.Provider>

    )

}