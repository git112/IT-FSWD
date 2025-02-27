import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Counter: {count}</h1>
      <button style={styles.button} onClick={() => setCount(count + 1)}>+</button>
      <button style={styles.button} onClick={() => setCount(count - 1)}>-</button>
      <button style={styles.button} onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '200px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  button:{
    padding: '10px 20px',
    margin: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  }
}

export default Counter;