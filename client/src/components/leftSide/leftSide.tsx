import React, { useEffect, useState ,useContext, useRef} from 'react';
import styles from "./leftside.module.css"
import {useSearchParams,Link,useNavigate} from "react-router-dom"
import {useMutation, useQuery} from "@apollo/client"
import {GetAllRooms} from "../../GraphQL/queries"
import {JoinRoom} from "../../GraphQL/mutations"
import AddIcon from "@mui/icons-material/Add"
import CreateRoomWindow from "./createRoomWindow"
import {Button} from "@mui/material"
import {UserContext} from "../../context/user-state-context"


export default function LeftSide(){
    
    const {data,loading,error} = useQuery(GetAllRooms)
    const {setisUserInRoom,setCurrentUserRoom,currentUserRoom,userState,socket,setUserState} = useContext(UserContext)
    const navigate = useNavigate()
    const roomListRef = useRef<{room_name:string,room_limit:number,id:number,MemberCount:number}[]>([])
    const [joinRoom,{data:joinData,loading:joinLoading,error:joinError}] = useMutation(JoinRoom)
    const [rooms,setRooms] = useState<{room_name:string,room_limit:number,id:number,MemberCount:number}[]>([])
    const [isWindowActive,setIsWindowActive] = useState<boolean>(false)
    
    if(error){
        console.log(error)
    }   
   
    useEffect(()=>{

        if(data){
            setRooms(data.getRooms)
            roomListRef.current = data.getRooms
        }

    },[data])


    useEffect(()=>{

        socket.on("newRoom",(roomObject:any)=>{
            roomListRef.current = [...roomListRef.current,{...roomObject,MemberCount:0}]
            setRooms(roomListRef.current)
        })

    },[])

    useEffect(()=>{
        const copyRooms = roomListRef.current
        if(data){
            socket.on("roomNumberUp",(roomId:number)=>{
                const roomIndex = copyRooms.findIndex((item)=>item.id === roomId)
                copyRooms[roomIndex].MemberCount = copyRooms[roomIndex].MemberCount + 1
                setRooms([...copyRooms])
            })

            socket.on("roomNumberDown",(roomId:number)=>{
                const roomIndex = copyRooms.findIndex((item)=>item.id === roomId)
                copyRooms[roomIndex].MemberCount = copyRooms[roomIndex].MemberCount + -1
                setRooms([...copyRooms])
            })
        }
    },[data])

    const addNewOne=(roomObject:any)=>{
        setIsWindowActive(false)
    }
    
    const joinRoomHandler=(roomId:number,index:number)=>{
         
         if(currentUserRoom !== roomId){
            const copyRooms = [...rooms]
            joinRoom({
                variables:{
                    roomId:roomId,
                    userId:userState.id
                }
             }).then((res)=>{
                 
                 if(res.data.joinRoom.state !== "full"){
                     //navigate(`/chat?roomId=${roomId}`)
                     if(currentUserRoom !== 0){
                        const roomIndex = copyRooms.findIndex((item)=>item.id === currentUserRoom)
                        copyRooms[roomIndex].MemberCount -=1
                     }
                     socket.emit("joinRoom",{roomId,userState,currentUserRoom})
                     copyRooms[index].MemberCount +=1
                     setRooms(copyRooms)
                     setisUserInRoom(true)
                     setCurrentUserRoom(roomId)

                 }else{
                    
                 }
             })
             
         }
        
    }

    const SignOutHandler=()=>{
        localStorage.removeItem("userId")
        navigate("/")
        setCurrentUserRoom(0)
        setisUserInRoom(false)
        setUserState({
            user_name:"",
            profile_url:"",
            id:"",
            roomId:null
        })

    }
    
    return(
        <div className={styles.outerdiv}>
            <div style={{display:isWindowActive ? "block" : "none"}}>
                <div onClick={()=>setIsWindowActive(false)} className={styles.blackCover}></div>
                <CreateRoomWindow addNewOne={addNewOne}></CreateRoomWindow>
            </div>
            {
                joinLoading && 
                ( <div className={styles.loadingPanel}>
                    <div className={styles.blackCover}></div>
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>) 
            }
           <div style={{paddingLeft:"20px",display:"flex",alignItems:"center",paddingTop:"20px"}}>
                <div className={styles.profilePhoto}>
                    <img style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}} src={userState.profile_url === "" ? "/user.jpg" : userState.profile_url} alt="" />    
                </div>
                <div style={{paddingLeft:"20px"}}>
                    <span>{userState.user_name}</span>
                </div>
                <div style={{paddingLeft:"20px"}}>
                    <Button onClick={SignOutHandler} style={{backgroundColor:"#d7263d"}} size="small" variant="contained">Sign Out</Button>
                </div>
                <div onClick={()=>setIsWindowActive(true)} style={{width:"25px",height:"25px",backgroundColor:"lightgrey",borderRadius:"50%",display:"flex",marginLeft:"auto",justifyContent:"center",alignItems:"center",marginRight:"20px",cursor:"pointer"}}><AddIcon style={{color:"white"}}></AddIcon></div>
           </div>
           <div className={styles.group_holder}>
               {rooms.map((item,index)=>(
                   <div onClick={()=>joinRoomHandler(item.id,index)}  key={index} className={currentUserRoom !== item.id ? styles.group_child : `${styles.group_child} ${styles.selected}`}>
                        <div>{item.room_name}</div>
                        <div>({item.MemberCount}/{item.room_limit})</div>
                    </div>
               ))}
           </div>
        </div>
    )

}