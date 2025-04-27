import React from "react";

const Login = () => {
  return (
    <>
      <button
        className={`inline-flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 bg-[linear-gradient(110deg,#f9fafb,45%,#f0f5f5,55%,#f9fafb)] 
 dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium transition-colors animate-[shimmer_2s_linear_infinite] cursor-pointer`}
      >
        Login
      </button>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 0%; }
          100% { background-position: -200% 0%; }
        }
      `}</style>
    </>
  );
};

export default Login;
