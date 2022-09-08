import React, {useState} from 'react';
import styles from "../login.module.css"
import {TextField,Button} from "@mui/material"
import {ArrowForwardIos} from "@mui/icons-material"
import {useQuery,useMutation} from "@apollo/client"
import {useNavigate} from "react-router-dom"


export default function LoginPage(){

    const [nameValue,setNameValue] = useState<{name:string,error:boolean}>({name:"",error:false})
    const  navigate = useNavigate()

    function SubmitLogin(){

        if(nameValue.name === ""){
            return setNameValue(prev=>({...prev,error:true}))
        }

        navigate("/chat")
        
    }

    return(
        <div className={styles.outerdiv}>
            <div className={styles.head_title}>
                <h1 style={{textTransform:"capitalize"}}>Start Chatting with People who have similar interests as you </h1>
            </div>
            <div className={styles.input_holder}>
                <TextField onChange={(e)=>setNameValue(prev=>({...prev,name:e.target.value}))} style={{paddingBottom:"20px"}} color="secondary" variant="outlined" fullWidth label="Enter your name..."></TextField>
                <Button onClick={SubmitLogin} style={{backgroundColor:"#ff5d73"}} size="large" fullWidth variant="contained" endIcon={<ArrowForwardIos></ArrowForwardIos>}>Start Chatting</Button>
            </div>
        </div>
    )

}