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
    <div className="bg-secondary dark:bg-primary mt-[100px] flex h-screen w-full flex-col items-center justify-center gap-[100px] p-4">
      <h1 className="text-primary dark:text-secondary max-w-3xl text-[20px]">
        <i>
          Embark on a thrilling adventure through the{" "}
          <strong>Universe of Chemistry with ChemVerse!</strong> From atomic
          structures to chemical reactions, test your chemistry knowledge,
          unleash your inner scientist, and unlock the secrets of chemical
          compounds in real-time!
        </i>
      </h1>
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
            <h2 className="text-primary dark:text-secondary text-2xl font-bold">
              🎉 Quiz Complete!
            </h2>
            <p className="text-primary dark:text-secondary mt-2">
              You scored {score} out of {quizData.length}
            </p>
            <button
              onClick={() => {
                setCurrent(0);
                setScore(0);
                setSelected(null);
                setShowAnswer(false);
              }}
              className="bg-primary text-secondary hover:bg-bg-color-dark dark:bg-secondary dark:hover:bg-bg-color dark:text-primary mt-4 rounded px-4 py-2"
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
