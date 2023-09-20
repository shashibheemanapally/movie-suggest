import { Route, Routes } from 'react-router-dom';
import './App.css';
import MovieSuggestions from './pages/MovieSuggestions';
import Home from './pages/Home';
import About from './pages/About';




function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path = '/' element = {<Home></Home>}></Route>
        <Route path = '/movie-seggestions/:movieId' element = {<MovieSuggestions></MovieSuggestions>}></Route>
        <Route path = '/about' element = {<About></About>}></Route>
    </Routes>
    </div>
    
  );
}

export default App;
