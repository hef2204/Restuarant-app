import React from 'react';

interface AdminDashboardProps {
    username: string;
    // Add any other props that you need
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ username }) => {
    return (
        <div>
            <h1>Welcome, {username}!</h1>
            <div>
                <h2>Your Profile</h2>
                {/* Display the user's profile information here */}
            </div>
            <div>
                <h2>Your Activity</h2>
                {/* Display the user's activity or other data here */}
            </div>
            <button>Logout</button>
        </div>
    );
};

export default AdminDashboard;