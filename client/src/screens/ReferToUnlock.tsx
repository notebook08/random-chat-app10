import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ReferToUnlock() {
  const [referred, setReferred] = useState(false);
  const navigate = useNavigate();

  const handleShare = () => {
    // Simulate sharing (replace with real share logic if needed)
    setReferred(true);
    // Grant 24h premium
    const now = Date.now();
    const expiry = now + 24 * 60 * 60 * 1000;
    localStorage.setItem("ajnabicam_premium_trial", "true");
    localStorage.setItem("ajnabicam_premium_trial_expiry", expiry.toString());
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-green-50 via-rose-100 to-rose-200 px-4 py-6">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <h2 className="text-xl font-bold text-rose-600 mb-4 text-center">Unlock Premium for 24 Hours!</h2>
        <p className="text-base text-rose-500 mb-6 text-center font-semibold">
          Refer AjnabiCam to <span className="text-green-600 font-bold">1 friend</span> and get <span className="text-yellow-500 font-bold">24 hours</span> of premium features for free!
        </p>
        {!referred ? (
          <Button className="w-full py-3 rounded-xl bg-green-500 text-white font-bold text-base mb-2" onClick={handleShare}>
            Refer to a Friend
          </Button>
        ) : (
          <div className="w-full text-center text-green-600 font-semibold mb-2">Referral successful! Enjoy your 24h premium 🎉</div>
        )}
        <Button className="w-full py-3 rounded-xl border border-rose-300 text-rose-600 bg-white font-semibold text-base" variant="outline" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </main>
  );
}
