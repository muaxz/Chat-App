import React, { useEffect, useState ,useContext} from 'react';
import styles from "./leftside.module.css"
import {useSearchParams,Link,useNavigate} from "react-router-dom"
import {useMutation, useQuery} from "@apollo/client"
import {GetAllRooms} from "../../GraphQL/queries"
import {JoinRoom} from "../../GraphQL/mutations"
import AddIcon from "@mui/icons-material/Add"
import CreateRoomWindow from "./createRoomWindow"
import {UserContext} from "../../context/user-login-context"


export default function LeftSide(){
    
    const {data,loading,error} = useQuery(GetAllRooms)
    const {setisUserInRoom,socket} = useContext(UserContext)
    const navigate = useNavigate()
    const [joinRoom,{data:joinData,loading:joinLoading,error:joinError}] = useMutation(JoinRoom)
    const [rooms,setRooms] = useState<{room_name:string,room_limit:number,id:number}[]>([])
    const [isWindowActive,setIsWindowActive] = useState<boolean>(false)
    
    if(error){
        console.log(error)
    }   

    useEffect(()=>{
        if(data)
        setRooms(data.getRooms)
    },[data])

    const addNewOne=(roomObject:any)=>{
        setIsWindowActive(false)
        setRooms(prev=>([...prev,roomObject.createRoom]))
    }
    
    const joinRoomHandler=(roomId:number)=>{
         
         joinRoom({
            variables:{
                roomId:roomId,
                userId:localStorage.getItem("userId")
            }
         }).then((res)=>{
            console.log(res.data)
             if(res.data.joinRoom.state !== "full"){
                 navigate(`/chat?roomId=${roomId}`)
                 setisUserInRoom(true)
                 socket.emit("joinRoom",roomId)
             }
         })
    }
    
    return(
        <div className={styles.outerdiv}>
            <div style={{display:isWindowActive ? "block" : "none"}}>
                <div onClick={()=>setIsWindowActive(false)} className={styles.blackCover}></div>
                <CreateRoomWindow addNewOne={addNewOne}></CreateRoomWindow>
            </div>
           <div onClick={()=>setIsWindowActive(true)} style={{marginTop:"20px",width:"25px",height:"25px",backgroundColor:"lightgrey",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"auto",marginRight:"20px",cursor:"pointer"}}><AddIcon style={{color:"white"}}></AddIcon></div>
           <div className={styles.group_holder}>
               {rooms.map((item,index)=>(
                   <div onClick={()=>joinRoomHandler(item.id)}  key={index} className={styles.group_child}>
                        <div>{item.room_name}</div>
                        <div>(1/4)</div>
                    </div>
               ))}
           </div>
        </div>
    )

}