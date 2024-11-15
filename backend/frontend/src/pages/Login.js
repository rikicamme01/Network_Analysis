import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CustomButton from "../components/CustomButton";
import "../../static/css/login.css";

export default function Login() {

    const handleClick = () => {
        pass;
    };


    return (
        <div className="login">
            <img
                className="dialogica-logo-lab"
                alt="Group"
                src="../../static/img/Login/Dialogica Logo_Lab.png"
            />
            <div className="semi-circle">
                <img
                    className="net-cohesion-index"
                    src="../../static/img/Login/Group_Net_Cohesion_Index.png"
                />

                {/* Campo Username con icona */}
                <TextField
                    className="username-text-field"
                    label="Email-ID"
                    variant="outlined" // Cambia con "filled" o "standard" se preferisci
                    fullWidth
                    sx={{
                        width: '300px', // Larghezza sufficiente per visualizzare l'icona e il testo
                        fontSize: '20px', // Corretto il font-size
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon
                                        sx={{ fontSize: 40 }} // Dimensione dell'icona
                                    />
                                </InputAdornment>
                            ),
                        }
                    }}
                />

                {/* Campo Password con icona */}
                <TextField
                    className="password-text-field"
                    label="Password"
                    variant="outlined" // Cambia con "filled" o "standard" se preferisci
                    fullWidth
                    sx={{
                        width: '300px', // Larghezza sufficiente per visualizzare l'icona e il testo
                        fontSize: '20px', // Corretto il font-size
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyIcon
                                        sx={{ fontSize: 40 }} // Dimensione dell'icona
                                    />
                                </InputAdornment>
                            ),
                        }
                    }}
                />
                <div className="button">
                    <Link to='/newAss'>
                        <CustomButton
                            text='Login'
                            width = '300px'
                            onClick={handleClick} />
                    </Link>
                </div>
                <div className="con-il-supporto-di">Con il supporto di</div>


            </div>
        </div>
    );
}
