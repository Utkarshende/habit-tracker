import React from 'react';
import { RefreshCw, TrendingUp, CheckCircle, Clock, Settings } from 'lucide-react';

const getTodayDateString = () => {
    return new Date().toISOString().split('T')[0];
};

function TrackerPage({ habitName, currentStreak, targetStreak, lastCompletedDate, setCurrentStreak, setLastCompletedDate, setCurrentPage }) {
    const today = getTodayDateString();

    const numericCurrentStreak = Number(currentStreak) || 0;
    const numericTargetStreak = Number(targetStreak) || 0;
    
    const isCompletedToday = lastCompletedDate === today;
    const isGoalMet = numericCurrentStreak >= numericTargetStreak;

    const handleHabitComplete = () => {
        if (isCompletedToday) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];
        const newStreak = (lastCompletedDate && lastCompletedDate !== yesterdayString) ? 1 : numericCurrentStreak + 1;
        
        setCurrentStreak(newStreak);
        setLastCompletedDate(today); 
    };

    const resetStreak = () => {
        setCurrentStreak(0);
        setLastCompletedDate('');
    };

    const accentColor = isGoalMet ? 'green' : 'indigo';
    const cardBgClass = isGoalMet ? 'bg-green-100 border-green-600' : 'bg-white border-indigo-500';
    const streakBgClass = isGoalMet ? 'bg-green-200 shadow-xl' : 'bg-indigo-100';
    const buttonBgClass = isCompletedToday && !isGoalMet ? 'bg-gray-400 cursor-not-allowed' : 
                        isGoalMet ? 'bg-green-600 hover:bg-green-700' : 
                        'bg-indigo-600 hover:bg-indigo-700';

    return (
        <div className="flex items-center justify-center min-h-screen p-4 font-['Inter']">
            
            <div className={`w-full max-w-md p-8 rounded-2xl border-4 ${cardBgClass} shadow-3xl transition duration-500 ease-in-out`}>
                
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-xl font-bold text-gray-700 truncate">{habitName}</h1>
                    <button onClick={() => setCurrentPage('setup')} className={`text-${accentColor}-600 hover:text-${accentColor}-800 transition transform hover:rotate-12`}>
                        <Settings className="w-6 h-6" />
                    </button>
                </div>

                <header className="text-center mb-8">
                    <p className="text-3xl font-extrabold text-gray-900 tracking-tight">Habit Progress</p>
                    <p className="text-sm text-gray-500 mt-2">Goal: {numericTargetStreak} Days</p>
                </header>

                <div className="grid grid-cols-2 gap-4 text-center mb-10">
                    <div className={`p-5 rounded-xl shadow-lg ${streakBgClass} border border-${accentColor}-300 transition duration-300 transform hover:scale-[1.05]`}>
                        <p className={`text-6xl font-black text-${accentColor}-700`}>{numericCurrentStreak}</p>
                        <p className="text-sm font-semibold text-gray-700 mt-2">Current Streak</p>
                    </div>
                    <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 shadow-inner">
                        <p className="text-6xl font-black text-gray-600">
                            {Math.max(0, numericTargetStreak - numericCurrentStreak)}
                        </p>
                        <p className="text-sm font-semibold text-gray-600 mt-2">Days To Go</p>
                    </div>
                </div>

                <div className="text-center mb-8">
                    {isGoalMet ? (
                        <p className="text-xl font-extrabold text-green-700 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 mr-2 animate-bounce" />
                            Goal Achieved! Keep going!
                        </p>
                    ) : isCompletedToday ? (
                        <p className="text-xl font-bold text-gray-500 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 mr-2" />
                            Logged for Today. See you tomorrow.
                        </p>
                    ) : (
                        <p className="text-xl font-bold text-indigo-700 flex items-center justify-center">
                            <Clock className="w-6 h-6 mr-2 animate-spin-slow" />
                            Time to Log Today's Habit
                        </p>
                    )}
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleHabitComplete}
                        disabled={isCompletedToday}
                        className={`w-full py-5 flex items-center justify-center font-extrabold text-xl rounded-xl shadow-2xl transition duration-300 transform hover:scale-[1.01] 
                            ${buttonBgClass} text-white`}
                    >
                        {isCompletedToday ? "Completed Today" : "Log Habit Completed"}
                    </button>

                    <button
                        onClick={resetStreak}
                        className="w-full py-3 flex items-center justify-center font-medium text-sm text-red-600 bg-red-100 rounded-xl hover:bg-red-200 transition duration-200 border border-red-300"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset Streak
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TrackerPage;
