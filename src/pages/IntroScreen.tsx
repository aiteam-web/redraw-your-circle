import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import ProgressDots from "@/components/ProgressDots";

const IntroScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar onBack={() => navigate("/")} showHistory />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 flex flex-col items-center justify-center px-6 pb-8 text-center"
      >
        <ProgressDots current={1} />

        <h1 className="text-2xl font-semibold text-foreground mt-8 mb-4 leading-tight">
          Redraw Your Circle
        </h1>

        <div className="text-muted-foreground text-sm leading-relaxed max-w-xs space-y-3">
          <p>
            At different points in life, our support system can shift.
            Sometimes we feel connected and supported. Other times, things may
            feel distant or unclear.
          </p>
          <p>
            This activity is a space to pause and look at the people around you
            — and understand who currently feels part of your circle.
          </p>
          <p>There's no right or wrong here. Just awareness.</p>
        </div>

        <p className="text-xs text-muted-foreground mt-6 italic">
          Your circle can change — and that's okay.
        </p>

        <button
          onClick={() => navigate("/circle")}
          className="mt-10 bg-primary text-primary-foreground font-medium px-8 py-3 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200"
        >
          Start →
        </button>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
