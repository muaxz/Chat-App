import React,{createContext, useEffect, useRef, useState} from 'react';
import {useQuery} from "@apollo/client"
import {GetCurrentUser} from "../GraphQL/queries"
import {io} from "socket.io-client"
import {useNavigate} from "react-router-dom"
import dotenv from "dotenv"


export const UserContext = createContext<any>("")

interface Props{
    children:JSX.Element
}

const productionUrl = "https://chat-app-ts-rjs.herokuapp.com"
const localUrl = "http://localhost:3001"

const socket = io(process.env.NODE_ENV === "development" ? localUrl : productionUrl)

export default function UserLoginContext(props:Props){
    const {data,loading,error,refetch} = useQuery<any,{userId:string}>(GetCurrentUser,{variables:{userId:localStorage.getItem("userId")!}})
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false)
    const [userState,setUserState] = useState<{user_name:string,profile_url:string,id:string,roomId:number | null}>({
        user_name:"",
        profile_url:"",
        id:"",
        roomId:null
    })
    const [isUserInRoom,setisUserInRoom] = useState<boolean>(false)
    const [currentUserRoom,setCurrentUserRoom] = useState<number>(0)
    const navigate = useNavigate()

    useEffect(()=>{


        if(data && localStorage.getItem("userId")){

            setUserState(data.getCurrentUser)
            if(data.getCurrentUser.roomId !== null){
                setCurrentUserRoom(data.getCurrentUser.roomId)
                setisUserInRoom(true)
            }
            socket.emit("connected", {userId:data.getCurrentUser.id,roomId:data.getCurrentUser.roomId})

        }else{

            navigate("/")

        } 

    },[data])

    return(

        <UserContext.Provider value={{refetch,userState,isLoggedIn,setIsLoggedIn,isUserInRoom,setisUserInRoom,socket,currentUserRoom,setCurrentUserRoom}}>
            {props.children}
        </UserContext.Provider>

    )

}