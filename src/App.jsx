import React,{ useState } from "react";
import TrackerPage from "./assets/TrackerPage";
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
        setCurrentPage
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
