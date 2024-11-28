import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, itIT } from '@mui/x-data-grid';
import { red } from '@mui/material/colors';

// Dati inventati
const rows = [
    { id: 1, assessmentName: 'Assessment A', networkName: 'Network X', date: '2024-11-25', status: 'Completed' },
    { id: 2, assessmentName: 'Assessment B', networkName: 'Network Y', date: '2024-11-20', status: 'Pending' },
    { id: 3, assessmentName: 'Assessment C', networkName: 'Network Z', date: '2024-11-23', status: 'In Progress' },
    { id: 4, assessmentName: 'Assessment D', networkName: 'Network W', date: '2024-11-18', status: 'Completed' },
    { id: 5, assessmentName: 'Assessment E', networkName: 'Network V', date: '2024-11-22', status: 'Pending' },
    { id: 6, assessmentName: 'Assessment A', networkName: 'Network X', date: '2024-11-25', status: 'Completed' },
    { id: 7, assessmentName: 'Assessment B', networkName: 'Network Y', date: '2024-11-20', status: 'Pending' },
    { id: 8, assessmentName: 'Assessment C', networkName: 'Network Z', date: '2024-11-23', status: 'In Progress' },
    { id: 9, assessmentName: 'Assessment D', networkName: 'Network W', date: '2024-11-18', status: 'Completed' },
    { id: 10, assessmentName: 'Assessment E', networkName: 'Network V', date: '2024-11-22', status: 'Pending' },
    { id: 11, assessmentName: 'Assessment A', networkName: 'Network X', date: '2024-11-25', status: 'Completed' },
    { id: 12, assessmentName: 'Assessment B', networkName: 'Network Y', date: '2024-11-20', status: 'Pending' },
    { id: 13, assessmentName: 'Assessment C', networkName: 'Network Z', date: '2024-11-23', status: 'In Progress' },
    { id: 14, assessmentName: 'Assessment D', networkName: 'Network W', date: '2024-11-18', status: 'Completed' },
    { id: 15, assessmentName: 'Assessment E', networkName: 'Network V', date: '2024-11-22', status: 'Pending' },
    { id: 16, assessmentName: 'Assessment A', networkName: 'Network X', date: '2024-11-25', status: 'Completed' },
    { id: 17, assessmentName: 'Assessment B', networkName: 'Network Y', date: '2024-11-20', status: 'Pending' },
    { id: 18, assessmentName: 'Assessment C', networkName: 'Network Z', date: '2024-11-23', status: 'In Progress' },
    { id: 19, assessmentName: 'Assessment D', networkName: 'Network W', date: '2024-11-18', status: 'Completed' },
    { id: 20, assessmentName: 'Assessment E', networkName: 'Network V', date: '2024-11-22', status: 'Pending' },
    { id: 21, assessmentName: 'Assessment A', networkName: 'Network X', date: '2024-11-25', status: 'Completed' },
    { id: 22, assessmentName: 'Assessment B', networkName: 'Network Y', date: '2024-11-20', status: 'Pending' },
    { id: 23, assessmentName: 'Assessment C', networkName: 'Network Z', date: '2024-11-23', status: 'In Progress' },
    { id: 24, assessmentName: 'Assessment D', networkName: 'Network W', date: '2024-11-18', status: 'Completed' },
    { id: 25, assessmentName: 'Assessment E', networkName: 'Network V', date: '2024-11-22', status: 'Pending' },
    { id: 26, assessmentName: 'Assessment A', networkName: 'Network X', date: '2024-11-25', status: 'Completed' },
    { id: 27, assessmentName: 'Assessment B', networkName: 'Network Y', date: '2024-11-20', status: 'Pending' },
    { id: 28, assessmentName: 'Assessment C', networkName: 'Network Z', date: '2024-11-23', status: 'In Progress' },
    { id: 29, assessmentName: 'Assessment D', networkName: 'Network W', date: '2024-11-18', status: 'Completed' },
    { id: 30, assessmentName: 'Assessment E', networkName: 'Network V', date: '2024-11-22', status: 'Pending' },
];

// Colonne della tabella
const columns = [
    { field: 'id', headerName: 'Index', width: 100 },
    { field: 'assessmentName', headerName: 'Nome Assessment', width: 250 },
    { field: 'networkName', headerName: 'Nome Rete', width: 250 },
    {
        field: 'date',
        headerName: 'Data',
        width: 150,
        type: 'date',
        valueGetter: (params) => params.row?.date ? new Date(params.row.date) : null,
    },
    { field: 'status', headerName: 'Status', width: 200 },
];

export default function TabAssessment({ handleSelection }) {
    return (
        <Box sx={{ height: 600, width: 1000 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={handleSelection()}
                //sortingOrder={['asc', 'desc']}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                disableSelectionOnClick
                disableColumnMenu
                localeText={{
                    toolbarQuickFilterPlaceholder: 'Cerca...', // Modifica del testo del filtro rapido
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                sx={{
                    // Stile per le intestazioni
                    '& .MuiDataGrid-columnHeaders': {
                        fontWeight: 'bold', // Intestazione in grassetto
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '17px',
                        backgroundColor: '#22509c',
                    },
                    // Stile per le righe
                    '& .MuiDataGrid-row': {
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '17px',
                        //backgroundColor: '#22509c'
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#A9C4EB', // Colore di sfondo al passaggio del mouse
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: '#A9C4EB', // Colore di sfondo della riga selezionata
                    },
                    '& .MuiDataGrid-row.Mui-selected:hover': {
                        backgroundColor: '#A9C4EB', // Colore di sfondo della riga selezionata durante l'hover
                    },
                }}
            />
        </Box>
    );
}
