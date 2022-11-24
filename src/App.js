import './Styles/App.css';
import Login from './Login/Login';
import Register from './Register/Register';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './MainPage/MainPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
