import React, { useEffect, useState , useContext} from 'react';
import LeftSide from '../components/leftSide/leftSide';
import MiddleSide from '../components/middleSide/middleSide';
import RightSide from '../components/rightSide/rightSide';
import styles from "../app.module.css"
import {useLazyQuery} from "@apollo/client"
import {GetRoomMessages} from "../GraphQL/queries"
import {useSearchParams} from "react-router-dom"
import {UserContext} from "../context/user-state-context"



export default function ChatPage (){
    const {isUserInRoom,currentUserRoom} = useContext(UserContext)
    const [getParam,setParam] = useSearchParams()
    const roomId = getParam.get("roomId")
    const [getRoomMessages,{data,loading,error}] = useLazyQuery(GetRoomMessages)
    const [Messages,setMessages] = useState<any[]>([])
    
    useEffect(()=>{

        if(data){
            setMessages(data.getRoomMessages.messages)
        }

    },[data])

    useEffect(()=>{
        console.log(currentUserRoom)
       if(currentUserRoom !== 0){
         getRoomMessages({
            variables:{
                roomId:currentUserRoom
            }
         })
       }

    },[currentUserRoom])

    if(error){
        console.log(error)
    }

    
    return(
        <div>
            <div className={styles.innerdiv}>
                <LeftSide></LeftSide>
                {   
                    isUserInRoom &&
                    (<React.Fragment>
                        <MiddleSide setMessages={setMessages} messageList={Messages}></MiddleSide>
                        <RightSide  memberList={data ? data.getRoomMessages.users : []}></RightSide>
                    </React.Fragment>)
                }
            </div>
        </div>
    )

}