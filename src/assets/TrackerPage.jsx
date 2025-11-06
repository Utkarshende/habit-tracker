import React from 'react';
import { RefreshCw, TrendingUp, CheckCircle, Clock, Settings, Zap } from 'lucide-react';

const getTodayDateString = () => {
    return new Date().toISOString().split('T')[0];
};

function TrackerPage({ habitName, currentStreak, targetStreak, lastCompletedDate, setCurrentStreak, setLastCompletedDate, setCurrentPage }) {
    const today = getTodayDateString();

    const numericCurrentStreak = Number(currentStreak) || 0;
    const numericTargetStreak = Number(targetStreak) || 0;
    
    const isCompletedToday = lastCompletedDate === today;
    const isGoalMet = numericCurrentStreak >= numericTargetStreak && numericTargetStreak > 0;

    const handleHabitComplete = () => {
        if (isCompletedToday) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];
        
        const newStreak = (lastCompletedDate === yesterdayString || numericCurrentStreak === 0) ? numericCurrentStreak + 1 : 1;
        
        setCurrentStreak(newStreak);
        setLastCompletedDate(today); 
    };

    const resetStreak = () => {
        setCurrentStreak(0);
        setLastCompletedDate('');
    };

    const accentColor = isGoalMet ? 'green' : 'indigo';
    
    const streakBgClass = isGoalMet 
        ? 'bg-green-50 text-green-700 ring-4 ring-offset-2 ring-green-300 shadow-xl shadow-green-500/30' 
        : 'bg-indigo-50 text-indigo-700 ring-4 ring-offset-2 ring-indigo-300 shadow-xl shadow-indigo-500/30'; 
        
    const buttonBgClass = isCompletedToday 
        ? 'bg-gray-300 text-gray-600 cursor-not-allowed shadow-inner border-t-2 border-gray-400' 
        : isGoalMet 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-xl shadow-green-500/50' 
            : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-xl shadow-indigo-500/50';

    return (
        <div className="p-2 transition duration-500 ease-in-out">
            
            <div className="flex justify-between items-start mb-8 border-b pb-3 border-indigo-100">
                <h1 className="text-2xl font-black text-gray-800 truncate leading-tight tracking-tight">{habitName}</h1> 
                <button 
                    onClick={() => setCurrentPage('setup')} 
                    className={`text-${accentColor}-600 p-1 rounded-full hover:bg-${accentColor}-100 transition duration-300 transform hover:scale-110 focus:ring-4 focus:ring-${accentColor}-300/50 focus:outline-none`}
                    aria-label="Settings"
                >
                    <Settings className="w-6 h-6" /> 
                </button>
            </div>

            <header className="text-center mb-10"> 
                <p className="text-base font-semibold text-gray-500 tracking-wider uppercase">Target Goal</p>
                <p className={`text-5xl font-extrabold text-${accentColor}-600 tracking-wider mt-1 animate-bounce transition-colors duration-500`}>
                    {numericTargetStreak} Days
                </p>
                {isGoalMet && (
                    <p className="text-xs font-medium text-green-500 mt-2 flex items-center justify-center">
                        <Zap className="w-3 h-3 mr-1" /> Target Smashed! Keep it going. 
                    </p>
                )}
            </header>

            <div className="grid grid-cols-2 gap-4 text-center mb-10">
                
                <div className={`p-5 rounded-2xl ${streakBgClass} transition duration-500 transform hover:scale-[1.03] active:scale-[1.01] cursor-default`}>
                    <p className={`text-6xl sm:text-7xl font-black transition-all duration-500`}>
                        {numericCurrentStreak}
                    </p>
                    <p className="text-sm font-extrabold text-gray-800 mt-2 uppercase tracking-wider">Current Streak</p> 
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 border-4 border-gray-200 shadow-lg shadow-gray-200/50 flex flex-col justify-center transition duration-500">
                    <p className="text-6xl sm:text-7xl font-black text-gray-500">
                        {Math.max(0, numericTargetStreak - numericCurrentStreak)}
                    </p>
                    <p className="text-sm font-extrabold text-gray-600 mt-2 uppercase tracking-wider">Days To Go</p>
                </div>
            </div>

            <div className="text-center mb-8 p-3 rounded-xl bg-white shadow-xl border-t-6 border-b-6 border-gray-100"> 
                {isGoalMet ? (
                    <p className="text-xl font-black text-green-700 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 mr-3 text-green-500" />
                        EPIC WIN! Goal Achieved.
                    </p>
                ) : isCompletedToday ? (
                    <p className="text-xl font-bold text-gray-500 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                        Habit Logged. Done for Today.
                    </p>
                ) : (
                    <p className="text-xl font-bold text-indigo-700 flex items-center justify-center">
                        <Clock className="w-6 h-6 mr-3 text-indigo-500" />
                        Ready to make progress? Log it!
                    </p>
                )}
            </div>

            <div className="space-y-3"> 
                <button
                    onClick={handleHabitComplete}
                    disabled={isCompletedToday}
                    className={`w-full py-5 flex items-center justify-center font-black text-2xl rounded-2xl transition duration-300 
                        transform hover:scale-[1.01] active:scale-[0.97]
                        ${buttonBgClass} text-white uppercase tracking-wider`}
                >
                    {isCompletedToday ? (
                        <>
                            <CheckCircle className="w-7 h-7 mr-3" /> DONE FOR TODAY
                        </>
                    ) : (
                        <>
                            <TrendingUp className="w-7 h-7 mr-3" /> LOG HABIT COMPLETED
                        </>
                    )}
                </button>

                <button
                    onClick={resetStreak}
                    className="w-full py-2.5 flex items-center justify-center font-semibold text-sm text-red-700 bg-red-50 rounded-xl 
                        hover:bg-red-100 transition duration-200 border border-red-300 shadow-md hover:shadow-lg hover:text-red-800"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Streak (Warning: This resets your count)
                </button>
            </div>
        </div>
    );
}

export default TrackerPage;