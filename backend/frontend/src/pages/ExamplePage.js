import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import {Link } from 'react-router-dom'


export default function QuestionForm() {
    const questionRefs = Array.from({ length: 5 }, () => useRef(null));
    const [answers, setAnswers] = useState([]);

    const handleButtonClick = () => {
        const collectedAnswers = questionRefs.map((ref, index) => {
            return ref.current.value;
        });
        
        // Salva le risposte nello stato e le logga
        setAnswers(collectedAnswers);
        console.log("Risposte:", collectedAnswers);
    };

    return (
        <Grid container spacing={3} justifyContent="center">
            {Array.from({ length: 5 }).map((_, index) => (
                <Grid item xs={12} key={index}>
                    <FormControl fullWidth>
                        <Typography variant="h6">{`Domanda ${index + 1}`}</Typography>
                        <TextField
                            label={`Risposta ${index + 1}`}
                            inputRef={questionRefs[index]}
                            fullWidth
                        />
                    </FormControl>
                </Grid>
            ))}
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButtonClick}
                >
                    Stampa risposte
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6">Risposte inserite:</Typography>
                <pre>{JSON.stringify(answers, null, 2)}</pre> {/* Converte l'array in una stringa JSON per renderizzare */}
            </Grid>
        </Grid>
    );
}
