// src/StepNavigationBar.js
import React, { useState } from 'react';
import '../styles/Navbar.css';
 // We'll create this in the next step

const StepNavigationBar = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: 'Step 1' },
    { id: 2, label: 'Step 2' },
    { id: 3, label: 'Step 3' },
    { id: 4, label: 'Step 4' },
    { id: 5, label: 'Step 5' },
  ];

  return (
    <div className='body'>
    <div className="step-navigation-bar">
       <div className="logo">
        
      <div className="steps">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`step ${currentStep === step.id ? 'active' : ''}`}
          >
            {step.label}
          </div>
         
        ))}
      </div>
      </div>
      </div>
      </div>
  );
};

export default StepNavigationBar;