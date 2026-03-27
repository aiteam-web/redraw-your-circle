import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/TopBar";
import ProgressDots from "@/components/ProgressDots";
import { PROMPTS } from "@/lib/circleStore";
import { Info, X } from "lucide-react";

const BUBBLE_COLORS = [
  "bg-bubble-1",
  "bg-bubble-2",
  "bg-bubble-3",
  "bg-bubble-4",
  "bg-bubble-5",
];

// Positions for 5 bubbles around center (angles in degrees, radius %)
const POSITIONS = [
  { angle: -90, r: 110 },
  { angle: -18, r: 110 },
  { angle: 54, r: 110 },
  { angle: 126, r: 110 },
  { angle: 198, r: 110 },
];

function getPos(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

interface CircleScreenProps {
  names: Record<string, string>;
  onNamesChange: (names: Record<string, string>) => void;
}

const CircleScreen = ({ names, onNamesChange }: CircleScreenProps) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleBubbleTap = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setInputValue(names[String(index)] || "");
    },
    [names]
  );

  const handleSave = useCallback(() => {
    if (activeIndex === null) return;
    const trimmed = inputValue.trim();
    const updated = { ...names };
    if (trimmed) {
      updated[String(activeIndex)] = trimmed;
    } else {
      delete updated[String(activeIndex)];
    }
    onNamesChange(updated);
    setActiveIndex(null);
    setInputValue("");
  }, [activeIndex, inputValue, names, onNamesChange]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar onBack={() => navigate("/intro")} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex flex-col items-center px-6 pb-8"
      >
        <ProgressDots current={2} />

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2 text-center">
          Who's In Your Circle Right Now?
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-xs mb-2">
          Think about the people in your life and where they show up for you.
        </p>

        {/* Instruction bar */}
        <div className="bg-secondary rounded-2xl px-4 py-2.5 flex items-center gap-2 max-w-xs mb-6">
          <Info className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-xs text-muted-foreground">
            Tap each bubble and add someone who fits that space in your life.
          </span>
        </div>

        {/* Circle container */}
        <div className="relative w-72 h-72 mx-auto">
          {/* Center node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center z-10">
            <span className="text-sm font-semibold text-primary-foreground">You</span>
          </div>

          {/* Floating bubbles */}
          {PROMPTS.map((prompt, i) => {
            const { x, y } = getPos(POSITIONS[i].angle, POSITIONS[i].r);
            const hasName = !!names[String(i)];

            return (
              <motion.button
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: x + Math.sin(Date.now() / 3000 + i * 1.2) * 0,
                  y: y + Math.cos(Date.now() / 3000 + i * 1.2) * 0,
                }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBubbleTap(i)}
                className={`absolute top-1/2 left-1/2 -ml-[38px] -mt-[38px] w-[76px] h-[76px] rounded-full flex items-center justify-center text-center p-2 transition-shadow ${
                  BUBBLE_COLORS[i]
                } ${
                  hasName
                    ? "shadow-md ring-2 ring-accent/30"
                    : "shadow-sm opacity-80"
                }`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                aria-label={prompt}
              >
                <span className="text-[10px] leading-tight text-foreground font-medium">
                  {hasName ? names[String(i)] : prompt.split(" ").slice(0, 3).join(" ") + "…"}
                </span>
              </motion.button>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground mt-6 italic text-center">
          It's okay if your circle feels small.
        </p>

        <button
          onClick={() => navigate("/reflection")}
          className="mt-8 bg-accent text-accent-foreground font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Continue →
        </button>
      </motion.div>

      {/* Input Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-end justify-center z-50"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-t-3xl w-full max-w-md p-6 pb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground">
                  Add a name
                </h3>
                <button
                  onClick={() => setActiveIndex(null)}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                {PROMPTS[activeIndex]}
              </p>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                placeholder="Enter a name…"
                autoFocus
                className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button
                onClick={handleSave}
                className="mt-4 w-full bg-accent text-accent-foreground font-medium py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Save
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CircleScreen;
