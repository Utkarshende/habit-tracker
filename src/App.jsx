import React,{ useState } from "react";
import TrackerPage from "./assets/TrackerPage.jsx";
import SetupPage from "./assets/SetupPage.jsx";

function App() {
    const [habitName, setHabitName] = useState("Daily Reading (30 min)");
    const [currentStreak, setCurrentStreak] = useState(5);
    const [targetStreak, setTargetStreak] = useState(30);
    const [lastCompletedDate, setLastCompletedDate] = useState('2025-10-28'); 
    
    const [currentPage, setCurrentPage] = useState('tracker');

    const commonProps = {
        habitName, setHabitName,
        currentStreak, setCurrentStreak,
        targetStreak, setTargetStreak,
        lastCompletedDate, setLastCompletedDate,
        setCurrentPage
    };

    let PageContent;

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
        <div className="
            min-h-screen 
            bg-linear-to-br from-indigo-50 to-purple-100 
            font-['Inter'] antialiased 
            flex items-center justify-center 
            p-4 sm:p-8 
        ">
            <div className="
                w-full max-w-lg 
                bg-white 
                shadow-2xl 
                rounded-2xl 
                p-6 sm:p-10 
                border border-gray-100
            ">
                {PageContent}
            </div>
        </div>
    );
};

export default App;