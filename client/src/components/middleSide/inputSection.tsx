import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./middleside.module.css"
import SendIcon from "@mui/icons-material/Send"
import {TextField,InputAdornment,Button} from "@mui/material"
import {useSearchParams} from "react-router-dom"
import { useMutation } from '@apollo/client';
import {CreateMessage} from "../../GraphQL/mutations"
import {UserContext} from "../../context/user-state-context"


interface Props{
    setMessages:any,
    currentWriter:string
}

export default function InputSection (props:Props){

    const [message,setMessage] = useState<string>("")
    const [searchParams,setSearchParams] = useSearchParams()
    const {currentUserRoom,userState,socket} = useContext(UserContext)
    const [createMessage,{data,loading,error}] = useMutation<any,{roomId:number,message:string,userId:string}>(CreateMessage)
    const UserId = localStorage.getItem("userId")!
    const inputController = useRef<boolean>(true)


    if(error){
        console.log(error)
    }


    const SubmitMessage = async (e:{which:number})=>{

        if(message.trim() === "") return;


        if(e.which === 13 || e.which === 1300){
            
            setMessage("")

            props.setMessages((prev:any)=>([...prev,{message:message,user:userState}]))
    
            createMessage({
                variables:{
                    roomId:currentUserRoom,
                    message:message,
                    userId:userState.id,
                }
            })
        }
    }

    const ChangeHandler=(e:any)=>{
        
        setMessage(e.target.value)
        socket.emit("oneWriting",{memberName:userState.user_name,currentUserRoom:currentUserRoom})
    }

    return(
        <div className={styles.inputsection}>
            <div className={styles.inputholder}>
                <div className={`${styles.writer_sign} ${props.currentWriter.length ? styles.active : ""}`}>
                    {props.currentWriter+"     " || "Micheal"} . . .
                </div>
                <TextField onKeyDown={SubmitMessage} value={message} onChange={ChangeHandler} fullWidth InputProps={{endAdornment:<InputAdornment position="end"><Button onClick={()=>SubmitMessage({which:1300})} endIcon={<SendIcon></SendIcon>}></Button></InputAdornment>}} variant="outlined" label="write a message..."></TextField>
            </div>
        </div>
    )
}