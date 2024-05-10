import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-t-8 border-b-8 border-gray-200"></div>
    </div>
  );
};

export default Loader;
