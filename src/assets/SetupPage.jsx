import React, { useState } from 'react';
import { RefreshCw, TrendingUp, CheckCircle, Clock, Settings, ArrowLeft } from 'lucide-react';

const getTodayDateString = () => {
    return new Date().toISOString().split('T')[0];
};

// ===========================================
// 1. SETUP PAGE COMPONENT (Handles Settings/Goal Configuration)
// ===========================================
function SetupPage({ habitName, targetStreak, setHabitName, setTargetStreak, setCurrentPage }) {
    const [nameInput, setNameInput] = useState(habitName);
    const [targetInput, setTargetInput] = useState(targetStreak);

    const handleSave = () => {
        if (nameInput.trim() && targetInput > 0) {
            setHabitName(nameInput.trim());
            setTargetStreak(Number(targetInput));
            setCurrentPage('tracker');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-['Inter']">
            <div className="w-full max-w-md p-8 rounded-2xl border-4 border-indigo-600 bg-white shadow-3xl">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-indigo-800 tracking-tight">Habit Setup</h1>
                    <p className="text-gray-500 mt-2 text-lg">Define your tracking goal.</p>
                </header>

                <div className="space-y-6 mb-8">
                    <label className="block">
                        <span className="text-gray-800 font-bold mb-2 block">Habit Name</span>
                        <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition duration-150"
                            placeholder="e.g., Daily Code Practice"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-800 font-bold mb-2 block">Target Streak (Days)</span>
                        <input
                            type="number"
                            value={targetInput}
                            onChange={(e) => setTargetInput(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition duration-150"
                            min="1"
                        />
                    </label>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={handleSave}
                        className="w-full py-4 flex items-center justify-center font-extrabold text-xl rounded-xl shadow-xl bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 transform hover:scale-[1.01]"
                    >
                        Save and Start Tracking
                    </button>
                    <button
                        onClick={() => setCurrentPage('tracker')}
                        className="w-full py-3 flex items-center justify-center font-medium text-base text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition duration-200"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Tracker
                    </button>
                </div>
            </div>
        </div>
    );
};