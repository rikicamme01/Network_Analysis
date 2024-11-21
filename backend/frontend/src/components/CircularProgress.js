import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'inline-flex',
                width: props.size,
                height: props.size,
            }}
        >
            <CircularProgress
                variant="determinate"
                {...props}
                size={props.size} // Specifica la dimensione del cerchio
                thickness={4} // Spessore della barra (opzionale)
                sx={{
                    color: '#22509c', // Colore del cerchio
                }}

            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    sx={{
                        fontSize: props.labelSize || '1rem', // Regola la dimensione del testo
                        color: 'text.secondary',
                    }}
                >
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
    size: PropTypes.number, // Aggiungi la prop per la dimensione
    labelSize: PropTypes.string, // Aggiungi la prop per la dimensione del testo della label
};
CircularProgressWithLabel.defaultProps = {
    value: 0,
    size: 80, // Dimensione di default
    labelSize: '1rem', // Dimensione di default della label
};

export default function CircularWithValueLabel() {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return <CircularProgressWithLabel
        value={progress}
        size={100} // Dimensione del cerchio
        labelSize="1.5rem" // Dimensione della label
    />;
}
