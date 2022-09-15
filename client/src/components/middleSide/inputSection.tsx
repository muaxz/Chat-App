import React, { useContext, useState } from 'react';
import styles from "./middleside.module.css"
import SendIcon from "@mui/icons-material/Send"
import {TextField,InputAdornment,Button} from "@mui/material"
import {useSearchParams} from "react-router-dom"
import { useMutation } from '@apollo/client';
import {CreateMessage} from "../../GraphQL/mutations"
import {UserContext} from "../../context/user-state-context"


interface Props{
    setMessages:React.Dispatch<React.SetStateAction<any[]>>
}

export default function InputSection (props:Props){

    const [message,setMessage] = useState<string>("")
    const [searchParams,setSearchParams] = useSearchParams()
    const {currentUserRoom,userState:{id}} = useContext(UserContext)
    const [createMessage,{data,loading,error}] = useMutation<any,{roomId:number,message:string,userId:string}>(CreateMessage)
    const UserId = localStorage.getItem("userId")!

    if(error){
        console.log(error)
    }

    const SubmitMessage = async ()=>{

        setMessage("")

        if(message === "") return;

        createMessage({
            variables:{
                roomId:currentUserRoom,
                message:message,
                userId:id,
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