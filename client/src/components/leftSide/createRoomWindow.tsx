import React, { HtmlHTMLAttributes, useState } from 'react';
import styles from "./leftside.module.css"
import {useQuery,useMutation} from "@apollo/client"
import {CreateRoom} from "../../GraphQL/mutations"
import {TextField,Button,FormControl,InputLabel,MenuItem,Select} from "@mui/material"


type MutationRoomResponseType = {createRoom:{room_name:string,id:number,room_limit:number}}


interface Props{
    addNewOne:(value:MutationRoomResponseType)=>void
}


export default function CreateRoomWindow (props:Props){

    const [roomValues,setRoomValues] = useState<{roomName:string,memberLimit:number}>({
        roomName:"",
        memberLimit:1
    })


    const [createRoom,{data,error,loading}] = useMutation<MutationRoomResponseType,{roomName:string,roomLimit:number}>(CreateRoom)

    const inputHandler=(e:any, field:string)=>{
     
         let target = e.target as HTMLInputElement
         setRoomValues(prev=>({...prev,[field]:target.value}))
         
    }

    const CreateRoomFunction = async ()=>{
        
       const newRoom = await createRoom({
            variables:{
                roomName:roomValues.roomName,
                roomLimit:roomValues.memberLimit
            }
        })
        
        const roomResponse = newRoom.data as MutationRoomResponseType
        props.addNewOne(roomResponse)
    }

    return(

        <div className={styles.window_outer}>
            <div className={styles.window_inner}>
                <TextField onChange={(e)=>inputHandler(e,"roomName")} variant="filled" fullWidth style={{paddingBottom:"20px"}} label="Entere a room name..."></TextField>
                <FormControl variant="filled" style={{paddingBottom:"40px"}} fullWidth>
                        <InputLabel id="demo-simple-select-label">Choose A Member Limit</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            value={roomValues.memberLimit}
                            onChange={(e)=>inputHandler(e,"memberLimit")}
                        >
                            {
                                [0,0,0,0,0,].map((item,index)=>{
                                    return (  <MenuItem key={index} value={index+1}>{index+1}</MenuItem>)
                                })
                            }
                        </Select>
                </FormControl>
                <Button  onClick={CreateRoomFunction} variant="contained">Create</Button>
            </div>
        </div>

    )

}