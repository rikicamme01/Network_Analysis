import React from "react";
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "../../static/css/fasiAdmin.css"

export default function FasiAdmin({ status }) {

    const lockIcon = <LockIcon color="#22509C" fontSize='medium' />;
    const doneIcon = <CheckCircleIcon color="#22509C" fontSize='medium' />;

    return (
        <div className='div-parent'>
            <div className="div-survey" style={{
                backgroundColor: status[0] >= 1 ? "#A9C4EB" : "#F6F6F6"
            }}>
                <div className="text-survey">
                    <span className="text">Admin Survey</span>
                </div>
                <div className="icon-survey">
                    {(status[0] === 0) ? (lockIcon) :
                        (status[0] === 1) ? (null) : (doneIcon)
                    }
                </div>
            </div>
            <div className="div-survey" style={{
                backgroundColor: status[1] >= 1 ? "#A9C4EB" : "#F6F6F6"
            }}>
                <div className="text-survey">
                    <span className="text">Questionari</span>
                </div>
                <div className="icon-survey">
                    {(status[1] === 0) ? (lockIcon) :
                        (status[1] === 1) ? (null) : (doneIcon)
                    }
                </div>
            </div>
            <div className="div-survey" style={{
                backgroundColor: status[2] >= 1 ? "#A9C4EB" : "#F6F6F6"
            }}>
                <div className="text-survey">
                    <span className="text">Report</span>
                </div>
                <div className="icon-survey">
                    {(status[2] === 0) ? (lockIcon) :
                        (status[2] === 1) ? (null) : (doneIcon)
                    }
                </div>
            </div>
        </div>
    );
}