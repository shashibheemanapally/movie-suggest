import { tmdb_key} from '../TmdbService'
import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react';

function MoviePoster(props) {

  
  const [movieData, setMovieData] = useState({ title: '', overview: '', posterPath: '' ,release_date: ''});
    

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/find/${props.movie.imdb_id}?api_key=${tmdb_key}&language=en_US&external_source=imdb_id`);
          const movieResults = response.data?.movie_results;
  
          if (movieResults && movieResults.length > 0) {
            const firstMovie = movieResults[0];
            const title = firstMovie.title;
            const overview = firstMovie.overview;
            const release_date = firstMovie.release_date;
            const posterPath = `https://image.tmdb.org/t/p/w185${firstMovie.poster_path}`;
            setMovieData({ title, overview, posterPath, release_date });
          } else {
            console.error('Movie data not found in API response.');
          }
        } catch (error) {
          console.error('Error fetching movie data:', error);
        }
      }
  
      fetchData();
    }, [props.movie]);

    const redirectToGoogleSearch = (title, release_date) => {
      
      let relDate = release_date;
      const dateArray = release_date.split("-");
      if(dateArray.length != 0 && dateArray[0].length==4){
        relDate = dateArray[0]
      }
      let searchString = `${title} ${relDate}`
      const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(searchString)}`;
      window.open(googleSearchURL, '_blank');
    };



    const isImageLoaded = true
    return (
        <>
        <div className='movie-poster-div'>
            <img src={movieData.posterPath} alt={`Poster for ${movieData.title}`}></img>
            <div className='movie-poster-info-div'>
              <h2>{movieData.title}</h2>
              <p>{movieData.overview}</p>
              <h3>{movieData.release_date}</h3>
              <button className='button-89' onClick={() => {redirectToGoogleSearch(movieData.title,movieData.release_date)}}>More</button>
            </div>
            
        </div>          
        </>
      
    );
  }
  
export default MoviePoster;
