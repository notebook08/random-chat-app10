import { useState } from "react";
import { Button } from "./ui/button";

const REASONS = [
  "Is a creep",
  "Spam",
  "Nudity",
  "Harassment",
  "Fake profile",
  "Other"
];

export default function ReportUserModal({ isOpen, onClose, onSubmit }: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}) {
  const [selected, setSelected] = useState<string>("");
  const [other, setOther] = useState<string>("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-full max-w-xs flex flex-col items-center shadow-xl">
        <h2 className="text-lg font-bold text-rose-600 mb-4">Report this user</h2>
        <div className="flex flex-col gap-2 w-full mb-4">
          {REASONS.map((reason) => (
            <label key={reason} className="flex items-center gap-2">
              <input
                type="radio"
                name="report-reason"
                value={reason}
                checked={selected === reason}
                onChange={() => setSelected(reason)}
              />
              <span>{reason}</span>
            </label>
          ))}
          {selected === "Other" && (
            <textarea
              className="w-full border rounded p-2 mt-2 text-sm"
              placeholder="Describe the issue..."
              value={other}
              onChange={e => setOther(e.target.value)}
              rows={2}
            />
          )}
        </div>
        <div className="flex gap-2 w-full">
          <Button className="flex-1" variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            className="flex-1 bg-rose-500 text-white"
            disabled={!selected || (selected === "Other" && !other.trim())}
            onClick={() => {
              onSubmit(selected === "Other" ? other : selected);
              setSelected("");
              setOther("");
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
