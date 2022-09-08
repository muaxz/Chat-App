import React,{useRef} from 'react';
import styles from "./rightside.module.css"

export default function RightSide(){

    const memberList = useRef<Array<{image:string,fullName:string}>>([{image:"./lecrec.png",fullName:"Lecrec"},{image:"./nadal.jpg",fullName:"Nadal"},{image:"./user.jpg",fullName:"Joe"},{image:"./me.jpg",fullName:"Emre Ozer"}])
    
    return(
        <div className={styles.outerdiv}>
            <div className={styles.innerdiv}>
                 <h1 style={{textAlign:"center",paddingBottom:"20px",borderBottom:"1px solid lightgrey"}}>MEMBERS</h1>
                 <div style={{paddingTop:"20px"}}>
                    {memberList.current.map((member,index)=>(
                        <div className={styles.memberchild}>
                            <div className={styles.profilePhoto}>
                                <img style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}} src={member.image} alt="" />
                            </div>
                            <div style={{paddingLeft:"20px",fontSize:"20px"}}>
                                {member.fullName}
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    )

}