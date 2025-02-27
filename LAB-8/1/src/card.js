import React from 'react';
import './App.css'; // Import the CSS file

const Card = () => {
  return (
    <div className="card">
      <h1 className="card-title">Cristiano Ronaldo</h1>
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg" 
        alt="Cristiano Ronaldo" 
        className="card-img"
      />
      <p className="card-text">
        An instant sensation, Ronaldo came to be regarded as one of football’s best forwards. 
        His finest season with United came in 2007–08, when he scored 42 League and Cup goals 
        and earned the Golden Shoe award as Europe’s leading scorer, with 31 League goals.
      </p>
    </div>
  );
}

export default Card;
