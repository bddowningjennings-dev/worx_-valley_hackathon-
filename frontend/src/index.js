import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

document.addEventListener('keydown', (e) => {
  if (e.altKey && e.shiftKey && e.keyCode === 78) {
    document.getElementById('main-form').classList.toggle('hidden')
    document.getElementById('main-form').classList.toggle('no_margin')
  }
})


