import React, { useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component';
import Axios from '../Service/Axios';
import { LineChart } from '@mui/x-charts';
import { Card, Typography } from '@mui/material';
import Stats from '../components/Stats';

function Dashboard(props) {


    const [tensao, setTensao] = useState("200");
    const [corrente, setCorrente] = useState("3");
    const [potencia, setPotencia] = useState("500");

    const [hist, setHist] = useState();
    const [stats, setStats] = useState({});

    function toDateWithOutTimeZone(date) {
        let tempTime = date.split(":");
        let dt = new Date();
        dt.setHours(tempTime[0]);
        dt.setMinutes(tempTime[1]);
        dt.setSeconds(tempTime[2]);
        return dt;
    }


    useEffect(() => {
        const interval = setInterval(() => {
            Axios.get(`/registros?page=0&limit=20`).then(async (resp) => {
                console.log(resp.data);
                const dados = resp.data.data[0];


                let tensoes = [];
                let horas = [];
                let correntes = [];
                let potencias = [];

                await resp.data.data.map((item) => {
                    tensoes.push(item.tensao);
                    correntes.push(item.corrente);
                    potencias.push(item.potencia);
                    horas.push(toDateWithOutTimeZone(item.hora_registro));

                })
                setHist({
                    tensoes: tensoes,
                    correntes: correntes,
                    potencias: potencias,
                    y: horas,
                })
                setTensao(dados.tensao);
                setCorrente(dados.corrente);
                setPotencia(dados.potencia);

            })
        }, 1000);
        const dia = new Date().toLocaleDateString('en-CA', {
            timeZone: "America/Sao_Paulo",
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });

          Axios.get(`/registros/estatisticas?data=${dia}`).then(async (resp) => {
            console.log(resp.data);
            setStats(resp.data);

        })

        // const intervalStats = setInterval(() => {
            
        // }, 10000);
        

        return () => {
            clearInterval(interval);
            // clearInterval(intervalStats);
        }
    }, [])

    return (
        <div>


            <div className="flex lg:flex-row flex-col">

                <div className='lg:w-1/3 w-full'>

                <Stats title={"Tensão"} menor={stats.menor_tensao+"v"} maior={stats.maior_tensao+"v"} horario_menor={stats.horario_menor_tensao} horario_maior={stats.horario_maior_tensao}/>

                    <GaugeComponent
                        type="semicircle"
                        className='col-span-4'
                        arc={{
                            width: 0.2,
                            padding: 0.005,
                            cornerRadius: 1,

                            subArcs: [
                                {
                                    limit: 201,
                                    color: '#EA4228',
                                    showTick: true,
                                    tooltip: {
                                        text: 'Voltagem muito baixa!'
                                    }
                                },
                                {
                                    limit: 215,
                                    color: '#F5CD19',
                                    showTick: true,
                                    tooltip: {
                                        text: 'Voltagem baixa!'
                                    }
                                },
                                {
                                    limit: 227,
                                    color: '#5BE12C',
                                    showTick: true,
                                    tooltip: {
                                        text: 'Voltagem Ideal!'
                                    }
                                },
                                // {
                                //     limit: 235,
                                //     color: '#F5CD19',
                                //     showTick: true,
                                //     tooltip: {
                                //         text: 'Voltagem alta!'
                                //     }
                                // },
                                {
                                    color: '#EA4228',
                                    tooltip: {
                                        text: 'Voltagem muito alta!'
                                    }
                                }
                            ]
                        }}
                        pointer={{
                            color: '#345243',
                            length: 0.80,
                            width: 15,
                        }}
                        labels={{
                            valueLabel: { formatTextValue: value => value + 'v' },
                            tickLabels: {
                                type: 'outer',
                                defaultTickValueConfig: {
                                    formatTextValue: (value) => value + 'v',
                                    style: { fontSize: 10 }
                                },
                            }
                        }}
                        value={tensao}
                        minValue={150}
                        maxValue={260}
                    />


                    {hist ? (

                        <div className='col-span-4 text-white w-full h-96'>
                            <LineChart

                                xAxis={[{ data: hist?.y, valueFormatter: (value) => new Date(value).toLocaleTimeString("pt-BR"), }]}
                                series={[
                                    {
                                        curve: "linear",
                                        data: hist?.tensoes,
                                    },
                                ]}

                                yAxis={[{ valueFormatter: (value) => value + "v" }]}

                                skipAnimation={true}
                                title='Tensão'
                                colors={["white"]}
                                sx={{
                                    //change left yAxis label styles
                                    "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                                        strokeWidth: "0.4",
                                        fill: "white"
                                    },
                                    "& .MuiChartsAxis-left .MuiChartsAxis-tick": {
                                        stroke: "gray",
                                    },

                                    // leftAxis Line Styles
                                    "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                                        stroke: "gray",
                                        strokeWidth: 0.4
                                    },

                                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tick": {
                                        stroke: "gray",
                                    },
                                    // change all labels fontFamily shown on both xAxis and yAxis
                                    "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                                        fontFamily: "Roboto",
                                    },
                                    // change bottom label styles
                                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                                        strokeWidth: "0.5",
                                        fill: "white"
                                    },
                                    // bottomAxis Line Styles
                                    "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                                        stroke: "gray",
                                        strokeWidth: 0.4
                                    },
                                    "& .MuiMarkElement-root":{
                                        fill:'gray'
                                    }
                                    
                                }}

                            />
                        </div>

                    ) : null}


                </div>


                <div className='lg:w-1/3 w-full'>


                    <Stats title={"Corrente"} menor={stats.menor_corrente+"a"} maior={stats.maior_corrente+"a"} horario_menor={stats.horario_menor_corrente} horario_maior={stats.horario_maior_corrente}/>


                    <GaugeComponent
                        type="semicircle"
                        className='col-span-4'
                        arc={{
                            width: 0.2,
                            padding: 0.005,
                            cornerRadius: 1,

                            subArcs: [
                                {
                                    limit: 10,
                                    color: '#5BE12C',
                                    showTick: true,
                                    tooltip: {
                                        text: 'Corrente Baixa!'
                                    }
                                },
                                {
                                    limit: 20,
                                    color: '#F5CD19',
                                    showTick: true,
                                    tooltip: {
                                        text: 'Corrente Alta!'
                                    }
                                },
                                {
                                    color: '#EA4228',
                                    tooltip: {
                                        text: 'Corrente Muito Alta!'
                                    }
                                }
                            ]
                        }}
                        pointer={{
                            color: '#345243',
                            length: 0.80,
                            width: 15,
                        }}
                        labels={{
                            valueLabel: { formatTextValue: value => value + 'a' },
                            tickLabels: {
                                type: 'outer',
                                defaultTickValueConfig: {
                                    formatTextValue: (value) => value + 'a',
                                    style: { fontSize: 10 }
                                },
                            }
                        }}
                        value={corrente}
                        minValue={0}
                        maxValue={40}
                    />


                    {hist ? (

                        <div className='col-span-4 text-white w-full h-96'>

                            <LineChart

                                xAxis={[{ data: hist?.y, valueFormatter: (value) => new Date(value).toLocaleTimeString("pt-BR"), }]}
                                series={[
                                    {
                                        curve: "linear",
                                        data: hist?.correntes,
                                    },
                                ]}

                                yAxis={[{ valueFormatter: (value) => value + "a" }]}

                                skipAnimation={true}
                                title='Corrente'
                                colors={["white"]}

                                sx={{
                                    "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                                        strokeWidth: "0.4",
                                        fill: "white"
                                    },
                                    "& .MuiChartsAxis-left .MuiChartsAxis-tick": {
                                        stroke: "gray",
                                    },

                                    // leftAxis Line Styles
                                    "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                                        stroke: "gray",
                                        strokeWidth: 0.4
                                    },

                                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tick": {
                                        stroke: "gray",
                                    },
                                    // change all labels fontFamily shown on both xAxis and yAxis
                                    "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                                        fontFamily: "Roboto",
                                    },
                                    // change bottom label styles
                                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                                        strokeWidth: "0.5",
                                        fill: "white"
                                    },
                                    // bottomAxis Line Styles
                                    "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                                        stroke: "gray",
                                        strokeWidth: 0.4
                                    },
                                    "& .MuiMarkElement-root":{
                                        fill:'gray'
                                    }
                                }}
                            />

                        </div>

                    ) : null}

                </div>


                <div className='lg:w-1/3 w-full'>

                <Stats title={"Potência"} menor={stats.menor_potencia+"w"} maior={stats.maior_potencia+"w"} horario_menor={stats.horario_menor_potencia} horario_maior={stats.horario_maior_potencia}/>

                    <GaugeComponent
                        type="semicircle"
                        className='col-span-4'
                        arc={{
                            width: 0.2,
                            padding: 0.005,
                            cornerRadius: 1,

                            subArcs: [
                                {
                                    limit: 2200,
                                    color: '#5BE12C',
                                    showTick: true,
                                    tooltip: {
                                        text: 'Potência baixa!'
                                    }
                                },
                                {
                                    limit: 4400,
                                    color: '#F5CD19',
                                    showTick: true,
                                    tooltip: {
                                        text: 'Potência Média!'
                                    }
                                },
                                {
                                    color: '#EA4228',
                                    tooltip: {
                                        text: 'Potência Alta!'
                                    }
                                }
                            ]
                        }}
                        pointer={{
                            color: '#345243',
                            length: 0.80,
                            width: 15,
                        }}
                        labels={{
                            valueLabel: { formatTextValue: value => value + 'w' },
                            tickLabels: {
                                type: 'outer',
                                defaultTickValueConfig: {
                                    formatTextValue: (value) => value + 'w',
                                    style: { fontSize: 10 }
                                },
                            }
                        }}
                        value={potencia}
                        minValue={0}
                        maxValue={8800}
                    />


                    {hist ? (

                        <div className='col-span-4 text-white w-full h-96'>
                            <LineChart

                                xAxis={[{ data: hist?.y, valueFormatter: (value) => new Date(value).toLocaleTimeString("pt-BR"), }]}
                                series={[
                                    {
                                        curve: "linear",
                                        data: hist?.potencias,
                                    },
                                ]}

                                yAxis={[{ valueFormatter: (value) => value + "w" }]}

                                skipAnimation={true}
                                title='Potência'
                                colors={["white"]}

                                sx={{
                                   "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                                        strokeWidth: "0.4",
                                        fill: "white"
                                    },
                                    "& .MuiChartsAxis-left .MuiChartsAxis-tick": {
                                        stroke: "gray",
                                    },

                                    // leftAxis Line Styles
                                    "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                                        stroke: "gray",
                                        strokeWidth: 0.4
                                    },

                                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tick": {
                                        stroke: "gray",
                                    },
                                    // change all labels fontFamily shown on both xAxis and yAxis
                                    "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                                        fontFamily: "Roboto",
                                    },
                                    // change bottom label styles
                                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                                        strokeWidth: "0.5",
                                        fill: "white"
                                    },
                                    // bottomAxis Line Styles
                                    "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                                        stroke: "gray",
                                        strokeWidth: 0.4
                                    },
                                    "& .MuiMarkElement-root":{
                                        fill:'gray'
                                    }
                                }}
                            />
                        </div>

                    ) : null}


                </div>

            </div>

        </div>
    );
}

export default Dashboard;