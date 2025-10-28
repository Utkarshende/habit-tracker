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


// ===========================================
// 2. TRACKER PAGE COMPONENT (The Main Tracking View)
// ===========================================
function TrackerPage({ habitName, currentStreak, targetStreak, lastCompletedDate, setCurrentStreak, setLastCompletedDate, setCurrentPage, getTodayDateString }) {
    const today = getTodayDateString();
    const isCompletedToday = lastCompletedDate === today;
    const isGoalMet = currentStreak >= targetStreak;

    const handleHabitComplete = () => {
        if (isCompletedToday) {
            return;
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];

        if (lastCompletedDate && lastCompletedDate !== yesterdayString) {
            setCurrentStreak(1);
        } else {
            setCurrentStreak(currentStreak + 1);
        }
        
        setLastCompletedDate(today); 
    };

    const resetStreak = () => {
        setCurrentStreak(0);
        setLastCompletedDate('');
    };
    
    let cardBgColor = 'bg-white border-indigo-500';
    let buttonBgColor = 'bg-indigo-600 hover:bg-indigo-700';
    let currentStreakBoxStyle = 'bg-indigo-100 border-indigo-300 hover:shadow-xl transition duration-300 transform hover:scale-[1.05]';

    if (isCompletedToday && !isGoalMet) {
        cardBgColor = 'bg-gray-50 border-gray-400';
        buttonBgColor = 'bg-gray-400 cursor-not-allowed';
        currentStreakBoxStyle = 'bg-gray-200 border-gray-400';
    } else if (isGoalMet) {
        cardBgColor = 'bg-green-100 border-green-600';
        buttonBgColor = 'bg-green-600 hover:bg-green-700';
        currentStreakBoxStyle = 'bg-green-200 border-green-400 shadow-2xl';
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 font-['Inter']">
            
            <div className={`w-full max-w-md p-8 rounded-2xl border-4 ${cardBgColor} shadow-3xl transition duration-500 ease-in-out`}>
                
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-lg font-semibold text-gray-600">{habitName}</h1>
                    <button onClick={() => setCurrentPage('setup')} className="text-indigo-600 hover:text-indigo-800 transition transform hover:rotate-12">
                        <Settings className="w-6 h-6" />
                    </button>
                </div>

                <header className="text-center mb-8">
                    <p className="text-4xl font-extrabold text-gray-900 tracking-tight leading-none">Habit Tracker</p>
                    <p className="text-sm text-gray-500 mt-2">Goal: {targetStreak} Days</p>
                </header>

                <div className="grid grid-cols-2 gap-4 text-center mb-10">
                    <div className={`p-5 rounded-xl shadow-lg ${currentStreakBoxStyle}`}>
                        <p className="text-5xl font-black text-indigo-700">{currentStreak}</p>
                        <p className="text-sm font-semibold text-gray-700 mt-2">Current Streak</p>
                    </div>
                    <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 shadow-inner">
                        <p className="text-5xl font-black text-gray-600">{targetStreak - currentStreak < 0 ? 0 : targetStreak - currentStreak}</p>
                        <p className="text-sm font-semibold text-gray-600 mt-2">Days Remaining</p>
                    </div>
                </div>

                <div className="text-center mb-8">
                    {isGoalMet ? (
                        <p className="mt-4 text-xl font-extrabold text-green-700 animate-pulse flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 mr-2" />
                            EPIC! Goal Met and Surpassed!
                        </p>
                    ) : isCompletedToday ? (
                        <p className="mt-4 text-xl font-bold text-gray-500 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 mr-2" />
                            Awesome! Logged for Today.
                        </p>
                    ) : (
                        <p className="mt-4 text-xl font-bold text-indigo-700 flex items-center justify-center">
                            <Clock className="w-6 h-6 mr-2" />
                            Time to Complete Today's Habit
                        </p>
                    )}
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleHabitComplete}
                        disabled={isCompletedToday}
                        className={`w-full py-5 flex items-center justify-center font-extrabold text-xl rounded-xl shadow-2xl transition duration-300 transform hover:scale-[1.01] focus:ring-4 focus:ring-offset-2 focus:ring-indigo-300 
                            ${buttonBgColor} text-white`}
                    >
                        {isCompletedToday ? "Completed Today" : "Log Habit Completed"}
                    </button>

                    <button
                        onClick={resetStreak}
                        className="w-full py-3 flex items-center justify-center font-medium text-sm text-red-600 bg-red-100 rounded-xl hover:bg-red-200 transition duration-200 border border-red-300"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset Streak (Start Over)
                    </button>
                </div>
            </div>
        </div>
    );
}


// ===========================================
// 3. MAIN APP COMPONENT (The State Manager and Router)
// ===========================================
function App() {
    // Application State
    const [habitName, setHabitName] = useState("Daily Reading (30 min)");
    const [currentStreak, setCurrentStreak] = useState(5);
    const [targetStreak, setTargetStreak] = useState(30);
    const [lastCompletedDate, setLastCompletedDate] = useState('2025-10-28'); 
    
    // Routing State: 'tracker' or 'setup'
    const [currentPage, setCurrentPage] = useState('tracker');

    // Props to pass down to both pages
    const commonProps = {
        habitName, setHabitName,
        currentStreak, setCurrentStreak,
        targetStreak, setTargetStreak,
        lastCompletedDate, setLastCompletedDate,
        setCurrentPage,
        // *** FIX: Passing the utility function as a prop ***
        getTodayDateString 
    };

    let PageContent;
    
    // Conditional rendering to switch between pages
    switch (currentPage) {
        case 'setup':
            PageContent = <SetupPage {...commonProps} />;
            break;
        case 'tracker':
        default:
            PageContent = <TrackerPage {...commonProps} />;
            break;
    }
    
    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 font-['Inter'] antialiased">
            {PageContent}
        </div>
    );
};

export default App;
