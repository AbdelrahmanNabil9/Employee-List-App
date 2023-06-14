import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { store } from './store';
import { createRoot } from 'react-dom/client';

const element = document.getElementById('root');
const root = createRoot(element!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);