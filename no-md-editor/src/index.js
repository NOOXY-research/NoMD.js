import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NoMDEditor from './NoMDEditor';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NoMDEditor />, document.getElementById('root'));
registerServiceWorker();
