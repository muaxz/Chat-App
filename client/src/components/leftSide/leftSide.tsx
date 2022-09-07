import React from 'react';
import styles from "./leftside.module.css"

export default function LeftSide (){
    return(
        <div className={styles.outerdiv}>
           <div className={styles.group_holder}>
               {[0,0,0,0].map((item,index)=>(
                   <div className={styles.group_child}>
                        <div>React Community</div>
                        <div>(1/4)</div>
                    </div>
               ))}
           </div>
        </div>
    )

}