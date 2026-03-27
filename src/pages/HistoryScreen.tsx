import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/TopBar";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import { getEntries, PROMPTS, type CircleEntry } from "@/lib/circleStore";
import { X } from "lucide-react";
import { format } from "date-fns";

const BUBBLE_EMOJIS = ["💬", "🤗", "💪", "🎉", "🌟"];

const HistoryScreen = () => {
  const navigate = useNavigate();
  const entries = useMemo(() => getEntries(), []);
  const [selectedEntry, setSelectedEntry] = useState<CircleEntry | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <BackgroundOrbs />
      <TopBar onBack={() => navigate("/intro")} />

      <div className="flex-1 px-6 pb-8 relative z-10">
        <h2 className="text-xl font-semibold text-foreground text-center mb-6">
          📖 Past Entries
        </h2>

        {entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <span className="text-4xl block mb-4">📭</span>
            <p className="text-sm text-muted-foreground">
              No entries yet. Your saved circles will appear here.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3 max-w-sm mx-auto">
            {entries.map((entry, i) => {
              const namesList = Object.values(entry.names);
              return (
                <motion.button
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedEntry(entry)}
                  className="w-full bg-secondary/70 backdrop-blur-sm rounded-2xl p-4 text-left hover:shadow-md hover:bg-secondary transition-all border border-border/40"
                >
                  <p className="text-xs text-muted-foreground mb-1">
                    📅 {format(new Date(entry.date), "MMM d, yyyy · h:mm a")}
                  </p>
                  <p className="text-sm text-foreground">
                    {namesList.length > 0
                      ? namesList.join(", ")
                      : "No names added"}
                  </p>
                  {entry.reflection && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      💭 {entry.reflection}
                    </p>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-end justify-center z-50"
            onClick={() => setSelectedEntry(null)}
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
                  📅 {format(new Date(selectedEntry.date), "MMM d, yyyy")}
                </h3>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-3">
                {PROMPTS.map((prompt, i) => {
                  const name = selectedEntry.names[String(i)];
                  return (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-sm mt-0.5">{BUBBLE_EMOJIS[i]}</span>
                      <div>
                        <p className="text-sm text-foreground">
                          {name || "—"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {prompt}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedEntry.reflection && (
                <div className="mt-4 p-3 bg-secondary rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">
                    💭 Reflection
                  </p>
                  <p className="text-sm text-foreground">
                    {selectedEntry.reflection}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryScreen;
