import React, { useEffect } from 'react';
import axios from '../Service/Axios';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


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


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [data, setData] = React.useState([]);


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


    function bucarDados(pagina, limit){
        if(pagina == undefined) pagina = page;
        if(limit == undefined) limit = rowsPerPage;

        axios.get(`/registros?page=${pagina+1}&limit=${limit}`).then((resp) => {
            console.log(resp.data);
            setData(resp.data);
        })
    }


    return (
        <div className='flex items-center flex-col'>
            <h2 className='my-10 text-4xl'>
                Histórico
            </h2>

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