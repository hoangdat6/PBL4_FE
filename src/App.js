import React from 'react';

import "./assets/statics/bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/common.css";
import "./styles/css/main.css";
import "./styles/css/typograply.css";
import './styles/scss/main.scss';
import './assets/font-awesome-6-pro/font-awesome-6-pro/css/all.min.css';
import MainPage from "./pages/MainPage";

function App() {
  return (
      <div className="App">
          <MainPage/>
      </div>
  );
}

export default App;
