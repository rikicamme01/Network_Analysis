import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../static/css/tabRisposte.css'

function createData(role, answer, respondents, perc,) {
    return { role, answer, respondents, perc };
}

const rows = [
    createData('Decisori', 1, 20, 5.0),
    createData('Gestionali', 3, 10, 30.0),
    createData('Operativi', 5, 30, 16.6),
    createData('TOT', 9, 60, 15),
];

export default function TabellaRisposte({time}) {
    return (
        <div className='frame'>
            <p className='title-tab'>Status somministrazione: {time} giorni</p>

            <TableContainer
                component={Paper}
                sx={{
                    width: '450px',
                    height: '200px',
                    display: 'flex',
                    justifyContent: 'stretch',

                }}
            >
                <Table
                    size="small"
                    aria- label="a dense table"
                    sx={{
                        minWidth: 400,
                        backgroundColor: '#CCCCCC',
                        '& td': {
                            borderBottom: 'none', // Linee divisorie tra le righe
                        },

                    }} >
                    <TableHead>
                        <TableRow sx={{
                            backgroundColor: '#797979',
                            '& th': {
                                fontWeight: 'bold', // Intestazione in grassetto
                                borderBottom: '2px solid #000', // Linea divisoria dell'intestazione
                            },
                        }}>
                            <TableCell>Ruoli</TableCell>
                            <TableCell align="center">Risposte</TableCell>
                            <TableCell align="center">Rispondenti</TableCell>
                            <TableCell align="center">%</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.role}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '& th': {
                                        fontWeight: index === rows.length - 1
                                            ? 'bold'
                                            : '',
                                        borderBottom: 'none', // Linea divisoria dell'intestazione
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.role}
                                </TableCell>
                                <TableCell align="center">{row.answer}</TableCell>
                                <TableCell align="center">{row.respondents}</TableCell>
                                <TableCell align="center">{row.perc}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >

        </div >
    );
}
