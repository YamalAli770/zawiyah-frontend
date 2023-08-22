import React from 'react';

const OrderProgressBar = ({ status }) => {
  const steps = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
  const currentStepIndex = steps.indexOf(status);

  return (
    <div className="w-full">
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 mb-4 text-s flex rounded bg-gray-300">
          <div style={{ width: `${(currentStepIndex + 1) / steps.length * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-blue-500"></div>
        </div>
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className={`text-s ${index <= currentStepIndex ? 'font-semibold text-blue-500' : 'text-white'}`}>
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderProgressBar;
