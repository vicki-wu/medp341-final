"use client";
import { useState } from "react";
import Image from "next/image";

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { name: "angry", message: "Take deep breaths, tomorrow is a new day!" },
    { name: "annoyed", message: "Hope things get less frustrating soon!" },
    { name: "devious", message: "Someone's feeling mischievous today!" },
    { name: "happy", message: "Glad you're having a great day!" },
    { name: "proud", message: "You should be proud of yourself!" },
    {
      name: "sad",
      message: "Sorry you're feeling down, hope you feel better tomorrow!",
    },
    { name: "sneaky", message: "What are you up to?" },
    { name: "surprised", message: "Hope it was a good surprise!" },
  ];

  return (
    <div className="todo-section">
      {!selectedMood ? (
        <>
          <div className="todo-header">
            <h2>How are you feeling today?</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {moods.map((mood) => (
              <div
                key={mood.name}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedMood(mood)}
              >
                <Image
                  src={`/${mood.name}.png`}
                  alt={mood.name}
                  width={80}
                  height={80}
                  className="mx-auto"
                />
                <p className="text-center mt-2 capitalize">{mood.name}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="mb-6">
            <Image
              src={`/${selectedMood.name}.png`}
              alt={selectedMood.name}
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <div className="todo-header text-center">
            <h2 style={{ textAlign: "center", width: "100%" }}>
              Today, you feel:{" "}
              <span className="capitalize">{selectedMood.name}</span>
            </h2>
          </div>
          <p className="text-gray-600 mb-4">{selectedMood.message}</p>
          <button
            onClick={() => setSelectedMood(null)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Change Mood
          </button>
        </div>
      )}
    </div>
  );
}
