import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import { GenresProvider } from './components/GenresContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GenresProvider>
      <App />
    </GenresProvider>
  </StrictMode>
);
