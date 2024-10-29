import React, { useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component';
import Axios from '../Service/Axios';
import Chart from 'react-apexcharts'

function Dashboard(props) {


    const [tensao, setTensao] = useState();
    const [corrente, setCorrente] = useState();

    const [histCorrente, setHistCorrente] = useState();
    useEffect(() => {
        const interval = setInterval(() => {
            Axios.get(`/registros?page=0&limit=10`).then((resp) => {
                console.log(resp.data);
                const dados = resp.data.data[0];
                setTensao(dados.tensao);
                setCorrente(dados.corrente);
            })
        }, 2000);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className='grid grid-cols-12 gap-3'>


            <GaugeComponent
                type="semicircle"
                className='col-span-4'
                arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,

                    subArcs: [
                        {
                            limit: 205,
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
                            limit: 225,
                            color: '#5BE12C',
                            showTick: true,
                            tooltip: {
                                text: 'Voltagem Ideal!'
                            }
                        },
                        {
                            limit: 235,
                            color: '#F5CD19',
                            showTick: true,
                            tooltip: {
                                text: 'Voltagem alta!'
                            }
                        },
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
                minValue={0}
                maxValue={260}
            />





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


            <Chart series={[44, 17, 15]} type="line" height={350} />
        </div>
    );
}

export default Dashboard;