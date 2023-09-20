import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MoviePoster from "./components/MoviePoster";
import DispayMovieList from "./components/DispayMovieList";
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";


function MovieSuggestions() {
  
    let params = useParams()
    
    const [movieData, setMovieData] = useState({
      selectedMovie: { imdb_id: '', tags: [] },
      similarMovies: [],
    });
  
    useEffect(() => {
      const apiUrl = `http://192.168.100.6:5000/similar-movies?movie_id=${params.movieId}`;
  
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

    return (
      <motion.div layout>
        <div className="logo-div clickable-item" onClick={()=>{redirectToHome()}}>
            <span class="material-symbols-outlined">movie</span>
            <h3>MovieSuggest</h3>
        </div>
        <MoviePoster movie={movieData.selectedMovie}></MoviePoster>
        <div className="movie-list-with-heading-div">
            <DispayMovieList heading={"People who liked this movie also liked:"} movieList={movieData.similarMovies}></DispayMovieList>
        </div>   
      </motion.div>
    );
  }
  
export default MovieSuggestions;