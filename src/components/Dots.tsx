export default function Dots() {
  return (
    <span className="flex items-center gap-1">
      <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
    </span>
  );
}