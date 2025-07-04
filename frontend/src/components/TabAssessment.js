import React, { useEffect, useState } from 'react';
import { Box, Tooltip } from '@mui/material';
import { DataGrid, GridToolbar, itIT, esES, DateTimeFormatter } from '@mui/x-data-grid';
import { red } from '@mui/material/colors';
import AxiosInstance from '../Axios'


// Colonne della tabella
const columns = [
    { field: 'id', headerName: 'Index', width: 80, headerClassName: 'custom-header' },
    { field: 'assessmentName', headerName: 'Nome Assessment', width: 280, headerClassName: 'custom-header' },
    { field: 'enteName', headerName: 'Nome Rete', flex: 1, headerClassName: 'custom-header', },
    {
        field: 'startTime',
        headerName: 'Data',
        width: 120,
        type: 'date',
        headerClassName: 'custom-header',
        valueFormatter: params => {
            if (!params.value) {
                return null; // Handle empty date values gracefully
            }
            const date = new Date(params.value);
            // Use a DateTimeFormatter for customizable formatting
            //const formatter = new DateTimeFormatter(esES); // Adjust locale (optional)
            return date;
        }
    },

    { field: 'statusIndagine', headerName: 'Status', width: 220, headerClassName: 'custom-header', },
];

export default function TabAssessment({ handleSelection }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function fetchAssessments() {
            try {
                const res = await AxiosInstance.get('/api/get_all_assessments/');
                const data = res.data.map((item, index) => ({
                    ...item,
                    id: index + 1,
                    startTime: item.startTime ? new Date(item.startTime).toLocaleDateString('it-IT') : null,  // Formatta la data direttamente
                }));
                setRows(data);  // Assumendo che 'rows' sia uno stato
            } catch (error) {
                console.error("Errore nel fetch assessments", error);
            }
        }

        fetchAssessments();
    }, []);

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
