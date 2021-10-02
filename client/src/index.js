import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalContextProvider from './context/context';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient()
ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider> 
      <QueryClientProvider client = {queryClient}>
        <App />
      </QueryClientProvider>
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)