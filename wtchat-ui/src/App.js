import './styles/App.css';
import Login from './pages/Login';
import Chatroom from './pages/Chatroom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/chat" element={<Chatroom/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
