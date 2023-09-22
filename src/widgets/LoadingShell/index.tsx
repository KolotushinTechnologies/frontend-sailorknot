import React from "react"

const LoadingShell = () => {
  return (
    <div>
      <div
        role="status"
        className="max-w-lg animate-pulse space-y-6 transition-all">
        <div className="h-6 w-full max-w-sm rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-full max-w-[460px] rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-full max-w-[430px] rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-full max-w-[400px] rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 max-w-[460px] rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-full max-w-[460px] rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-full max-w-[430px] rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-full max-w-[400px] rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 max-w-[460px] rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default LoadingShell
