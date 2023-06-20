import './App.scss';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './store';
import Rockets from './views/Rockets/Rockets';
import Profile from './views/Profile/Profile';
import Missions from './views/Missions/Missions';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
