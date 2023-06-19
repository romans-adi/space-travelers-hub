import './App.scss';
// import { Provider } from 'react-redux';
// import { createLogger } from 'redux-logger';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Provider } from 'react-redux';
import Rockets from './components/Rockets/Rockets';
import Profile from './components/Profile/Profile';
import Missions from './components/Missions/Missions';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
  // <Provider>
    <div className="wrapper">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Rockets />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  // </Provider>
  );
}

export default App;
