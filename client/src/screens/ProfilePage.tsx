import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BottomNavBar from '../components/BottomNavBar';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for user data
  const [username, setUsername] = useState<string>('JohnDoe'); // Example username
  const [profileImage, setProfileImage] = useState<string | null>(null); // For image preview
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);

  // Static referral ID for demonstration
  const referralId = 'AJNABICAM12345';

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click(); // Programmatically click the hidden file input
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      // In a real application, you would upload this file to a server
      console.log('Selected file:', file.name);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleUsernameSave = () => {
    setIsEditingUsername(false);
    // In a real application, you would send the updated username to a server
    console.log('Username updated to:', username);
  };

  return (
    <>
      <Helmet>
        <title>AjnabiCam - Profile</title>
      </Helmet>
      <main className="flex flex-col items-center min-h-screen w-full bg-pink-50 px-2 py-4 relative pb-16">
        {/* Header */}
        <div className="w-full max-w-md flex items-center p-4 bg-pink-200 text-pink-900 font-bold text-xl rounded-t-2xl shadow-md">
          <button onClick={handleBackClick} className="mr-3 text-pink-700 font-bold text-xl">&larr;</button>
          <h1 className="flex-grow text-center">Profile</h1>
        </div>

        <div className="w-full max-w-md flex flex-col items-center bg-white p-4 rounded-b-2xl border border-pink-100 shadow-xl mb-4">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div
              className="w-32 h-32 rounded-full bg-pink-100 flex justify-center items-center overflow-hidden cursor-pointer border-4 border-pink-400 shadow-lg"
              onClick={handleImageUploadClick}
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <div className="text-pink-600 text-sm font-medium text-center">Upload Image</div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button
              onClick={handleImageUploadClick}
              className="bg-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-pink-600 transition-colors"
            >
              {profileImage ? 'Change Image' : 'Upload Image'}
            </button>
          </div>

          {/* Profile Detail Section */}
          <div className="w-full space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="font-semibold text-pink-800 text-lg">Username:</label>
              {isEditingUsername ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="flex-grow px-4 py-2 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                  <button
                    onClick={handleUsernameSave}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="flex-grow px-4 py-2 rounded-lg bg-pink-50 text-pink-800 font-medium border border-pink-100">
                    {username}
                  </span>
                  <button
                    onClick={() => setIsEditingUsername(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-pink-800 text-lg">Your Referral ID:</label>
              <div className="flex items-center bg-pink-100 border border-pink-300 rounded-lg p-3 gap-3">
                <span className="flex-grow font-mono text-pink-700 text-base font-bold">{referralId}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(referralId)}
                  className="bg-pink-400 text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-pink-500 transition-colors"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-pink-600 text-center bg-pink-50 border border-pink-100 rounded-lg p-3 mt-2">
                Refer one friend successfully to automatically unlock premium features!
              </p>
            </div>
          </div>
        </div>
        <BottomNavBar />
      </main>
    </>
  );
};

export default ProfilePage;