import Movie from "./Movie";

function DispayMovieList(props) {
  
     

    return (
        <>
            <h2>{props.heading}</h2>
            <div className="movie-list">
                {props.movieList.map((movie) => {
                    return <Movie key={movie.movie_id} movie={movie}/>
                })}
            </div>
        </>
      
    );
  }
  
export default DispayMovieList;