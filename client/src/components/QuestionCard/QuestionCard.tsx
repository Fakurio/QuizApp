import { OnNewQuestionSubscription } from "../../__generated__/graphql";
import { sanitizeString } from "../../utils/sanitize-string";
import shuffleArray from "../../utils/shuffle-array";
import Button from "../Button/Button";
import "./QuestionCard.css";
import { useState, useMemo } from "react";

interface QuestionCardProps {
  question: OnNewQuestionSubscription["newQuestion"];
  showCorrectAnswer: boolean;
  onAnswerSelection: (isCorrect: boolean, questionID: number) => void;
}

const QuestionCard = ({
  question,
  showCorrectAnswer,
  onAnswerSelection,
}: QuestionCardProps) => {
  const answers = useMemo(() => {
    return shuffleArray(
      question.answer.incorrect.concat(question.answer.correct)
    );
  }, [question]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerSelection = (
    isCorrect: boolean,
    answer: string,
    questionID: number
  ) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    onAnswerSelection(isCorrect, questionID);
  };

  return (
    <div className="question-card">
      <h1 className="question-card__heading">
        {sanitizeString(question.name)}
      </h1>
      <div className="question-card__answers">
        {answers.map((answer, index) => (
          <Button
            text={sanitizeString(answer)}
            key={index}
            className={`question-card__answers__answer ${
              showCorrectAnswer && question.answer.correct === answer
                ? "answer--correct"
                : undefined
            } ${
              selectedAnswer === answer && answer === question.answer.correct
                ? "answer--correct"
                : selectedAnswer === answer &&
                  answer !== question.answer.correct
                ? "answer--incorrect"
                : ""
            }`}
            onClick={() =>
              handleAnswerSelection(
                question.answer.correct === answer,
                answer,
                question.id
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
