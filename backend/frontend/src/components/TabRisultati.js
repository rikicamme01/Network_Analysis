import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TabRisultati(props) {
    return (
        <div className='frame'>

            <TableContainer
                component={Paper}
                sx={{
                    display: 'flex',
                    justifyContent: 'stretch',

                }}
            >
                <Table
                    size="small"
                    aria- label="a dense table"
                    sx={{
                        minWidth: 100,
                        backgroundColor: '#22509c' || props.backgroundColor,
                        '& td, & th': {
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '15px',
                            borderBottom: 'none', // Linea divisoria dell'intestazione
                            color: 'white', // Colore del testo delle intestazioni
                        },

                    }} >

                    <TableBody>
                        {props.rows.map((row, index) => (
                            <TableRow
                                key={row.role}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell component="th" scope="row">{row.type}</TableCell>
                                <TableCell align="center">{row.numbers}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >

        </div >
    );
}