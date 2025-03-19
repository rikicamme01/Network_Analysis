import * as React from 'react';
import { Box, Tooltip } from '@mui/material';
import { DataGrid, GridToolbar, itIT, esES, DateTimeFormatter } from '@mui/x-data-grid';
import { red } from '@mui/material/colors';

// Dati inventati
const rows = [
    { id: 1, assessmentName: 'Assessment X', networkName: 'Rete per le politiche giovanili dell’ambito sociale territoriale X', date: '2024-01-01', status: 'Da analizzare' },
    { id: 2, assessmentName: 'Assessment B', networkName: 'Network 2', date: '2024-01-02', status: 'Controllo denominazione' },
    { id: 3, assessmentName: 'Assessment C', networkName: 'Network 3', date: '2024-02-03', status: 'Creazione Report' },
    { id: 4, assessmentName: 'Assessment D', networkName: 'Network 4', date: '2024-02-04', status: 'Completato' },
    { id: 5, assessmentName: 'Assessment E', networkName: 'Network 5', date: '2024-03-05', status: 'Da analizzare' },
    { id: 6, assessmentName: 'Assessment F', networkName: 'Network 6', date: '2024-03-06', status: 'Controllo denominazione' },
    { id: 7, assessmentName: 'Assessment G', networkName: 'Network 7', date: '2024-04-07', status: 'Creazione Report' },
    { id: 8, assessmentName: 'Assessment H', networkName: 'Network 8', date: '2024-04-08', status: 'Completato' },
    { id: 9, assessmentName: 'Assessment I', networkName: 'Network 9', date: '2024-05-09', status: 'Da analizzare' },
    { id: 10, assessmentName: 'Assessment L', networkName: 'Network 10', date: '2024-05-10', status: 'Controllo denominazione' },
    { id: 11, assessmentName: 'Assessment M', networkName: 'Network 11', date: '2024-06-11', status: 'Creazione Report' },
    { id: 12, assessmentName: 'Assessment N', networkName: 'Network 12', date: '2024-06-12', status: 'Completato' },
    { id: 13, assessmentName: 'Assessment O', networkName: 'Network 13', date: '2024-07-13', status: 'Da analizzare' },
    { id: 14, assessmentName: 'Assessment P', networkName: 'Network 14', date: '2024-07-14', status: 'Controllo denominazione' },
    { id: 15, assessmentName: 'Assessment Q', networkName: 'Network 15', date: '2024-08-15', status: 'Creazione Report' },
    { id: 16, assessmentName: 'Assessment R', networkName: 'Network 16', date: '2024-08-16', status: 'Completato' },
    { id: 17, assessmentName: 'Assessment S', networkName: 'Network 17', date: '2024-09-17', status: 'Da analizzare' },
    { id: 18, assessmentName: 'Assessment T', networkName: 'Network 18', date: '2024-09-18', status: 'Controllo denominazione' },
    { id: 19, assessmentName: 'Assessment U', networkName: 'Network 19', date: '2024-10-22', status: 'Creazione Report' },
    { id: 20, assessmentName: 'Assessment V', networkName: 'Network 20', date: '2024-11-24', status: 'Completato' },
    { id: 21, assessmentName: 'Assessment Z', networkName: 'Network 21', date: '2024-12-25', status: 'Da analizzare' },
    
];

// Colonne della tabella
const columns = [
    { field: 'id', headerName: 'Index', width: 80, headerClassName: 'custom-header' },
    { field: 'assessmentName', headerName: 'Nome Assessment', width: 280, headerClassName: 'custom-header' },
    { field: 'networkName', headerName: 'Nome Rete', flex:1, headerClassName: 'custom-header', },
    {
        field: 'date',
        headerName: 'Data',
        width: 120,
        type: 'date',
        headerClassName: 'custom-header',
        valueFormatter: (params) => {
            if (!params.value) {
                return null; // Handle empty date values gracefully
            }
            const date = new Date(params.value);
            // Use a DateTimeFormatter for customizable formatting
            //const formatter = new DateTimeFormatter(esES); // Adjust locale (optional)
            return date //formatter.format(date, 'dd/MM/yyyy'); // Customize format as needed
        },
    },
    { field: 'status', headerName: 'Status', width: 220, headerClassName: 'custom-header', },
];

export default function TabAssessment({ handleSelection }) {

    return (
        <Box sx={{ height: 610, width: 1000 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                onRowDoubleClick={handleSelection}
                //sortingOrder={['asc', 'desc']}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                disableSelectionOnClick={true}
                disableColumnMenu
                disableColumnResize
                hideFooterSelectedRowCount
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
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    },
                    '& .custom-header': {
                        fontWeight: 'bold',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '18px',
                        backgroundColor: '#22509c',
                        color: '#F6F6F6',
                    },
                    // Stile per le righe
                    '& .MuiDataGrid-row': {
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '17px',
                        //backgroundColor: '#22509c'
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#22509C',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#A9C4EB', // Colore di sfondo al passaggio del mouse
                    },
                    '& .MuiDataGrid-row.Mui-selected:hover': {
                        backgroundColor: '#A9C4EB', // Colore di sfondo della riga selezionata durante l'hover
                    },
                    '& .MuiDataGrid-cell.Mui-selected': {
                        outline: '#dc143c', // Rimuove il bordo della cella selezionata
                    },
                    '& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon': {
                        color: '#F6F6F6', // Cambia il colore delle frecce
                    },
                }}
            />
        </Box>
    );
}
