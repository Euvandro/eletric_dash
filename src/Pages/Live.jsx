import { CircularProgress, Typography } from '@mui/material';
import React, { useState } from 'react';



export default function Live(){

    const [loading, setLoading] = useState(true);

    return(

        <div className='flex justify-center'>
        

            <div className='bg-slate-600 p-4 pb-2 m-4 rounded-lg relative' style={{minWidth:"640px", minHeight:"480px"}}>
                <CircularProgress color='white' size={80} className='absolute' style={{display: loading ? "block" : "none", transform: "translate(-50%, -50%)", top:"50%", left:"50%"}}/>
                <img src='https://cam.rexlab.ufsc.br/motion' onLoad={() => setLoading(false)} />
                
                <Typography className='pt-2'>
                Laboratório de Experimentação Remota - UFSC Araranguá
                </Typography>
            </div>

        </div>

    )
}