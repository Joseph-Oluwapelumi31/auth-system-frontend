import Dots from "./Dots.jsx";

function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full max-w-80 cursor-pointer h-15 flex items-center justify-center bg-violet-600 text-white font-semibold rounded-sm
        hover:bg-violet-500
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          {children}
          <Dots />
        </span>
      ) : (
        children
      )}
    </button>
  );
}
export default SubmitButton;