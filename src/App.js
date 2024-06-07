import './App.css';
import Home from './pages/home';
import { NetworkProvider } from './utils/networkcontext';

function App() {
  return (
    <div>
      <NetworkProvider>
      <Home/>
      </NetworkProvider>
    </div>
  );
}

export default App;
