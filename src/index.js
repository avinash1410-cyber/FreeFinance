import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './tailwind.css';
import { DashboardProvider, DashboardContext } from './context/DashboardContext';
import { OptionsProvider, OptionsContext } from './context/OptionsContext';
import { ItemProvider } from './context/ItemContext';


ReactDOM.render(
  <React.StrictMode>
    <DashboardProvider>
      <OptionsProvider>
        <ItemProvider>
            <App />
        </ItemProvider>
      </OptionsProvider>   
    </DashboardProvider>
  </React.StrictMode>,
  document.getElementById('root')
);