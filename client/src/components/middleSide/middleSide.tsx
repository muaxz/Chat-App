import React,{useState,useRef, useEffect} from 'react';
import styles from "./middleside.module.css"
import InputSection from "./inputSection"
import {io} from "socket.io-client"

interface Props{
    messageList:Array<any>,
    setMessages:React.Dispatch<React.SetStateAction<any[]>>
}

const socket = io("http://localhost:3001")

export default function MiddleSide(props:Props){

    const messages = useRef<Array<{message:string,userId:number}>>([{message:"how are you?",userId:1},{message:"I am fine what about u?",userId:2},{message:"how was your day?",userId:1}])
    const CurrentUserId = localStorage.getItem("userId")

    useEffect(()=>{

        socket.on("connect",()=>{
            console.log("connected")
        })

        socket.on("lo",(value)=>{
            console.log(value)
        })

    },[])

    return(
        <div className={styles.outerdiv}>
            <div className={styles.chatholder}>
                {props.messageList.map((item,index:number)=>(
                    <div key={index} style={{display:"flex",flexDirection:item.user.id === CurrentUserId ? "row-reverse" : "row",marginBottom:"30px",paddingRight:"50px",paddingLeft:"50px"}}>
                        <div className={`${item.user.id === CurrentUserId ? styles.chat_box_right : styles.chat_box_left} ${styles.chat_box}`}>
                            <div className={`${item.user.id === CurrentUserId ? styles.profilePhotoRight : styles.profilePhotoLeft} ${styles.profilePhoto}`}>
                                <img  style={{width:"100%",objectFit:"cover"}} src="/logo192.png" alt="" />
                            </div>
                            <span className={styles.textPart}>
                                {item.message}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <InputSection setMessages={props.setMessages}></InputSection>
        </div>

    )

}