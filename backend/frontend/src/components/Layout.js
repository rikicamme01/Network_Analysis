import React from "react";
import PropTypes from 'prop-types';
import "../../static/css/layout.css"


export default function Layout(props, { children1, children2 }) {

    return (
        <div className="layout">
            <div className="spalla-sx">
                <img className="img-Dialogica-logo" alt="Logo Dialogica Lab" src="../../static/img/layout/Dialogica_Logo_Lab.png" />
                <div className="children">{children1}<h1>Children1</h1></div>
            </div>
            <div className="main">
                <div className="div-title">
                    <h1 className="title"> {props.title}</h1>
                </div>

                <div className="children">
                    {children2}
                    <h1 >Children2</h1>
                </div>
            </div>
            <div className="spalla-dx">
                <div>
                    <h2 >Button</h2>
                </div>
                <img className="img-NCI" alt="Logo NCI" src="../../static/img/layout/Logo_NCI.png" />
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