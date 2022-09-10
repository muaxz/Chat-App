import React, { useEffect, useState } from 'react';
import styles from "./leftside.module.css"
import {useParams} from "react-router-dom"
import {useQuery} from "@apollo/client"
import {GetAllRooms} from "../../GraphQL/queries"
import AddIcon from "@mui/icons-material/Add"
import CreateRoomWindow from "./createRoomWindow"


export default function LeftSide(){
    
    const {data,loading,error} = useQuery(GetAllRooms)
    const [rooms,setRooms] = useState<{room_name:string,room_limit:number,id:number}[]>([])
    const [isWindowActive,setIsWindowActive] = useState<boolean>(false)
    
    useEffect(()=>{
        if(data)
        setRooms(data.getRooms)
    },[data])

    if(error){
        console.log(error)
    }   

    const addNewOne=(roomObject:any)=>{

        setRooms(prev=>([...prev,roomObject.createRoom]))
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
                   <div key={index} className={styles.group_child}>
                        <div>{item.room_name}</div>
                        <div>(1/4)</div>
                    </div>
               ))}
           </div>
        </div>
    )

}