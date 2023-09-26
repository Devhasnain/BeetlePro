import React from 'react';
import '../app/Timer.css'

const CountDownSquare = ({ label, number, cardRef }:any) => {
  return (
    <div className="countdown__card">
      <div className="countdown__card__bg" ref={cardRef}>
        <div className="countdown__card__number" id={label}>
          {number}
        </div>
      </div>
    </div>
  );
};

export default CountDownSquare;