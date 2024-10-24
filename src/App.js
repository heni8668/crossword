import React, { useCallback, useEffect, useRef, useState } from "react";
import Crossword from "@jaredreisinger/react-crossword";
import "./styles.css";
import styled from "styled-components";
import {data, data1} from './crossword-sample'
import Footer from "./Footer";




const Page = styled.div`
  padding: 2em;
`;

const Commands = styled.div`
margin: 10px;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
`;

const Command = styled.button`
  margin-right: 1em;
  padding: 1em 1em;
  background-color: #f8f3f3;
  border: none;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-weight: bold;
`;

const CrosswordWrapper = styled.div`
  margin-top: 2em;
  font-family: sans-serif;

  /* and some fun making use of the defined class names */
  .crossword.correct {
    rect {
      stroke: #8ba69b !important;
    }
    svg > rect {
      fill: #8ba69b !important;
    }
    text {
      fill: #000 !important;
    }
  }

  .clue.correct {
    ::before {
      content: "\u2713"; /* a.k.a. checkmark: ✓ */
      display: inline-block;
      text-decoration: none;
      color: #007e49;
      margin-right: 0.25em;
    }

    text-decoration: line-through;
    color: rgb(130, 130, 130);
  }
`;
/* other styles */
  const Title = styled.h2`
  font-size: 2em;
  text-align: center;
  `

// in order to make this a more-comprehensive example, and to vet Crossword's
// features, we actually implement a fair amount...

function App() {
  const crossword = useRef();

  const fillAllAnswers = useCallback((event) => {
    crossword.current.fillAllAnswers();
  }, []);

  const reset = useCallback((event) => {
    crossword.current.reset();
  }, []);

  // We don't really *do* anything with callbacks from the Crossword component,
  // but we can at least show that they are happening.  You would want to do
  // something more interesting than simply collecting them as messages.
  const [messages, setMessages] = useState([]);
  // const [currentData, setCurrentData] = useState(data1);

  // useEffect(() => {
  //   // Set to data1 when the component mounts (on page refresh)
  //   setCurrentData(data);
  // }, []);

  const addMessage = useCallback((message) => {
    setMessages((m) => m.concat(`${message}\n`));
  }, []);

  // onCorrect is called with the direction, number, and the correct answer.
  const onCorrect = useCallback(
    (direction, number, answer) => {
      addMessage(`onCorrect: "${direction}", "${number}", "${answer}"`);
    },
    [addMessage]
  );

  // onLoadedCorrect is called with an array of the already-correct answers,
  // each element itself is an array with the same values as in onCorrect: the
  // direction, number, and the correct answer.
  const onLoadedCorrect = useCallback(
    (answers) => {
      addMessage(
        `onLoadedCorrect:\n${answers
          .map(
            ([direction, number, answer]) =>
              `    - "${direction}", "${number}", "${answer}"`
          )
          .join("\n")}`
      );
    },
    [addMessage]
  );

  // onCrosswordCorrect is called with a truthy/falsy value.
  const onCrosswordCorrect = useCallback(
    (isCorrect) => {
      addMessage(`onCrosswordCorrect: ${JSON.stringify(isCorrect)}`);
    },
    [addMessage]
  );

  // onCellChange is called with the row, column, and character.
  const onCellChange = useCallback(
    (row, col, char) => {
      addMessage(`onCellChange: "${row}", "${col}", "${char}"`);
    },
    [addMessage]
  );

  if (crossword.isCorrect) {
  } else {
    console.log(crossword.isCorrect);
    console.log("incorrect");
  }

  return (
    <>
      <Title>My Crossword Game</Title>
      <Page>
        <CrosswordWrapper>
          <Crossword
            data={data1}
            ref={crossword}
            onCorrect={onCorrect}
            onLoadedCorrect={onLoadedCorrect}
            onCrosswordCorrect={onCrosswordCorrect}
            onCellChange={onCellChange}
            theme={{
              gridBackground: "gray",
              cellBackground: "#F9EEFC",
              cellBorder: "lightgray",
              textColor: "rgb(0,0,0)",
              numberColor: "rgba(0,0,0, 0.5)",
              focusBackground: "#FFBA08",
              highlightBackground: "#FFF3D6",
            }}
          />
        </CrosswordWrapper>
        <Commands>
          <Command onClick={fillAllAnswers}>Fill answers</Command>
          <Command onClick={reset}>Reset</Command>
        </Commands>

        {/* <p>{messages}</p> */}
      </Page>
      <Footer />
    </>
  );
}

export default App;
