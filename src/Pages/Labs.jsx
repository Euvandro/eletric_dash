import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

function Labs(props) {

    const [laboratorios, setLaboratorios] = useState([
        {
            nome: "Painel Elétrico DC 2",
            ip: "150.162.233.153",
            camera: "150.162.233.153:8080"
        },
        {
            nome: "Painel Elétrico AC",
            ip: "150.162.233.160",
            camera: "150.162.233.160:8080"
        },
        {
            nome: "Painel Elétrico DC 1",
            ip: "150.162.233.161",
            camera: "150.162.233.161:8080"
        },
        {
            nome: "Condução em barras 2",
            ip: "150.162.233.162",
            camera: "150.162.233.162:8080"
        },
        {
            nome: "Plano Inclinado 2",
            ip: "150.162.233.163",
            camera: "150.162.233.163:8080"
        },
        {
            nome: "Propagação de Calor",
            ip: "150.162.233.164",
            camera: "150.162.233.164:8080"
        },
        {
            nome: "Microscópio",
            ip: "150.162.233.165",
            camera: "150.162.233.165:8080"
        },
        {
            nome: "Fotovoltaico",
            ip: "150.162.233.166",
            camera: "150.162.233.166:8080"
        },
        {
            nome: "Disco de Newton",
            ip: "150.162.233.167",
            camera: "150.162.233.167:8080"
        },
        {
            nome: "Condução em barras",
            ip: "150.162.233.168",
            camera: "150.162.233.168:8080"
        },
        {
            nome: "Banco óptico",
            ip: "150.162.233.169",
            camera: "150.162.233.169:8080"
        },
        {
            nome: "Blockino",
            ip: "150.162.233.170",
            camera: "150.162.233.170:8080"
        },
        {
            nome: "Blockino (2ª inst)",
            ip: "150.162.233.154",
            camera: "150.162.233.154:8080"
        },
        {
            nome: "Blockino (3ª inst)",
            ip: "150.162.233.159",
            camera: "150.162.233.159:8080"
        },
        {
            nome: "Blockino (4ª inst)",
            ip: "150.162.233.195",
            camera: "150.162.233.195:8080"
        },
        {
            nome: "Blockino (5ª inst)",
            ip: "150.162.233.196",
            camera: "150.162.233.196:8080"
        },
        {
            nome: "Blockino (6ª inst)",
            ip: "150.162.233.206",
            camera: "150.162.233.206:8080"
        },
        {
            nome: "Arduino 1",
            ip: "150.162.233.179",
            camera: "150.162.233.179:8080"
        },
        {
            nome: "Arduino 1 (2ª inst)",
            ip: "150.162.233.180",
            camera: "150.162.233.180:8080"
        },
        {
            nome: "Arduino 1 (3ª inst)",
            ip: "150.162.233.181",
            camera: "150.162.233.181:8080"
        },
        {
            nome: "Plano Inclinado 1",
            ip: "150.162.233.194",
            camera: "150.162.233.194:8080"
        },
        {
            nome: "Painel Elétrico AC 2",
            ip: "150.162.233.182",
            camera: "150.162.233.182:8080"
        },
        {
            nome: "Painel Elétrico AC 3",
            ip: "150.162.233.186",
            camera: "150.162.233.186:8080"
        },
        {
            nome: "Blockino SATIC 1",
            ip: "150.162.233.185",
            camera: "150.162.233.185:8080"
        },
        {
            nome: "Blockino SATIC 2",
            ip: "150.162.233.203",
            camera: "150.162.233.203:8080"
        },
        {
            nome: "Blockino SATIC 3",
            ip: "150.162.233.204",
            camera: "150.162.233.204:8080"
        },
        {
            nome: "Pêndulo",
            ip: "wpa@150.162.233.190",
            camera: "wpa@150.162.233.190:8080"
        }
    ]);

    const checkPing = async (ip) => {
        try {
            const response = await axios.get(`http://${ip}`);
            if (response.data.success) {
                setStatus('IP alcançável');
            } else {
                setStatus('IP inalcançável');
            }
        } catch (error) {
            setStatus('Erro ao tentar pingar o IP.');
        }
    };
    
    function loaded(index){
        let labs = [...laboratorios];
        labs[index].success = true;
        setLaboratorios([...labs]);
    }

    return (
        <div className='flex justify-center flex-wrap'>
            <div className='text-xl my-5'>
                Laboratórios
            </div>
            <div className='flex justify-center flex-wrap gap-4'>
                {laboratorios.map((item, i) => (
                    <div className='bg-slate-500 p-4 rounded-lg border-black border-2' style={{background: item.success ? "green" : 'red'}}>
                        <img onLoad={() => loaded(i)} className='w-48 border-black border-2' src={"http://" + item.camera} />
                        <div>{item.nome}</div>
                        <div>{item.ip}</div>
                        <Button variant='contained' onClick={() => checkPing(item.ip)}>Check</Button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Labs;