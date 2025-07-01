import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function GenderSelect() {
  const navigate = useNavigate();
  // If gender already selected, skip
  React.useEffect(() => {
    const gender = localStorage.getItem("ajnabicam_gender");
    if (gender) {
      navigate("/");
    }
  }, [navigate]);

  const handleSelect = (gender: string) => {
    localStorage.setItem("ajnabicam_gender", gender);
    navigate("/");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-pink-50 via-rose-100 to-fuchsia-100 px-4 py-6">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <h2 className="text-xl font-bold text-rose-600 mb-4 text-center">Select Your Gender</h2>
        <div className="flex flex-col gap-4 w-full">
          <Button className="w-full py-3 rounded-xl bg-rose-500 text-white font-bold text-base" onClick={() => handleSelect("female")}>Female</Button>
          <Button className="w-full py-3 rounded-xl bg-blue-500 text-white font-bold text-base" onClick={() => handleSelect("male")}>Male</Button>
          <Button className="w-full py-3 rounded-xl bg-gray-300 text-gray-700 font-bold text-base" onClick={() => handleSelect("other")}>Other</Button>
        </div>
      </div>
    </main>
  );
}
