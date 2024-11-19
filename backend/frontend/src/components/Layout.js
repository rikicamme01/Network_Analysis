import React from "react";
import PropTypes from 'prop-types';
import "../../static/css/layout.css"


export default function Layout(props, { children }) {

    return (
        <div className="layout">
            <div className="column spalla-sx">
                <img className="img-Dialogica-logo" src="../../static/img/layout/Dialogica_Logo_Lab.png" />
            </div>
            <div className="column main">
                <div className="main-title">
                    <h1 className="title"> {props.title}</h1>
                </div>

                <div className="children"></div>
            </div>
            <div className="column spalla-dx">
                <div>

                </div>

                <img className="img-NCI" src="../../static/img/layout/Logo_NCI.png" />
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