import './App.css';
import Home from './pages/home';
import { NetworkProvider } from './utils/networkcontext';

import { ThemeProvider } from '@material-tailwind/react';

function App() {
  return (
    <div >
      <NetworkProvider>
        <ThemeProvider>
        <Home/>
        </ThemeProvider>
      </NetworkProvider>
    </div>
  );
}

export default App;
