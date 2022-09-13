import React,{useRef,useContext, useEffect, useState} from 'react';
import styles from "./rightside.module.css"
import {UserContext} from "../../context/user-state-context"
import {ChevronRight} from "@mui/icons-material"
import {Button} from "@mui/material"


interface Props{
    memberList:Array<any>;
}

export default function RightSide(props:Props){
    const {socket,currentUserRoom,userState,setisUserInRoom,setCurrentUserRoom} = useContext(UserContext)
    const [memberList,setMemberList] = useState<Array<{user_name:string,id:number,profile_url:string}>>([])
    const allowExecute = useRef<boolean>(true)
    
    useEffect(()=>{

        socket.on("newMember",(member:any)=>{
            
            if(currentUserRoom !== member.roomId){
                setMemberList(prev=>([...prev,member.user]))
            }

        })

    },[socket])

    useEffect(()=>{

      setMemberList(props.memberList)
      
    },[props.memberList])

    useEffect(()=>{
        
        if(currentUserRoom !== 0 && allowExecute.current){
            setMemberList(prev=>([...prev,userState]))
            allowExecute.current = false;
        }
        
    },[currentUserRoom])
    
    const leaveRoomHandler = ()=>{
        socket.emit("leaveRoom",currentUserRoom)
        setisUserInRoom(false)
        setCurrentUserRoom(0)
    }

    return(
        <div className={`${styles.outerdiv}`}>
            <div className={styles.innerdiv}>
                 <div style={{position:"absolute",top:"25px",paddingLeft:"20px"}}><ChevronRight fontSize="large"></ChevronRight></div>
                 <h1 style={{textAlign:"center",paddingBottom:"20px",borderBottom:"1px solid lightgrey"}}>MEMBERS</h1>
                 <div style={{paddingTop:"20px",paddingLeft:"20px"}}>
                    {memberList.map((member,index)=>(
                        <div key={index} className={styles.memberchild}>
                            <div className={styles.profilePhoto}>
                                <img style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}} src={member.profile_url} alt="" />
                            </div>
                            <div style={{paddingLeft:"20px",fontSize:"20px"}}>
                                {userState.id === member.id ? "You" : member.user_name}
                            </div>
                        </div>
                    ))}
                 </div>
                 <div className={styles.leaveButton}>
                    <Button onClick={leaveRoomHandler} variant="contained">Leave Room</Button>
                 </div>
            </div>
        </div>
    )

}