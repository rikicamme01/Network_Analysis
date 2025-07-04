import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useOutput } from "./Context";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EditNoteIcon from "@mui/icons-material/EditNote";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";


export default function NestedList({ handleListItemClick, selectedIndex }) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const { output } = useOutput();

    const handleExpand = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const menuItems = [
        {
            id: 1,
            text: "Analisi questionari",
            icon: <QueryStatsIcon />,
            isDisabled: false,
        },
        {
            id: 2,
            text: "Dashboard grafici",
            icon: <BarChartIcon />,
            isExpandable: true,
            isDisabled: !output, //!output
        },
        {
            id: 3,
            text: "Costruisci report",
            icon: <EditNoteIcon />,
            isDisabled: !output,
        },
    ];

    const subMenuItems = [
        { id: 21, text: "Distribuzione RD" },
        { id: 22, text: "Distribuzione Ads" },
        { id: 23, text: "Legami RD" },
        { id: 24, text: "Peso e Momento dialogico" },
        { id: 25, text: "Indice di Coesione" },
    ];

    const listItemStyles = {
        "&:hover": {
            bgcolor: !output ? "inherit" : "#A9C4EB",
        },
        "&.Mui-selected": {
            bgcolor: !output ? "inherit" : "#A9C4EB",
        },
        "&.Mui-selected:hover": {
            bgcolor: !output ? "inherit" : "#A9C4EB",
        },
    };

    const firstOptionStyle = {
        "&:hover": {
            bgcolor: "#A9C4EB",
        },
        "&.Mui-selected": {
            bgcolor: "#A9C4EB",
        },
        "&.Mui-selected:hover": {
            bgcolor: "#A9C4EB",
        },
    };

    return (
        <List
            sx={{
                width: "100%",
                maxWidth: 600,
                bgcolor: "#F6F6F6",
                width: 250,
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#F6F6F6", // Colore di sfondo
                        borderRadius: "8px", // Angoli arrotondati
                        padding: "8px",
                        height: "40px", // Larghezza specifica
                        fontFamily: "'Roboto', sans-serif", // Font personalizzato
                        fontSize: "14px", // Dimensione del testo
                        cursor: "pointer", // Mostra che è cliccabile
                        transition: "background-color 0.3s ease", // Transizione per l'hover
                        "&:hover": {
                            //bgcolor: "#A9C4EB", // Colore di sfondo quando passi sopra
                            color: "#22509c", // Colore del testo quando passi sopra
                            fontWeight: "bold", // Grassetto
                            //textDecoration: 'underline',
                        },
                    }}
                    onClick={() => {
                        navigate("/databaseAss");
                        console.log("Tornando alla schermata precedente");
                        
                    }}
                >
                    <ArrowBackRoundedIcon sx={{
                        marginRight: "8px", fontSize: "large",
                    }} />
                    <span>Indietro</span>
                </ListSubheader>


            }
        >
            {menuItems.map((item) => {
                if (item.isExpandable) {
                    return (
                        <React.Fragment key={item.id}>
                            <ListItemButton
                                selected={selectedIndex === item.id}
                                onClick={() => { if (!item.isDisabled) handleExpand(); }}
                                disabled={item.isDisabled}
                                sx={listItemStyles}
                            >
                                <ListItemIcon sx={{
                                    minWidth: "35px", // Larghezza minima tra l'icona e il testo
                                }}>{item.icon}</ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        fontFamily: "'Roboto', sans-serif",
                                    }}
                                />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {subMenuItems.map((subItem) => (
                                        <ListItemButton
                                            key={subItem.id}
                                            selected={selectedIndex === subItem.id}
                                            onClick={() => handleListItemClick(subItem.id)}
                                            disabled={!output}
                                            sx={{
                                                ...listItemStyles,
                                                pl: 8,
                                            }}
                                        >
                                            <ListItemText primary={subItem.text} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    );
                }
                return (
                    <ListItemButton
                        key={item.id}
                        selected={selectedIndex === item.id}
                        onClick={() => handleListItemClick(item.id)}
                        disabled={item.isDisabled}
                        sx={(item.id === 3) ? listItemStyles : firstOptionStyle}
                    >
                        <ListItemIcon sx={{
                            minWidth: "35px", // Larghezza minima tra l'icona e il testo
                        }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.text}
                            sx={{
                                fontFamily: "'Roboto', sans-serif",
                            }}
                        />
                    </ListItemButton>
                );
            })}
        </List>
    );
}
