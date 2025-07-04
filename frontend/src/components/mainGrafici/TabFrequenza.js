import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../../static/css/TabStatus.css'
import { green } from '@mui/material/colors';

export default function TabStatus({ headers, rows }) {
    return (
        <div className='frame'>

            <TableContainer
                component={Paper}
                sx={{
                    width: 'auto',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'stretch',
                    borderRadius: '8px',
                    border: '1px solid #797979'
                }}
            >
                <Table
                    size="small"
                    aria-label="a dense table"
                    sx={{
                        minWidth: 400,
                        backgroundColor: '#CCCCCC',
                        '& td': {
                            borderBottom: 'none', // Linee divisorie tra le righe
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: "17px",
                        },
                        '& th': {
                            borderBottom: 'none', // Linee divisorie tra le righe
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: "17px",
                        },
                    }} >
                    <TableHead>
                        <TableRow sx={{
                            backgroundColor: '#797979',
                            '& th': {
                                fontWeight: 'bold', // Intestazione in grassetto
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '17px',
                                borderBottom: '2px solid #000', // Linea divisoria dell'intestazione
                            },
                        }}>
                            {headers.map((header, index) => (
                                <TableCell key={index} align={header.align || 'left'}>
                                    {header.label}
                                </TableCell>
                            ))}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                sx={{
                                    backgroundColor: rowIndex % 2 === 0 ? '#CCCCCC' : '#F6F6F6', // Alternanza del colore
                                }}
                            >
                                {headers.map((header, colIndex) => (
                                    <TableCell key={colIndex} align={header.align || 'left'}>
                                        {/* Aggiungi il simbolo % se la colonna è "frequenza" */}
                                        {header.key === 'frequenza' ? `${row[header.key]}%` : row[header.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}
