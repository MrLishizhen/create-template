import '@/mock/index';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@/redux/store';

import './index.css';
import { BrowserRouter } from 'react-router';
import RouterView from '@/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RouterView />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
