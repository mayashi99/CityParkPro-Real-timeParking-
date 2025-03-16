// src/StepNavigationBar.js
import React, { useState } from 'react';
import '../styles/Navbar.css';
import logo from '../img/Cslot.png';
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

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="step-navigation-bar">
       <div className="logo">
        <div className="logoset">
       <img src={logo} alt="Slotlogo" className="Cslot" width={100} height={100}/>
       </div>
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
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentStep === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentStep === steps.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StepNavigationBar;