import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// React.StrictMode > https://stackoverflow.com/a/71982736/19702913 
// Removed "React.StrictMode" because make double calls to the api with useEffect()

root.render(<App />);