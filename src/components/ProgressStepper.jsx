// components/ProgressStepper.jsx
import React from 'react';

function ProgressStepper({ currentStep }) {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-3xl">
            {/* Progress bar */}
            <div className="absolute top-1/2 left-10 right-10 h-1 bg-gray-200 -translate-y-1/2"></div>
            
            {/* Active progress bar */}
            <div 
              className="absolute top-1/2 left-10 h-1 bg-teal-600 -translate-y-1/2 transition-all duration-300 ease-in-out"
              style={{ 
                width: currentStep === 1 ? '0%' : 
                       currentStep === 2 ? '33%' : 
                       currentStep === 3 ? '66%' : 
                       currentStep === 4 ? '100%' : '0%' 
              }}
            ></div>
            
            {/* Steps */}
            <div className="relative flex justify-between w-full mx-auto px-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-sm
                  ${currentStep >= 1 ? 'bg-teal-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                  1
                </div>
                <span className={`mt-3 text-sm font-medium ${currentStep >= 1 ? 'text-teal-600' : 'text-gray-500'}`}>Info</span>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-sm
                  ${currentStep >= 2 ? 'bg-teal-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                  2
                </div>
                <span className={`mt-3 text-sm font-medium ${currentStep >= 2 ? 'text-teal-600' : 'text-gray-500'}`}>Upload</span>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-sm
                  ${currentStep >= 3 ? 'bg-teal-600 text-white font-bold' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                  3
                </div>
                <span className={`mt-3 text-sm font-medium ${currentStep >= 3 ? 'text-teal-600' : 'text-gray-500'}`}>Analysis</span>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-sm
                  ${currentStep >= 4 ? 'bg-teal-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                  4
                </div>
                <span className={`mt-3 text-sm font-medium ${currentStep >= 4 ? 'text-teal-600' : 'text-gray-500'}`}>Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressStepper;