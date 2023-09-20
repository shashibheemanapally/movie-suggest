import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MoviePoster from "./components/MoviePoster";
import DispayMovieList from "./components/DispayMovieList";
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { movieSuggestEngineApiHost } from "./Constants";


function MovieSuggestions() {
  
    let params = useParams()
    
    const [movieData, setMovieData] = useState({
      selectedMovie: { imdb_id: '', tags: [] },
      similarMovies: [],
    });
  
    useEffect(() => {
      const apiUrl = `${movieSuggestEngineApiHost}/similar-movies?movie_id=${params.movieId}`;
  
      async function fetchMovieData() {
        try {
          const response = await axios.get(apiUrl);
  
          const { imdb_id, tags } = response.data.selectedMovie;
          const similarMovies = response.data.similarMovies;
  
          setMovieData({
            selectedMovie: { imdb_id, tags },
            similarMovies: similarMovies,
          });
        } catch (error) {
          console.error('Error fetching movie data from api:', error);
        }
      }

      fetchMovieData();
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }, [params.movieId]);

    const navigate = useNavigate()
    const redirectToHome = () => {
        navigate('/');
    };
    const redirectToAbout = () => {
      navigate('/about');
    };

    return (
      <motion.div 
      initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="logo-div clickable-item" onClick={()=>{redirectToHome()}}>
            <span className="material-symbols-outlined">movie</span>
            <h3>MovieSuggest</h3>
        </div>
        <MoviePoster movie={movieData.selectedMovie}></MoviePoster>
        <div className="movie-list-with-heading-div">
            <DispayMovieList heading={"People who liked this movie also liked:"} movieList={movieData.similarMovies}></DispayMovieList>
        </div>   
        <div className="about-button-div"><h2 className="clickable-item" onClick={()=>{redirectToAbout()}}>About...</h2></div> 
      </motion.div>
    );
  }
  
export default MovieSuggestions;