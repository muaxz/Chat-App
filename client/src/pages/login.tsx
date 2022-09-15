import React, {useState,useContext} from 'react';
import styles from "../login.module.css"
import {TextField,Button} from "@mui/material"
import {ArrowForwardIos} from "@mui/icons-material"
import {useQuery,useMutation} from "@apollo/client"
import {CreateUser} from "../GraphQL/mutations"
import {useNavigate,Navigate} from "react-router-dom"
import {UserContext} from "../context/user-state-context"


export default function LoginPage(){
    const [nameValue,setNameValue] = useState<{name:string,error:boolean}>({name:"",error:false})
    const {refetch} = useContext(UserContext)
    const [createUser,{data,error,loading}] = useMutation<{createUser:{state:string,UserToken:string}},any>(CreateUser)
    const  navigate = useNavigate()
    

    if(localStorage.getItem("userId")){
        return <Navigate to={"/chat"}></Navigate>
    }

    if(error){
        console.log("error occured")
    }


    async function SubmitLogin(){

        if(nameValue.name === ""){
            return setNameValue(prev=>({...prev,error:true}))
        }
    
        await createUser({variables:{
            userName:nameValue.name
        }}).then((res)=>{
            localStorage.setItem("userId",res.data?.createUser.UserToken!)
            refetch({userId:localStorage.getItem("userId")!})
        })

        navigate("/chat")
        
    }

    return(
        <div className={styles.outerdiv}>
            <div className={styles.head_title}>
                <h1 style={{textTransform:"capitalize"}}>Start Chatting with People who have similar interests as you </h1>
            </div>
            <div className={styles.input_holder}>
                <TextField  helperText={nameValue.error ? "Please enter a name" : ""} error={nameValue.error}  onChange={(e)=>setNameValue(prev=>({...prev,name:e.target.value}))} style={{paddingBottom:"20px"}} color="secondary" variant="outlined" fullWidth label="Enter your name..."></TextField>
                <Button onClick={SubmitLogin} style={{backgroundColor:"#ff5d73"}} size="large" fullWidth variant="contained" endIcon={<ArrowForwardIos></ArrowForwardIos>}>Start Chatting</Button>
            </div>
        </div>
    )

}