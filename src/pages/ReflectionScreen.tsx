import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressDots from "@/components/ProgressDots";
import TopBar from "@/components/TopBar";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import { saveEntry } from "@/lib/circleStore";

interface ReflectionScreenProps {
  names: Record<string, string>;
  onReset: () => void;
}

const ReflectionScreen = ({ names, onReset }: ReflectionScreenProps) => {
  const navigate = useNavigate();
  const [reflection, setReflection] = useState("");

  const handleSave = () => {
    saveEntry({ names, reflection });
    onReset();
    navigate("/history");
  };

  const handleFinish = () => {
    onReset();
    navigate("/intro");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <BackgroundOrbs />
      <TopBar onBack={() => navigate("/circle")} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 flex flex-col items-center px-6 pb-8 text-center relative z-10"
      >
        <ProgressDots current={3} />

        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-3xl mt-4 mb-2"
        >
          🪞
        </motion.span>

        <h2 className="text-xl font-semibold text-foreground mt-2 mb-4">
          What Do You Notice?
        </h2>

        <div className="text-sm text-muted-foreground leading-relaxed max-w-xs space-y-3 mb-6">
          <p>Take a moment to look at your circle. You might notice:</p>
          <ul className="text-left space-y-1.5 pl-2">
            <li>🔹 Some people feel closer than others</li>
            <li>💙 Some connections feel strong</li>
            <li>🌫️ Some feel distant or unclear</li>
            <li>🕊️ There may be gaps — or just a few meaningful people</li>
          </ul>
          <p>
            There's no need to change anything right now. This is simply about
            becoming aware of your current support system. 🧘
          </p>
        </div>

        <div className="w-full max-w-xs">
          <label className="text-xs text-muted-foreground block mb-2">
            💭 Is there anyone you'd like to feel more connected to?
          </label>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Optional…"
            rows={3}
            className="w-full bg-secondary/80 backdrop-blur-sm rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 resize-none border border-border/50"
          />
        </div>

        <p className="text-xs text-muted-foreground mt-4 italic">
          🌱 Awareness is a first step, not a pressure to act.
        </p>

        <div className="flex flex-col gap-3 mt-8 w-full max-w-xs">
          <button
            onClick={handleSave}
            className="bg-primary text-primary-foreground font-medium py-3 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200"
          >
            💾 Save
          </button>
          <button
            onClick={handleFinish}
            className="bg-secondary text-foreground font-medium py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Finish
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ReflectionScreen;
