interface ProgressDotsProps {
  current: number;
  total?: number;
}

const DOT_COLORS = [
  "bg-primary",
  "bg-[hsl(198,50%,68%)]",
  "bg-[hsl(340,45%,72%)]",
];

const ProgressDots = ({ current, total = 3 }: ProgressDotsProps) => (
  <div className="flex items-center gap-2 justify-center">
    {Array.from({ length: total }, (_, i) => (
      <span
        key={i}
        className={`inline-block rounded-full transition-all duration-300 ${
          i < current
            ? `w-2.5 h-2.5 ${DOT_COLORS[i % DOT_COLORS.length]} shadow-sm`
            : "w-2 h-2 bg-border"
        }`}
      />
    ))}
  </div>
);

export default ProgressDots;
