import { Typography } from '@mui/material';
import React from 'react';

function Stats({title, menor, maior, horario_maior, horario_menor}) {
    return (
        <div className="bg-slate-600 p-4 border-black border-2 mx-2 my-7 shadow-md rounded-2xl">


                            <div className='flex border-black justify-between items-end text-white'>

                                <div className='text-3xl font-bold'>
                                    {title}
                                </div>

                                <Typography>
                                    {new Date().toLocaleDateString("pt-BR")}
                                </Typography>

                            </div>

                            <div className='flex justify-between my-4 text-white'>

                                <Typography variant='h6'>Mínimo</Typography>

                                <div>
                                    <Typography variant='h6' className='text-red-400'>{menor}</Typography>
                                    <Typography>{horario_menor}</Typography>
                                </div>

                            </div>


                            <div className='flex justify-between text-white'>

                                <Typography variant='h6'>Máximo</Typography>

                                <div>
                                <Typography variant='h6' className='text-green-400'>{maior}</Typography>
                                <Typography>{horario_maior}</Typography>
                                </div>

                            </div>


                        </div>
    );
}

export default Stats;