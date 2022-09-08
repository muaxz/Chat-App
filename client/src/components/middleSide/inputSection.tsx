import React from 'react';
import styles from "./middleside.module.css"
import SendIcon from "@mui/icons-material/Send"
import {TextField,InputAdornment} from "@mui/material"

export default function InputSection (){
    return(
        <div className={styles.inputsection}>
            <div className={styles.inputholder}>
                <TextField fullWidth InputProps={{endAdornment:<InputAdornment position="end"><SendIcon></SendIcon></InputAdornment>}} variant="outlined" label="write a message..."></TextField>
            </div>
        </div>
    )
}