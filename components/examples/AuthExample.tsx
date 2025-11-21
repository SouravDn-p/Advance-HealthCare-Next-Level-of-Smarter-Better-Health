"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LogoutButton from "@/components/LogoutButton";

export default function AuthExample() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Example of fetching user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated && user) {
        setLoadingProfile(true);
        // In a real app, you would fetch the profile data from your API
        // const profileData = await httpService.get('/auth/profile');
        // setProfile(profileData);
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <div className="p-4">
        <p>Loading authentication status...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4">
        <p>You are not authenticated. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          User Profile
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
            <p className="font-medium capitalize">{user?.role}</p>
          </div>
          
          {user?.avatar && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avatar</p>
              <img 
                src={user.avatar} 
                alt="User avatar" 
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          <LogoutButton className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700" />
        </div>
      </div>
      
      {loadingProfile ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <p>Loading profile data...</p>
        </div>
      ) : profile ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Profile Details
          </h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <p>No additional profile data available.</p>
        </div>
      )}
    </div>
  );
}