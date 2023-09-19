import { tmdb_key} from '../TmdbService'
import { useState, useEffect } from "react";
import axios from "axios";

function MoviePoster(props) {

  // const [movieData, setMovieData] = useState({ title: '', posterPath: '' ,});
    

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const response = await axios.get(`https://api.themoviedb.org/3/find/${props.movie.imdb_id}?api_key=${tmdb_key}&language=en_US&external_source=imdb_id`);
  //         const movieResults = response.data?.movie_results;
  
  //         if (movieResults && movieResults.length > 0) {
  //           const firstMovie = movieResults[0];
  //           const title = firstMovie.title;
  //           const posterPath = `https://image.tmdb.org/t/p/w154${firstMovie.poster_path}`;
  //           setMovieData({ title, posterPath });
  //         } else {
  //           console.error('Movie data not found in API response.');
  //         }
  //       } catch (error) {
  //         console.error('Error fetching movie data:', error);
  //       }
  //     }
  
  //     fetchData();
  //   }, []);
    
  //   const navigate = useNavigate()
  //   const suggestMovies = (movieId) => {
  //       navigate(`/movie-seggestions/${movieId}`,);
  //   };
  

    return (
        <>
        <h1>Poster of imdb movie {props.selectedMovie.imdb_id}</h1>
        <h3>Tags of imdb movie {props.selectedMovie.tags}</h3>
            
        </>
      
    );
  }
  
export default MoviePoster;
