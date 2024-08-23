import "./GamePage.css";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { gql, useMutation, useSubscription } from "@apollo/client";
import {
  CreateGameMutation,
  CreateGameMutationVariables,
  OnNewQuestionSubscription,
  OnNewQuestionSubscriptionVariables,
} from "../../__generated__/graphql";
import QuestionCard from "../QuestionCard/QuestionCard";
import { useEffect, useState, useRef } from "react";
import Timer from "../Timer/Timer";

const CREATE_GAME_MUTATION = gql`
  mutation createGame($gameData: GameInput!) {
    createGame(gameData: $gameData)
  }
`;

const ON_NEW_QUESTION = gql`
  subscription OnNewQuestion($gameCode: String!) {
    newQuestion(gameCode: $gameCode) {
      name
      answer {
        correct
        incorrect
      }
      startTime
      duration
      questionAmount
    }
  }
`;

const GamePage = () => {
  const questions = [
    {
      name: "What is the capital of France?",
      answer: {
        correct: "Paris",
        incorrect: ["London", "Berlin", "Madrid"],
      },
      startTime: Date.now().toString(),
      duration: 10,
      questionAmount: 10,
      gameCode: "1234",
    },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const [createGame] = useMutation<
    CreateGameMutation,
    CreateGameMutationVariables
  >(CREATE_GAME_MUTATION);
  const { data, loading } = useSubscription<
    OnNewQuestionSubscription,
    OnNewQuestionSubscriptionVariables
  >(ON_NEW_QUESTION, {
    variables: {
      gameCode: location.state?.gameData.gameCode || "",
    },
  });
  const [questionNumber, setQuestionNumber] = useState(0);
  const questionAmount = useRef(0);
  // useEffect(() => {
  //   const handlePopState = (event) => {
  //     console.log("popstate");
  //     // event.preventDefault();
  //     // navigate("/game", { state: location.state });
  //     alert("Benc");

  //     window.removeEventListener("popstate", handlePopState);
  //     return;
  //   };

  //   window.addEventListener("popstate", handlePopState);
  // }, []);

  const startGame = async () => {
    const gameData = location.state.gameData;
    try {
      await createGame({
        variables: {
          gameData: gameData,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setQuestionNumber((prev) => prev + 1);
    }
    if (data?.newQuestion.questionAmount) {
      questionAmount.current = data.newQuestion.questionAmount;
    }
  }, [data]);

  if (!location.state) {
    return <Navigate to="/" />;
  }
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="game-page">
      <button onClick={() => startGame()}>START</button>
      {data && (
        <>
          <div>
            Question number: {questionNumber}/{questionAmount.current}
          </div>
          <Timer
            key={data.newQuestion.startTime}
            startTime={data.newQuestion.startTime}
            duration={data.newQuestion.duration}
          />
          <QuestionCard question={data.newQuestion} />
        </>
      )}
    </div>
  );

  // return (
  //   <div className="game-page">

  //     {/* <Timer startTime={question.startTime} duration={question.duration} /> */}
  //     {questions.map((question, index) => (
  //       <QuestionCard key={index} question={question} />
  //     ))}

  //     {/*{!loading && data && <p>{data.newQuestion.name}</p>}
  //     {!loading && data && <p>{data.newQuestion.answer.correct}</p>}
  //     {!loading && data && <p>{data.newQuestion.answer.incorrect}</p>}
  //     {!loading && data && <p>{data.newQuestion.questionAmount}</p>}
  //     {!loading && data && <p>{data.newQuestion.duration}</p>}
  //     {!loading && data && <p>{data.newQuestion.startTime}</p>}
  //     <h1>Game Page</h1> */}
  //   </div>
  // );
};

export default GamePage;
