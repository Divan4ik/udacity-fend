import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/normalize.css'
import './styles/utils.css'
import './styles/theme.css'
import './styles/popup.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
