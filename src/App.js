import {
  Button,
  TextField,
  Container,
  Stack,
  Skeleton,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleSetAnswer = (e) => {
    setAnswer(e.target.value);
  };
  const apiUrl = "https://opentdb.com/api.php?amount=1";

  const checkAnswer = () => {
    if (answer === "") {
      setMessage("Please enter your answer");
      setOpen(true);
      return;
    }
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      setMessage("Correct Answer");
      setOpen(true);
    } else {
      setMessage("Wrong Answer");
      setOpen(true);
    }
    setAnswer("");
    getQuestions();
  };

  function getQuestions() {
    axios.get(apiUrl).then((response) => {
      console.log(response.data.results[0]);
      setQuestion(response.data.results[0].question);
      setCorrectAnswer(response.data.results[0].correct_answer);

      const allAnswers = response.data.results[0].incorrect_answers.concat(
        response.data.results[0].correct_answer
      );
      setAllAnswers(allAnswers);
    });
  }

  useEffect(() => {
    console.log("useeffect");
    getQuestions();
  }, []);

  return (
    <Container maxWidth="sm">
      <Stack spacing={2}>
        <h1 className="app-name">Trivia App</h1>
        {question ? (
          <>
            <h2 className="question">{question}</h2>
            <Stack spacing={2}>
              {allAnswers.map((answer, index) => (
                <li className="options" key={index}>
                  {answer}
                </li>
              ))}
            </Stack>
          </>
        ) : (
          <>
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" width={210} height={118} />
          </>
        )}

        <TextField
          id="outlined-basic"
          label="enter answer"
          variant="outlined"
          onChange={handleSetAnswer}
          value={answer}
        />
        <Button onClick={checkAnswer} variant="contained">
          Submit
        </Button>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={3}
        message={message}
      />
    </Container>
  );
}

export default App;
