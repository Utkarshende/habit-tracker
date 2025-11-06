import React, { useState } from 'react';
import { ArrowLeft, Edit3 } from 'lucide-react';

function SetupPage({ habitName, targetStreak, setHabitName, setTargetStreak, setCurrentPage }) {
    const [nameInput, setNameInput] = useState(habitName);
    const [targetInput, setTargetInput] = useState(targetStreak);

    const handleSave = () => {
        const parsedTarget = Number(targetInput);
        
        setHabitName(nameInput.trim());
        setTargetStreak(parsedTarget);
        setCurrentPage('tracker');
    };
    
    const backToTracker = () => {
        setCurrentPage('tracker');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-4 font-['Inter']">
            <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-2xl shadow-indigo-300/60 border border-indigo-100 transition duration-500">
                
                <header className="text-center mb-8 border-b pb-3 border-gray-100">
                    <Edit3 className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <h1 className="text-3xl font-extrabold text-indigo-800 tracking-tight">Habit Setup</h1>
                    <p className="text-gray-500 mt-1 text-base font-medium">Define your tracking goal.</p>
                </header>

                <div className="space-y-6 mb-6">
                    <label className="block">
                        <span className="text-gray-800 font-bold mb-2 block text-base">Habit Name</span>
                        <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg shadow-inner focus:border-indigo-600 focus:ring-4 focus:ring-indigo-300/50 transition duration-200 hover:border-indigo-400 text-base"
                            placeholder="e.g., Daily Code Practice"
                        />
                    </label>
                    
                    <label className="block">
                        <span className="text-gray-800 font-bold mb-2 block text-base">Target Streak (Days)</span>
                        <input
                            type="number"
                            value={targetInput}
                            onChange={(e) => setTargetInput(e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg shadow-inner focus:border-indigo-600 focus:ring-4 focus:ring-indigo-300/50 transition duration-200 hover:border-indigo-400 text-base"
                            min="1"
                        />
                    </label>
                </div>
                
                <div className="space-y-3">
                    <button
                        onClick={handleSave}
                        className="w-full py-4 flex items-center justify-center font-extrabold text-lg rounded-xl text-white uppercase tracking-wider
                            bg-gradient-to-r from-indigo-600 to-purple-700 
                            shadow-xl shadow-indigo-500/50 
                            hover:from-indigo-700 hover:to-purple-800 
                            transition duration-300 transform hover:scale-[1.01] active:scale-[0.98]"
                    >
                        Save and Start Tracking
                    </button>
                    <button
                        onClick={backToTracker}
                        className="w-full py-2.5 flex items-center justify-center font-medium text-sm text-indigo-700 bg-indigo-50 rounded-xl 
                            hover:bg-indigo-100 transition duration-200 shadow-md border border-indigo-200"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Tracker
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetupPage;