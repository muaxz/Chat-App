import React, { useEffect, useState , useContext, useRef} from 'react';
import LeftSide from '../components/leftSide/leftSide';
import MiddleSide from '../components/middleSide/middleSide';
import RightSide from '../components/rightSide/rightSide';
import styles from "../app.module.css"
import {useLazyQuery} from "@apollo/client"
import {GetRoomMessages} from "../GraphQL/queries"
import {useSearchParams} from "react-router-dom"
import {UserContext} from "../context/user-state-context"



export default function ChatPage (){
    const {isUserInRoom,currentUserRoom,socket,userState} = useContext(UserContext)
    const [getParam,setParam] = useSearchParams()
    const currentUserId = useRef()
    const roomId = getParam.get("roomId")
    const [getRoomMessages,{data,loading,error}] = useLazyQuery(GetRoomMessages)
    const [Messages,setMessages] = useState<any[]>([])
    const [currentWriterName,setCurrentWriterName] = useState<string>("")
    const isWriterAbsent = useRef(true);
    const timeOut = useRef<any>(null);
    
    currentUserId.current = userState.id

    useEffect(()=>{

        if(data){
            setMessages(data.getRoomMessages.messages)
        }

    },[data])

    const writerSignHandler=()=>{
        clearTimeout(timeOut.current)
        timeOut.current = setTimeout(() => {
            setCurrentWriterName("")
        }, 3000);
    }
    
    useEffect(()=>{

        socket.on("oneWriting",(memberName:string)=>{
             writerSignHandler()
             setCurrentWriterName(memberName)
        })

    },[])

    useEffect(()=>{
    
       if(currentUserRoom !== 0){
         getRoomMessages({
            variables:{
                roomId:currentUserRoom
            }
         })
       }

    },[currentUserRoom])

    useEffect(()=>{

        socket.on("newMessage",(message:any)=>{
           
            if(message.userId !== currentUserId.current){
                setMessages(prev=>([...prev,message]))
            }
        })

    },[])

    if(error){
        console.log(error)
    }

    
    return(
        <div>
            <div className={styles.innerdiv}>
                <LeftSide></LeftSide>
                {   
                    isUserInRoom ?
                    (<React.Fragment>
                        <MiddleSide currentWriter={currentWriterName} setMessages={setMessages} messageList={Messages}></MiddleSide>
                        <RightSide  memberList={data ? data.getRoomMessages.users : []}></RightSide>
                    </React.Fragment>)

                     : 

                    (<div className={styles.notInRoom}>  
                        <div style={{textAlign:"center"}}>
                            <h1 style={{paddingBottom:"30px"}}>START A CONVERSATION</h1>
                            <img style={{width:"50%"}} src="/groupchat2.png" alt="" />
                        </div>
                    </div>)
                }
            </div>
        </div>
    )

}