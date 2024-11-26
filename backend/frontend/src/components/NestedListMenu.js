import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import BarChartIcon from "@mui/icons-material/BarChart";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function NestedList({ handleListItemClick, selectedIndex }) {
    const [open, setOpen] = React.useState(false);

    const handleExpand = () => {
        setOpen(!open);
    };

    const menuItems = [
        {
            id: 1,
            text: "Analisi questionari",
            icon: <QueryStatsIcon />,
        },
        {
            id: 2,
            text: "Dashboard grafici",
            icon: <BarChartIcon />,
            isExpandable: true,
        },
        {
            id: 3,
            text: "Costruisci report",
            icon: <EditNoteIcon />,
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
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{
                        bgcolor: "#F6F6F6",
                    }}
                >
                    Nested List Items
                </ListSubheader>
            }
        >
            {menuItems.map((item) => {
                if (item.isExpandable) {
                    return (
                        <React.Fragment key={item.id}>
                            <ListItemButton
                                selected={selectedIndex === item.id}
                                onClick={handleExpand}
                                sx={listItemStyles}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
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
                                            sx={{
                                                ...listItemStyles,
                                                pl: 4,
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
                        sx={listItemStyles}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
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
