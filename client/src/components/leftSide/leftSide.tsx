import React from 'react';
import styles from "./leftside.module.css"
import {useParams} from "react-router-dom"
import {useQuery} from "@apollo/client"
import {GetAllRooms} from "../../GraphQL/queries"

export default function LeftSide(){
    /*
    const {data,loading,error} = useQuery(GetAllRooms)
    
    if(error){
        console.log(error)
    }
    */

    return(
        <div className={styles.outerdiv}>
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