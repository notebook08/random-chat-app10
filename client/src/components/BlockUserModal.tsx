import { Button } from "./ui/button";

export default function BlockUserModal({ isOpen, onClose, onBlock }: {
  isOpen: boolean;
  onClose: () => void;
  onBlock: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-full max-w-xs flex flex-col items-center shadow-xl">
        <h2 className="text-lg font-bold text-rose-600 mb-4">Block this user?</h2>
        <p className="text-sm text-gray-700 mb-6 text-center">You won't be matched with this user again.</p>
        <div className="flex gap-2 w-full">
          <Button className="flex-1" variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="flex-1 bg-rose-500 text-white" onClick={onBlock}>Block</Button>
        </div>
      </div>
    </div>
  );
}
