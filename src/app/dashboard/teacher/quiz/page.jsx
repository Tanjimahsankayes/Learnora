"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Plus,
  Trash2,
  CheckCircle2,
  Loader2,
  AlertCircle,
  BookOpen,
  Award,
  Clock,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api/quizzes";

const CreateQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Quiz Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState(15); // Minutes
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctOption: 0, // 0, 1, 2, or 3
    },
  ]);

  // Handle Question Text Change
  const handleQuestionTextChange = (qIndex, text) => {
    const updated = [...questions];
    updated[qIndex].questionText = text;
    setQuestions(updated);
  };

  // Handle Option Text Change
  const handleOptionChange = (qIndex, oIndex, text) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = text;
    setQuestions(updated);
  };

  // Handle Correct Option Selection
  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].correctOption = oIndex;
    setQuestions(updated);
  };

  // Add New Question Field
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctOption: 0,
      },
    ]);
  };

  // Remove Question Field
  const removeQuestion = (qIndex) => {
    if (questions.length === 1) {
      alert("কমপক্ষে ১টি প্রশ্ন থাকতে হবে!");
      return;
    }
    setQuestions((prev) => prev.filter((_, index) => index !== qIndex));
  };

  // Submit Form to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const quizData = {
      title,
      category,
      duration: Number(duration),
      totalQuestions: questions.length,
      questions,
    };

    try {
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: "success", text: "কুইজটি সফলভাবে তৈরি করা হয়েছে!" });
        // Reset Form
        setTitle("");
        setCategory("");
        setDuration(15);
        setQuestions([
          { questionText: "", options: ["", "", "", ""], correctOption: 0 },
        ]);
      } else {
        setMessage({
          type: "error",
          text: data.message || "কুইজ তৈরি করতে সমস্যা হয়েছে।",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "সার্ভারে কানেক্ট করা সম্ভব হয়নি।" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-purple-400" />
            <span>Create a New Quiz</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            শিক্ষার্থীদের জন্য কুইজের টাইটেল, সময় এবং প্রশ্নাবলি যুক্ত করুন।
          </p>
        </div>

        {/* Success / Error Banner */}
        {message && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm ${
              message.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: Quiz Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span>১. কুইজের তথ্য (Quiz Details)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Quiz Title */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. JavaScript Basic Concepts Quiz"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Web Development"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Duration (Minutes) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Time Limit (Minutes) *</span>
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="15"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Dynamic Questions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span>২. প্রশ্নসমূহ (Questions - {questions.length})</span>
              </h2>
              <button
                type="button"
                onClick={addQuestion}
                className="px-4 py-2 rounded-xl bg-purple-600/10 border border-purple-500/30 text-purple-300 hover:bg-purple-600 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>

            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 relative group"
              >
                {/* Delete Question Button */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                    Question #{qIndex + 1}
                  </span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIndex)}
                      className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg transition-colors"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Question Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Question Text *
                  </label>
                  <input
                    type="text"
                    required
                    value={q.questionText}
                    onChange={(e) =>
                      handleQuestionTextChange(qIndex, e.target.value)
                    }
                    placeholder="e.g. What is the output of typeof null in JS?"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                {/* Options Input (4 Options) */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-400 block">
                    Options (সঠিক উত্তরটির পাশের রেডিও বাটনে ক্লিক করুন) *
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((optionText, oIndex) => (
                      <div
                        key={oIndex}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                          q.correctOption === oIndex
                            ? "bg-purple-600/10 border-purple-500/50"
                            : "bg-slate-950 border-slate-800"
                        }`}
                      >
                        {/* Radio for Correct Answer */}
                        <input
                          type="radio"
                          name={`correct-option-${qIndex}`}
                          checked={q.correctOption === oIndex}
                          onChange={() =>
                            handleCorrectOptionChange(qIndex, oIndex)
                          }
                          className="w-4 h-4 text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                        {/* Option Text */}
                        <input
                          type="text"
                          required
                          value={optionText}
                          onChange={(e) =>
                            handleOptionChange(qIndex, oIndex, e.target.value)
                          }
                          placeholder={`Option ${oIndex + 1}`}
                          className="w-full bg-transparent text-xs sm:text-sm text-slate-200 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-6">
            <button
              type="button"
              onClick={addQuestion}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Question</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/25 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>কুইজ সেভ হচ্ছে...</span>
                </>
              ) : (
                <span>Save Quiz</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
