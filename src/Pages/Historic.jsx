import React, { useEffect, useState } from 'react';
import axios from '../Service/Axios';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { DatePicker, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Button, IconButton, Typography } from '@mui/material';
import { Download, Search } from '@mui/icons-material';


const columns = [
    {
        id: 'data',
        label: 'Data',
        //minWidth: 170
    },

    {
        id: 'hora',
        label: 'Hora',
        //minWidth: 100
    },
    {
        id: 'tensao',
        label: 'Tensão (V)',
        //minWidth: 170,
        align: 'right',
    },
    {
        id: 'corrente',
        label: 'Corrente (A)',
        //minWidth: 170,
        align: 'right',
    },
    {
        id: 'potencia',
        label: 'Potência (W)',
        //minWidth: 170,
        align: 'right',
    },
    {
        id: 'energia',
        label: 'Energia (kWh)',
        //minWidth: 170,
        align: 'right',
    },
    {
        id: 'frequencia',
        label: 'Frequência (Hz)',
        //minWidth: 170,
        align: 'right',
    },
    {
        id: 'pf',
        label: 'PF',
        //minWidth: 170,
        align: 'right',
    },
];

function createData(
    name,
    code,
    population,
    size,
) {
    const density = population / size;
    return { name, code, population, size, density };
}



function Historic(props) {


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [data, setData] = useState([]);

    const [pesquisado, setPesquisado] = useState(false);

    const [dataInicio, setDataInicio] = useState(dayjs());
    const [dataFim, setDataFim] = useState(dayjs());

    const [horaInicio, setHoraInicio] = useState(dayjs());
    const [horaFim, setHoraFim] = useState(dayjs());

    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {


        bucarDados();

    }, [page, rowsPerPage])


    function bucarDados(pagina, limit) {
        if (pagina == undefined) pagina = page;
        if (limit == undefined) limit = rowsPerPage;

        axios.get(`/registros?page=${pagina + 1}&limit=${limit}`).then((resp) => {
            console.log(resp.data);
            setData(resp.data);
        })
    }

    function Pesquisar(pagina, limit) {
        if (pagina == undefined) pagina = page;
        if (limit == undefined) limit = rowsPerPage;
        axios.get(`/registros?page=${pagina + 1}&limit=${limit}&data_inicio=${dayjs(dataInicio).format("YYYY-MM-DD")}&data_fim=${dayjs(dataFim).format("YYYY-MM-DD")}&hora_inicio=${dayjs(horaInicio).format("HH:mm:ss")}&hora_fim=${dayjs(horaFim).format("HH:mm:ss")}`).then((resp) => {
            console.log(resp.data);
            setData(resp.data);
            setPesquisado(true);
        })


    }


    function Baixar() {

        axios.get(`/registros/exportar-csv?data_inicio=${dayjs(dataInicio).format("YYYY-MM-DD")}&data_fim=${dayjs(dataFim).format("YYYY-MM-DD")}&hora_inicio=${dayjs(horaInicio).format("HH:mm:ss")}&hora_fim=${dayjs(horaFim).format("HH:mm:ss")}`).then((resp) => {
            console.log(resp.data.link);
            window.location = 'https://metlab.rexlab.ufsc.br/eletrica'+resp.data.link;
        })


    }


    return (
        <div className='flex items-center flex-col'>
            <h2 className='my-10 text-4xl'>
                Histórico
            </h2>


            <Paper className='p-4'>
                <Typography className='mb-4'>Filtros</Typography>

                <div className="flex gap-4 mt-4">
                    <DatePicker
                        label="Data Início"
                        value={dataInicio}
                        onChange={(newValue) => setDataInicio(newValue)}
                    />

                    <DatePicker
                        label="Data Fim"
                        value={dataFim}
                        onChange={(newValue) => setDataFim(newValue)}
                    />

                    <MobileTimePicker
                        label="Hora Início"
                        views={['hours', 'minutes', 'seconds']}
                        ampm={false}
                        value={horaInicio}
                        onChange={(newValue) => setHoraInicio(newValue)} />

                    <MobileTimePicker
                        label="Hora Fim"
                        views={['hours', 'minutes', 'seconds']}
                        ampm={false}
                        value={horaFim}
                        onChange={(newValue) => setHoraFim(newValue)} />

                    <Button variant='outlined' color='inherit' onClick={() => Pesquisar()}>

                        <Search />

                        Pesquisar

                    </Button>

                    <Button variant='outlined' color='inherit' disabled={!pesquisado} onClick={() => Baixar()}>

                        <Download />

                        Baixar Relatório

                    </Button>
                </div>


            </Paper>

            <Paper className='m-auto my-10 max-w-lg lg:max-w-full'>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                    //style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data?.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell>
                                            {new Date(row.data_registro).toLocaleDateString("pt-BR")}
                                        </TableCell>

                                        <TableCell align='right'>
                                            {row.hora_registro}
                                        </TableCell>

                                        <TableCell align='right'>
                                            {row.tensao}
                                        </TableCell>

                                        <TableCell align='right'>
                                            {row.corrente}
                                        </TableCell>

                                        <TableCell align='right'>
                                            {row.potencia}
                                        </TableCell>

                                        <TableCell align='right'>
                                            {row.energia}
                                        </TableCell>

                                        <TableCell align='right'>
                                            {row.frequencia}
                                        </TableCell>

                                        <TableCell align='right'>
                                            {row.pf}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.totalRecords}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default Historic;