import { Route, Routes } from 'react-router-dom';
import './App.css';
import MovieSuggestions from './pages/MovieSuggestions';
import Home from './pages/Home';




function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path = '/' element = {<Home></Home>}></Route>
        <Route path = '/movie-seggestions' element = {<MovieSuggestions></MovieSuggestions>}></Route>
    </Routes>
    </div>
    
  );
}

export default App;
