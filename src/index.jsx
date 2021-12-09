import React from 'react'
import ReactDOM from 'react-dom'
import './main.css'
import App from './example/index'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)