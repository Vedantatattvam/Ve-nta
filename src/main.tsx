import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BharatiyaLipiProvider } from './context/BharatiyaLipiContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { AuthProofreadProvider } from './context/AuthProofreadContext.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <BharatiyaLipiProvider>
          <AuthProofreadProvider>
            <App />
          </AuthProofreadProvider>
        </BharatiyaLipiProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);


