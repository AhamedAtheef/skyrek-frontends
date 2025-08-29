

export default function LoadingDots() {
  return (
    <div className="flex justify-center items-center gap-1">
      <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
    </div>
  );
}
