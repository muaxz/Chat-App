import React,{useState,useRef} from 'react';
import styles from "./middleside.module.css"

export default function MiddleSide (){
    const messages = useRef<Array<{message:string,userId:number}>>([{message:"how are you?",userId:1},{message:"I am fine what about u?",userId:2},{message:"how was your day?",userId:1}])
    return(
        <div className={styles.outerdiv}>
            <div className={styles.chatholder}>
                {messages.current.map((item,index:number)=>(
                    <div style={{display:"flex",flexDirection:item.userId === 1 ? "row-reverse" : "row",marginBottom:"10px",paddingRight:"50px",paddingLeft:"50px"}}>
                        <div className={`${item.userId === 1 ? styles.chat_box_right : styles.chat_box_left} ${styles.chat_box}`}>
                            <div className={`${item.userId === 1 ? styles.profilePhotoRight : styles.profilePhotoLeft} ${styles.profilePhoto}`}>
                                <img  style={{width:"100%",objectFit:"cover"}} src="/logo192.png" alt="" />
                            </div>
                            <span className={styles.textPart}>
                                {item.message}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )

}