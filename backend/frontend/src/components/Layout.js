import React from "react";
import PropTypes from 'prop-types';
import { Button } from "@mui/material";
import "../../static/css/layout.css"


export default function Layout(props, { children1, children2 }) {

    return (
        <div className="layout">
            <div className="spalla-sx">
                <img className="img-Dialogica-logo" alt="Logo Dialogica Lab" src="../../static/img/layout/Dialogica_Logo_Lab.png" />
                <div className="children">{children1}</div>
            </div>
            <div className="main">
                <div className="div-title">
                    <h1 className="title"> {props.title}</h1>
                </div>

                <div className="children">
                    {children2}
                </div>
            </div>
            <div className="spalla-dx">
                <div className="logout">
                    <Button>Button</Button>
                </div>
                <div className="div-NCI">
                    <img className="img-NCI" alt="Logo NCI" src="../../static/img/layout/Logo_NCI.png" />
                </div>
            </div>

        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Layout.defaultProps = {
    className: '',
};