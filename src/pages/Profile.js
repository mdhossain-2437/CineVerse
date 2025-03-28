// Protected Profile Page (src/pages/Profile.js)
import React from "react";
import { auth, signOut } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
	const navigate = useNavigate();

	const handleLogout = async () => {
		await signOut(auth);
		navigate("/");
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
			<h1 className="text-3xl">Welcome to Your Profile</h1>
			<button onClick={handleLogout} className="bg-red-600 px-4 py-2 mt-4">
				Logout
			</button>
		</div>
	);
}

export default Profile;


// User Profile Page (src/pages/Profile.js)
import React, { useEffect, useState } from "react";
import { auth } from "../api/auth";
import { db } from "../api/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate("/login");
        return;
      }
      setUser(currentUser);
      setDisplayName(currentUser.displayName || "");
    };
    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        displayName,
      });
      await user.updateProfile({ displayName });
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">User Profile</h1>
      {user && (
        <div className="mb-6">
          <p><strong>Email:</strong> {user.email}</p>
          <label className="block text-lg mt-4">Display Name:</label>
          <input
            type="text"
            className="p-2 text-black rounded"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <button
            onClick={handleUpdateProfile}
            className="mt-4 bg-red-600 px-6 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;


