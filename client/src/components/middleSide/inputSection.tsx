import React, { useContext, useState } from 'react';
import styles from "./middleside.module.css"
import SendIcon from "@mui/icons-material/Send"
import {TextField,InputAdornment,Button} from "@mui/material"
import {useSearchParams} from "react-router-dom"
import { useMutation } from '@apollo/client';
import {CreateMessage} from "../../GraphQL/mutations"
import {UserContext} from "../../context/user-state-context"


interface Props{
    setMessages:any
}

export default function InputSection (props:Props){

    const [message,setMessage] = useState<string>("")
    const [searchParams,setSearchParams] = useSearchParams()
    const {currentUserRoom,userState} = useContext(UserContext)
    const [createMessage,{data,loading,error}] = useMutation<any,{roomId:number,message:string,userId:string}>(CreateMessage)
    const UserId = localStorage.getItem("userId")!

    if(error){
        console.log(error)
    }

    const SubmitMessage = async (e:{which:number})=>{

        if(e.which === 13 || e.which === 1300){
            
            setMessage("")

            props.setMessages((prev:any)=>([...prev,{message:message,user:userState}]))

            if(message.trim() === "") return;
    
            createMessage({
                variables:{
                    roomId:currentUserRoom,
                    message:message,
                    userId:userState.id,
                }
            })
        }
    }


    return(
        <div className={styles.inputsection}>
            <div className={styles.inputholder}>
                <TextField onKeyDown={SubmitMessage} value={message} onChange={(e)=>setMessage(e.target.value)} fullWidth InputProps={{endAdornment:<InputAdornment position="end"><Button onClick={()=>SubmitMessage({which:1300})} endIcon={<SendIcon></SendIcon>}></Button></InputAdornment>}} variant="outlined" label="write a message..."></TextField>
            </div>
        </div>
    )
}