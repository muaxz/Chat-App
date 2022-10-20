import React,{useState,useRef, useEffect,useContext} from 'react';
import styles from "./middleside.module.css"
import InputSection from "./inputSection"
import {UserContext} from "../../context/user-state-context"


interface Props{
    messageList:Array<any>,
    setMessages:React.Dispatch<React.SetStateAction<any[]>>,
    currentWriter:string
}

export default function MiddleSide(props:Props){

    const {socket,userState:{id}} = useContext(UserContext)
    const chatHolderRef = useRef<any>()

    const handleChatHolderScroll=(e:React.SyntheticEvent)=>{
        //console.log(e.currentTarget.scrollTop)
    
    }

    useEffect(()=>{
      
        chatHolderRef.current.scrollTop = chatHolderRef.current.scrollHeight

    },[props.messageList])

    return(
        <div className={styles.outerdiv}>
            <div ref={chatHolderRef} onScroll={handleChatHolderScroll} className={styles.chatholder}>
                {props.messageList.map((item,index:number)=>(
                    <div key={index} style={{display:"flex",flexDirection:item.user.id === id ? "row-reverse" : "row",marginBottom:"30px",paddingRight:"50px",paddingLeft:"50px",position:"relative"}}>
                        <div className={`${item.user.id === id ? styles.chat_box_right : styles.chat_box_left} ${styles.chat_box}`}>
                            <div className={`${item.user.id === id ? styles.profilePhotoRight : styles.profilePhotoLeft} ${styles.profilePhoto}`}>
                                <img  style={{width:"100%",objectFit:"cover",height:"100%",borderRadius:"50%"}} src={item.user.profile_url === "" ? "/user.jpg" : item.user.profile_url} alt="" />
                            </div>
                            <p style={{paddingLeft:"2px"}}>
                              {item.message}
                            </p>
                        </div>
                        <div className={item.user.id === id ? `${styles.userNameDiv} ${styles.userNameDivright}` : `${styles.userNameDiv} ${styles.userNameDivleft}`}>{item.user.user_name}</div>
                    </div>
                ))}
            </div>
            <InputSection currentWriter={props.currentWriter} setMessages={props.setMessages}></InputSection>
        </div>

    )

}