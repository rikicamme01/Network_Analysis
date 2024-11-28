import React from "react";
import PropTypes from 'prop-types';
import { Button } from "@mui/material";
import "../../static/css/layout.css"


export default function Layout({ spallasx, main, title }) {

    return (
        <div className="layout">
            <div className="spalla-sx">
                <img className="img-Dialogica-logo" alt="Logo Dialogica Lab" src="../../static/img/layout/Dialogica_Logo_Lab.png" />
                <div className="children child1">{spallasx}</div>
            </div>
            <div className="main">
                <div className="div-title">
                    <h1 className="title"> {title}</h1>
                </div>

                <div className="children child2">
                    {main}
                </div>
            </div>
            <div className="spalla-dx">
                <div className="logout">
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#A9C4EB',
                            color: 'black',
                        }}

                    >Logout
                    </Button>
                </div>
                <div className="div-NCI">
                    <img className="img-NCI" alt="Logo NCI" src="../../static/img/layout/Logo_NCI.png" />
                </div>
            </div>

        </div >
    );
}

Layout.propTypes = {
    spallasx: PropTypes.node,
    main: PropTypes.node,
    title: PropTypes.string,
};

Layout.defaultProps = {
    className: '',
    title: 'Title',
    spallasx: '',
};