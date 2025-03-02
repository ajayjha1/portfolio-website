// components/CrossingLines.js

export const CrossingLines = () => {
    return (
      <div className="relative w-full">
        {/* Horizontal Line */}
        <div className="h-[0.1px] w-40 bg-gradient-to-r from-gray-900 via-purple-500 via-pink-600 to-gray-900 animate-draw-line absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-10"></div>
        {/* Vertical Line */}
        <div className="absolute h-20 w-[1px] -ml-10 bg-gradient-to-b from-gray-900 via-blue-600 via-pink-600 to-gray-900 animate-draw-line top-[-20px] transform -translate-x-1/2 z-10"></div>
      </div>
    );
  };
  