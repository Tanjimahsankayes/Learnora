"use client";

import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  RotateCcw,
  PlayCircle,
  BookOpen,
  ChevronRight,
  Loader2,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/quizzes";

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected Active Quiz State
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({}); // { 0: 1, 1: 2 } key: questionIndex, value: optionIndex
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  // Fetch Quizzes from API
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success) {
        setQuizzes(data.quizzes);
      } else {
        setError("কুইজ ডাটা লোড করতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      setError("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না।");
    } finally {
      setLoading(false);
    }
  };

  // Start Quiz Timer
  useEffect(() => {
    if (!activeQuiz || isSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz(); // Auto submit on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz, isSubmitted, timeLeft]);

  // Start a specific Quiz
  const handleStartQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setUserAnswers({});
    setIsSubmitted(false);
    setResult(null);
    // Convert duration (minutes) to seconds
    setTimeLeft(quiz.duration * 60);
  };

  // Select Option
  const handleOptionSelect = (questionIndex, optionIndex) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  // Calculate Result & Submit
  const handleSubmitQuiz = () => {
    if (isSubmitted || !activeQuiz) return;

    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    activeQuiz.questions.forEach((q, index) => {
      const selectedOption = userAnswers[index];
      if (selectedOption === undefined) {
        unattemptedCount++;
      } else if (selectedOption === q.correctOption) {
        score++;
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    setResult({
      score,
      totalQuestions: activeQuiz.questions.length,
      correctCount,
      wrongCount,
      unattemptedCount,
      percentage: Math.round((score / activeQuiz.questions.length) * 100),
    });

    setIsSubmitted(true);
  };

  // Time Formatter (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 gap-3">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        <p className="text-sm">কুইজসমূহ লোড হচ্ছে...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-rose-400 gap-3">
        <AlertCircle className="w-10 h-10" />
        <p className="text-sm">{error}</p>
        <button
          onClick={fetchQuizzes}
          className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 hover:text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-purple-400" />
              <span>All Quizzes & Practice</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              আপনার পছন্দের কুইজ নির্বাচন করুন এবং নিজেকে যাচাই করুন।
            </p>
          </div>
          {activeQuiz && (
            <button
              onClick={() => setActiveQuiz(null)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 hover:bg-slate-800 transition-all"
            >
              Back to All Quizzes
            </button>
          )}
        </div>

        {/* VIEW 1: Quiz List (If no quiz is active) */}
        {!activeQuiz && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {quizzes.length === 0 ? (
              <div className="col-span-2 text-center py-12 bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-400 text-sm">
                কোনো কুইজ পাওয়া যায়নি।
              </div>
            ) : (
              quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-purple-500/50 transition-all group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                        {quiz.category || "General"}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        {quiz.duration} Mins
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {quiz.title}
                    </h2>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-slate-500" />
                      {quiz.totalQuestions || quiz.questions?.length || 0}{" "}
                      Questions
                    </span>
                    <button
                      onClick={() => handleStartQuiz(quiz)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/20"
                    >
                      <span>Start Quiz</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* VIEW 2: Active Quiz Screen */}
        {activeQuiz && (
          <div className="space-y-6">
            {/* Quiz Info & Live Timer Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-4 z-10 backdrop-blur-xl bg-slate-900/90 shadow-xl">
              <div>
                <span className="text-xs text-purple-400 uppercase font-semibold">
                  {activeQuiz.category}
                </span>
                <h2 className="text-lg font-bold text-white">
                  {activeQuiz.title}
                </h2>
              </div>

              {/* Timer Box */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-mono font-bold ${
                    timeLeft <= 60 && !isSubmitted
                      ? "bg-rose-500/10 border-rose-500/40 text-rose-400 animate-pulse"
                      : "bg-slate-950 border-slate-800 text-purple-400"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(timeLeft)}</span>
                </div>

                {!isSubmitted && (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-purple-600/20"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>

            {/* RESULT CARD (Appears after submission) */}
            {isSubmitted && result && (
              <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-6 space-y-6 shadow-2xl">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <Award className="w-8 h-8 text-amber-400" />
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Quiz Result Summary
                    </h3>
                    <p className="text-xs text-slate-400">
                      আপনার পারফরম্যান্স রিপোর্ট
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                    <p className="text-xs text-slate-400">Total Score</p>
                    <p className="text-2xl font-extrabold text-purple-400 mt-1">
                      {result.score} / {result.totalQuestions}
                    </p>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                    <p className="text-xs text-slate-400">Correct Answers</p>
                    <p className="text-2xl font-extrabold text-emerald-400 mt-1">
                      {result.correctCount}
                    </p>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                    <p className="text-xs text-slate-400">Wrong Answers</p>
                    <p className="text-2xl font-extrabold text-rose-400 mt-1">
                      {result.wrongCount}
                    </p>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                    <p className="text-xs text-slate-400">Accuracy</p>
                    <p className="text-2xl font-extrabold text-amber-400 mt-1">
                      {result.percentage}%
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleStartQuiz(activeQuiz)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            )}

            {/* QUESTIONS LIST */}
            <div className="space-y-6">
              {activeQuiz.questions.map((q, qIndex) => {
                const userSelected = userAnswers[qIndex];
                const isCorrect = userSelected === q.correctOption;

                return (
                  <div
                    key={qIndex}
                    className={`bg-slate-900 border rounded-2xl p-6 space-y-4 transition-all ${
                      isSubmitted
                        ? isCorrect
                          ? "border-emerald-500/40"
                          : userSelected !== undefined
                            ? "border-rose-500/40"
                            : "border-slate-800"
                        : "border-slate-800"
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-3">
                      <h3 className="text-sm sm:text-base font-semibold text-slate-100 flex items-start gap-2">
                        <span className="text-purple-400 font-bold">
                          Q{qIndex + 1}.
                        </span>
                        <span>{q.questionText}</span>
                      </h3>

                      {/* Submitted Evaluation Badge */}
                      {isSubmitted && (
                        <div>
                          {isCorrect ? (
                            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                            </span>
                          ) : userSelected !== undefined ? (
                            <span className="flex items-center gap-1 text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg">
                              <XCircle className="w-3.5 h-3.5" /> Incorrect
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                              Skipped
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((option, oIndex) => {
                        let btnStyle =
                          "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";

                        if (isSubmitted) {
                          if (oIndex === q.correctOption) {
                            btnStyle =
                              "bg-emerald-500/10 border-emerald-500/60 text-emerald-300 font-semibold";
                          } else if (userSelected === oIndex) {
                            btnStyle =
                              "bg-rose-500/10 border-rose-500/60 text-rose-300";
                          } else {
                            btnStyle =
                              "bg-slate-950/50 border-slate-800 text-slate-500 opacity-60";
                          }
                        } else if (userSelected === oIndex) {
                          btnStyle =
                            "bg-purple-600/15 border-purple-500 text-purple-300 font-medium";
                        }

                        return (
                          <button
                            key={oIndex}
                            disabled={isSubmitted}
                            onClick={() => handleOptionSelect(qIndex, oIndex)}
                            className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[11px] font-bold text-slate-400 shrink-0">
                                {String.fromCharCode(65 + oIndex)}
                              </span>
                              <span>{option}</span>
                            </div>

                            {/* Option Radio / Status Indicator */}
                            {!isSubmitted && (
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  userSelected === oIndex
                                    ? "border-purple-500 bg-purple-500"
                                    : "border-slate-700"
                                }`}
                              >
                                {userSelected === oIndex && (
                                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                )}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Submit Button */}
            {!isSubmitted && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSubmitQuiz}
                  className="w-full sm:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-600/25"
                >
                  Submit Answers
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllQuizzes;
