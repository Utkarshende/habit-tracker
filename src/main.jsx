import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css'
import App from './App.jsx'

const rootElement=createRoot(document.getElementById('root'));
rootElement.render(
<div>
    <App/>
</div>
)
