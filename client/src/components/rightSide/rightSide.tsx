import React,{useRef,useContext, useEffect, useState} from 'react';
import styles from "./rightside.module.css"
import {UserContext} from "../../context/user-state-context"


interface Props{
    memberList:Array<any>;
}

export default function RightSide(props:Props){
    const {socket,currentUserRoom,userState} = useContext(UserContext)
    const [memberList,setMemberList] = useState<Array<{user_name:string,id:number}>>([])
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


    return(
        <div className={styles.outerdiv}>
            <div className={styles.innerdiv}>
                 <h1 style={{textAlign:"center",paddingBottom:"20px",borderBottom:"1px solid lightgrey"}}>MEMBERS</h1>
                 <div style={{paddingTop:"20px"}}>
                    {memberList.map((member,index)=>(
                        <div key={index} className={styles.memberchild}>
                            <div className={styles.profilePhoto}>
                                <img style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}} src={"./nadal.jpg"} alt="" />
                            </div>
                            <div style={{paddingLeft:"20px",fontSize:"20px"}}>
                                {member.user_name}
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    )

}