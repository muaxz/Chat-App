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
    const [memberList,setMemberList] = useState<any[]>([])
    const allowExecute = useRef<boolean>(true)
    const memberListRef = useRef<Array<{user_name:string,id:string,profile_url:string}>>([])
    
    useEffect(()=>{
      
        socket.on("newMember",(member:any)=>{ 
            console.log("in member")
            setMemberList([...memberListRef.current,member.user])
            memberListRef.current = [...memberListRef.current,member.user]
        })

        socket.on("outMember",({userId,roomId}:{userId:string,roomId:number})=>{
                //console.log(memberListRef.current)
              
                const outUserIndex = memberListRef.current.findIndex((item)=>item.id === userId)
                memberListRef.current.splice(outUserIndex,1)
                setMemberList([...memberListRef.current])
        })

    },[])

    useEffect(()=>{

      setMemberList(props.memberList)
      memberListRef.current = props.memberList
      
    },[props.memberList])

    useEffect(()=>{
        
        if(currentUserRoom !== 0){
            setMemberList(prev=>([...prev,userState]))
            allowExecute.current = false;
        }
        
    },[])
    
    const leaveRoomHandler = ()=>{
        socket.emit("leaveRoom",{currentUserRoom,userId:userState.id})
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
                                <img style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}} src={member.profile_url === "" ? "/user.jpg" : member.profile_url} alt="" />
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