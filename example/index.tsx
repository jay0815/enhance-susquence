import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const container = document.getElementById('root');
// react 18 以上版本
// const root = ReactDOM.createRoot(container);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
// react 17 及以下版本
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  ,container);
