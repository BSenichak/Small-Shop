import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<div>Main page</div>}></Route>
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
