import React, { HtmlHTMLAttributes, useState } from 'react';
import styles from "./leftside.module.css"
import {TextField,Button,FormControl,InputLabel,MenuItem,Select} from "@mui/material"

export default function CreateRoomWindow (){

    const [roomValues,setRoomValues] = useState<{roomName:string,memberLimit:number}>({
        roomName:"",
        memberLimit:1
    })

    const inputHandler=(e:any, field:string)=>{
     
         let target = e.target as HTMLInputElement
         setRoomValues(prev=>({...prev,[field]:target.value}))
         
    }

    const CreateRoom = ()=>{

    }

    return(

        <div className={styles.window_outer}>
            <div className={styles.window_inner}>
                <TextField onChange={(e)=>inputHandler(e,"roomName")} variant="filled" fullWidth style={{paddingBottom:"20px"}} label="Entere a room name..."></TextField>
                <FormControl variant="filled" style={{paddingBottom:"40px"}} fullWidth>
                        <InputLabel id="demo-simple-select-label">Choose Member Limit</InputLabel>
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
                <Button  onClick={CreateRoom} variant="contained">Create</Button>
            </div>
        </div>

    )

}