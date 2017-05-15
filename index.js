import React,{Component} from 'React';
import App from './components/App';
import ReactDOM from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


ReactDOM.render(
    <App />,
    document.getElementById('root')
);