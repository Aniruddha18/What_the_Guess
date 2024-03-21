import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { GenerateWord, RandomWord } from "../utils/openAi";
import { wordGuessContainer } from "./style";
import { PercentageBar } from "./WordBar";

const Main = () => {
  const [data, setData] = useState();
  const [word, setWord] = useState("");
  const [match, setMatch] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [guessItem, setGuessItem] = useState([]);

  /**Generates the Word on Start Button */
  const handleStart = async () => {
    // const prompt =
    //   "Generate a single, unique, and randomly chosen English object that is both meaningful and concise. Ensure that the word is not excessively long and is relevant to a specific subject or context. Avoid repetitive outputs by introducing variability in the generated words to enhance diversity and creativity. Consider the word's relevance to common subjects or themes to make it more engaging and contextually appropriate. Note: Only word should be the output nothing else.";

    // const word = await GenerateWord(prompt);
    const word = RandomWord();
    const resWord = word.toLowerCase();
    console.log("word", word);
    setData(resWord);
    setDisabled(false);
  };

  /** OnChange handler when typing the word */
  const handleChange = (e) => {
    setMatch(false);
    const value = e.target.value.toLowerCase();
    setWord(value);
  };

  /**Submits the word on Enter */
  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      if (word === data) {
        setMatch(true);
      } else {
        setGuessItem([...guessItem, { word: word }]);
      }
      CheckRelevancy();
      setWord("");
    }
  };
  /** Reset the application */
  const handleReset = () => {
    setGuessItem([]);
    setWord("");
    setData("");
    setDisabled(true);
  };
  const CheckRelevancy = async () => {
    try {
      const prompt = `<s>Assess the semantic similarity between the word "${word}" and the reference word "${data}". Provide a percentage representing the closeness or relevance of these two words.</s> [INST]Note: Please Express the percentage as a numeric value without the '%' symbol and refrain from including additional words in your response.[/INST].
      `;
      const percentage = await GenerateWord(prompt);
      console.log("percent", percentage);
      setGuessItem([...guessItem, { word: word, percentage: percentage }]);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <h1> Welcome to What-aa-Guess!</h1>
      <Button
        variant="contained"
        style={{ marginBottom: "20px", width: "120px" }}
        onClick={handleStart}
      >
        Start
      </Button>
      <Button
        variant="contained"
        style={{ marginBottom: "20px", width: "120px", marginLeft: "5px" }}
        onClick={handleReset}
      >
        Reset
      </Button>
      <div className="flex">
        <TextField
          disabled={disabled}
          style={{ width: "400px" }}
          id="filled-basic"
          label="Enter Word"
          variant={disabled ? "filled" : "outlined"}
          value={word}
          onChange={handleChange}
          onKeyDown={handleSubmit}
        />
      </div>
      {match && <p>Hurrayyy!! What a Guess!!</p>}
      <div style={wordGuessContainer}>
        {guessItem.map((item, index) => (
          <div style={{ display: "flex", flexDirection: "row", margin: "2px" }}>
            <PercentageBar
              key={index}
              percentage={item.percentage}
              item={item.word}
            />
            <p key={index}>
              <strong>{item.percentage}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
