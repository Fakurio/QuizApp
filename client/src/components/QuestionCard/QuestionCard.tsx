import { OnNewQuestionSubscription } from "../../__generated__/graphql";
import shuffleArray from "../../utils/shuffle-array";
import Button from "../Button/Button";
import "./QuestionCard.css";
import { useState, useMemo } from "react";

interface QuestionCardProps {
  question: OnNewQuestionSubscription["newQuestion"];
  showCorrectAnswer: boolean;
  onAnswerSelection: (isCorrect: boolean, answer?: string) => void;
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
  const handleAnswerSelection = (isCorrect: boolean, answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    onAnswerSelection(isCorrect, answer);
  };

  return (
    <div className="question-card">
      <h1 className="question-card__heading">
        {question.name.replace(/&quot;/g, '"')}
      </h1>
      <div className="question-card__answers">
        {answers.map((answer, index) => (
          <Button
            text={answer.replace(/&quot;/g, '"')}
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
              handleAnswerSelection(question.answer.correct === answer, answer)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
