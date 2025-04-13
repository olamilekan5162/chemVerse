import { useState } from "react";
import { quizData } from "../../utils/quizData";

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const question = quizData[current];

  const handleSelect = (option) => {
    setSelected(option);
    setShowAnswer(true);
    if (option === question.correctAnswer) setScore(score + 1);
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowAnswer(false);
    setCurrent((prev) => prev + 1);
  };

  return (
    <div className="bg-secondary dark:bg-primary mt-[100px] flex h-screen w-full items-center justify-center p-4">
      <div className="bg-secondary dark:bg-primary w-full max-w-xl rounded-xl p-10 shadow-xl">
        {current < quizData.length ? (
          <>
            <h2 className="text-primary dark:text-secondary mb-4 text-xl font-bold">
              {`Q${current + 1}: ${question.question}`}
            </h2>
            <div className="grid gap-3">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(option)}
                  disabled={showAnswer}
                  className={`w-full rounded border px-4 py-2 transition-all ${
                    showAnswer
                      ? option === question.correctAnswer
                        ? "border-green-500 bg-green-100 text-green-700"
                        : option === selected
                          ? "border-red-500 bg-red-100 text-red-700"
                          : "border-gray-300 bg-gray-100"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showAnswer && (
              <div className="mt-4">
                <p className="text-sm font-medium">
                  {selected === question.correctAnswer ? (
                    <span className="text-green-600">✅ Correct!</span>
                  ) : (
                    <span className="text-red-600">❌ Incorrect</span>
                  )}
                </p>
                <p className="text-primary dark:text-secondary mt-2 text-sm">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
                <button
                  onClick={nextQuestion}
                  className="bg-primary text-secondary hover:bg-bg-color-dark dark:bg-secondary dark:hover:bg-bg-color dark:text-primary mt-4 rounded px-4 py-2"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold">🎉 Quiz Complete!</h2>
            <p className="mt-2 text-gray-600">
              You scored {score} out of {quizData.length}
            </p>
            <button
              onClick={() => {
                setCurrent(0);
                setScore(0);
                setSelected(null);
                setShowAnswer(false);
              }}
              className="mt-4 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Retry Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Quiz;
