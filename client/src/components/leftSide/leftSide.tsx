import React from 'react';
import styles from "./leftside.module.css"
import {useParams} from "react-router-dom"
import {useQuery} from "@apollo/client"
import {GetAllRooms} from "../../GraphQL/queries"
import AddIcon from "@mui/icons-material/Add"
import CreateRoomWindow from "./createRoomWindow"


export default function LeftSide(){
    
    const {data,loading,error} = useQuery(GetAllRooms)
    
    if(error){
        console.log(error)
    }
    
    return(
        <div className={styles.outerdiv}>
            <div>
                <div className={styles.blackCover}></div>
                <CreateRoomWindow></CreateRoomWindow>
            </div>
           <div style={{marginTop:"20px",width:"25px",height:"25px",backgroundColor:"lightgrey",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"auto",marginRight:"20px",cursor:"pointer"}}><AddIcon style={{color:"white"}}></AddIcon></div>
           <div className={styles.group_holder}>
               {[0,0].map((item,index)=>(
                   <div  key={index} className={styles.group_child}>
                        <div>React Community</div>
                        <div>(1/4)</div>
                    </div>
               ))}
           </div>
        </div>
    )

}