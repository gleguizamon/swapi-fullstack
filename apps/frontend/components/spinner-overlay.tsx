"use client";

export default function SpinnerOverlay() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="animate-spin">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </div>
    </div>
  );
}
