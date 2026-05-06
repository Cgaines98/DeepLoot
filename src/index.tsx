import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-mockfield.us.auth0.com"
      clientId="KruLIQfqxnjbtKOfYrvuwGQO70BMikQV"
      authorizationParams={{ 
        redirect_uri: window.location.origin,
        audience: "https://api.mockfield.com"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
