import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthorizationContextProvider } from './store/authorization-context';
import { CollectionContextProvider } from './store/collection';
import { DataContextProvider } from './store/data-context';
import { StylesProvider } from '@material-ui/core/styles';
import { CommentContextProvider } from './store/comment-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StylesProvider injectFirst>
    <AuthorizationContextProvider>
      <CollectionContextProvider>
        <DataContextProvider>
          <CommentContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CommentContextProvider>
        </DataContextProvider>
      </CollectionContextProvider>
    </AuthorizationContextProvider>
  </StylesProvider>
);

reportWebVitals();
