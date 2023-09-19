import { tmdb_key} from '../TmdbService'
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Movie(props) {

    const [movieData, setMovieData] = useState({ title: '', posterPath: '' ,});

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/find/${props.movie.imdb_id}?api_key=${tmdb_key}&language=en_US&external_source=imdb_id`);
          const movieResults = response.data?.movie_results;
  
          if (movieResults && movieResults.length > 0) {
            const firstMovie = movieResults[0];
            const title = firstMovie.title;
            const posterPath = `https://image.tmdb.org/t/p/w154${firstMovie.poster_path}`;
            setMovieData({ title, posterPath });
          } else {
            console.error('Movie data not found in API response.');
          }
        } catch (error) {
          console.error('Error fetching movie data:', error);
        }
      }
  
      fetchData();
    }, []);
    
    const navigate = useNavigate()
    const suggestMovies = (movieId) => {
        navigate('/movie-seggestions', {
            state: {
                movieId: movieId
            }
        });
    };

    return (
        
        <div className='movie' onClick={()=>{suggestMovies(props.movie.movie_id)}}>
          {movieData.title && movieData.posterPath ? (
            <div>
              <img className='clickable-item' src={movieData.posterPath} alt={`Poster for ${movieData.title}`} loading="lazy" />
              <h5 className='movie-name clickable-item'>{movieData.title}</h5>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      );
  }
  
export default Movie;