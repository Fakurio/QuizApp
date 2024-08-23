import {
  OnNewQuestionSubscription,
  Question,
} from "../../__generated__/graphql";
import shuffleArray from "../../utils/shuffle-array";
import Button from "../Button/Button";
import Timer from "../Timer/Timer";
import "./QuestionCard.css";
import { useState, useMemo } from "react";

interface QuestionCardProps {
  question: OnNewQuestionSubscription["newQuestion"];
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const answers = useMemo(() => {
    return shuffleArray(
      question.answer.incorrect.concat(question.answer.correct)
    );
  }, [question]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  return (
    <div className="question-card">
      <h1 className="question-card__heading">{question.name}</h1>
      <div className="question-card__answers">
        {answers.map((answer, index) => (
          <Button
            text={answer}
            key={index}
            className={`question-card__answers__answer ${
              selectedAnswer === answer ? "answer--selected" : undefined
            }`}
            onClick={() => setSelectedAnswer(answer)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
