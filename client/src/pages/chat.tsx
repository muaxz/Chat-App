import React from 'react';
import LeftSide from '../components/leftSide/leftSide';
import MiddleSide from '../components/middleSide/middleSide';
import RightSide from '../components/rightSide/rightSide';
import styles from "../app.module.css"

export default function ChatPage (){

    return(
        <div>
            <div className={styles.innerdiv}>
                <LeftSide></LeftSide>
                <MiddleSide></MiddleSide>
                <RightSide></RightSide>
            </div>
        </div>
    )

}