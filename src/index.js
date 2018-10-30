import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// 랜더한다 <App /> 를 , root라는 아이디를 가진 엘리먼트에.
// DOM = Document Object Model 
// react는 UI라이브러리
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
