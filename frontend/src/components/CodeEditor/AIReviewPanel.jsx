import { reviewCode } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AIReviewPanel = ({ isOpen, onClose }) => {
  const userCode = useSelector((state) => state.code.userCode);
  const room = useSelector((state) => state.room.room.roomDetails);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    const language = room?.language?.split(" ")[0]?.toLowerCase();

    if (!userCode?.trim() || !language) {
      toast.error("Write some code before asking for a review", {
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    const res = await reviewCode({
      code: userCode,
      language,
    });

    if (!res?.success) {
      toast.error(res?.message || "AI review failed", {
        autoClose: 3000,
      });
      setLoading(false);
      return;
    }

    setReview(res.review);
    setLoading(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute right-0 top-[8%] sm:top-[10%] z-30 flex h-[92%] sm:h-[90%] w-full justify-end bg-black/45">
      <div className="flex h-full w-full max-w-[460px] flex-col border-l border-slate-700 bg-[#121821] shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-cyan-500/15 p-2 text-cyan-300">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                AI Code Review
              </h2>
              <p className="text-xs text-slate-400">
                Powered by Groq for quick, actionable feedback
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Close AI review"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {review ? (
            <div className="whitespace-pre-wrap rounded-md border border-slate-700 bg-[#0f141c] p-4 text-sm leading-6 text-slate-200">
              {review}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-slate-300">
              <Sparkles className="text-cyan-300" size={34} />
              <div>
                <p className="font-medium text-white">
                  Review the code in your editor
                </p>
                <p className="mt-1 max-w-[320px] text-sm text-slate-400">
                  The review checks bugs, edge cases, quality, security, and
                  performance without changing your code.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-700 p-4">
          <Button
            onClick={handleReview}
            disabled={loading}
            className="w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400"
          >
            <Sparkles />
            {loading ? "Reviewing..." : review ? "Review Again" : "Review Code"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIReviewPanel;
