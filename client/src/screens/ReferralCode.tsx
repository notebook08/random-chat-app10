import { useState } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

// Utility to generate a simple referral code (could be improved)
function generateReferralCode() {
  // Example: 6-char alphanumeric code
  return (
    Math.random().toString(36).substring(2, 8).toUpperCase() +
    Math.floor(Math.random() * 1000)
  );
}

export default function ReferralCodeScreen() {
  const [referralCode] = useState(() => {
    // Generate or retrieve user's referral code
    let code = localStorage.getItem("ajnabicam_referral_code");
    if (!code) {
      code = generateReferralCode();
      localStorage.setItem("ajnabicam_referral_code", code);
    }
    return code;
  });
  const [inputCode, setInputCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleApply = () => {
    if (!inputCode.trim()) return;
    // Prevent applying own code
    if (inputCode === referralCode) {
      setError("You cannot use your own referral code.");
      return;
    }
    // Mark as applied (simulate backend validation)
    localStorage.setItem("ajnabicam_referral_applied", inputCode);
    // Grant 24h premium
    const now = Date.now();
    const expiry = now + 24 * 60 * 60 * 1000;
    localStorage.setItem("ajnabicam_premium_trial", "true");
    localStorage.setItem("ajnabicam_premium_trial_expiry", expiry.toString());
    setApplied(true);
    setError("");
    setTimeout(() => navigate("/gender-select"), 1500);
  };

  const handleShare = (platform: string) => {
    const shareText = `Join me on AjnabiCam! Use my referral code: ${referralCode} to unlock 24h Premium. https://ajnabicam.com`;
    if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
    } else if (platform === "instagram") {
      window.open(`https://www.instagram.com/direct/new/?text=${encodeURIComponent(shareText)}`);
    } else if (platform === "sms") {
      window.open(`sms:?body=${encodeURIComponent(shareText)}`);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-pink-50 via-rose-100 to-fuchsia-100 px-4 py-6">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <h2 className="text-xl font-bold text-rose-600 mb-2 text-center">Invite Friends & Unlock Premium</h2>
        <div className="mb-4 w-full text-center">
          <div className="text-sm text-rose-500 mb-1">Your Referral Code</div>
          <div className="font-mono text-lg bg-rose-100 rounded-lg px-3 py-2 mb-2 select-all inline-block">{referralCode}</div>
          <div className="flex gap-2 justify-center mb-2">
            <Button size="sm" onClick={() => handleShare("whatsapp")}>WhatsApp</Button>
            <Button size="sm" onClick={() => handleShare("instagram")}>Instagram</Button>
            <Button size="sm" onClick={() => handleShare("sms")}>Message</Button>
          </div>
        </div>
        <div className="w-full mb-4">
          <label className="block text-xs text-rose-400 mb-1">Add Referral Code (optional)</label>
          <input
            type="text"
            className="w-full border border-rose-200 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
            placeholder="Paste or enter code"
            value={inputCode}
            onChange={e => setInputCode(e.target.value.toUpperCase())}
            disabled={applied}
          />
          <Button className="w-full py-2 rounded-lg bg-rose-500 text-white font-bold text-base" onClick={handleApply} disabled={applied || !inputCode.trim()}>
            {applied ? "Applied!" : "Apply Code"}
          </Button>
          {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
        </div>
        <Button className="w-full py-2 rounded-lg border border-rose-300 text-rose-600 bg-white font-semibold text-base" variant="outline" onClick={() => navigate("/gender-select")}>Continue</Button>
      </div>
    </main>
  );
}
