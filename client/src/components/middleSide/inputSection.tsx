import React, { useState } from 'react';
import styles from "./middleside.module.css"
import SendIcon from "@mui/icons-material/Send"
import {TextField,InputAdornment,Button} from "@mui/material"
import {useSearchParams} from "react-router-dom"
import { useMutation } from '@apollo/client';
import {CreateMessage} from "../../GraphQL/mutations"


export default function InputSection (){

    const [message,setMessage] = useState<string>("")
    const [searchParams,setSearchParams] = useSearchParams()
    var roomId = searchParams.get("roomId")!
    const [createMessage,{data,loading,error}] = useMutation<any,{RoomId:number,message:string,UserId:string}>(CreateMessage)
    const UserId = localStorage.getItem("userid")!

    if(error){
        console.log(error)
    }

    const SubmitMessage = ()=>{
        createMessage({
            variables:{
                RoomId:parseInt(roomId),
                message:message,
                UserId:UserId,
            }
        })
    }

    return(
        <div className={styles.inputsection}>
            <div className={styles.inputholder}>
                <TextField value={message} onChange={(e)=>setMessage(e.target.value)} fullWidth InputProps={{endAdornment:<InputAdornment position="end"><Button onClick={SubmitMessage} endIcon={<SendIcon></SendIcon>}></Button></InputAdornment>}} variant="outlined" label="write a message..."></TextField>
            </div>
        </div>
    )
}