interface ProgressDotsProps {
  current: number;
  total?: number;
}

const ProgressDots = ({ current, total = 3 }: ProgressDotsProps) => (
  <div className="flex items-center gap-2 justify-center">
    {Array.from({ length: total }, (_, i) => (
      <span
        key={i}
        className={`inline-block w-2 h-2 rounded-full transition-colors duration-300 ${
          i < current ? "bg-accent" : "bg-border"
        }`}
      />
    ))}
  </div>
);

export default ProgressDots;
