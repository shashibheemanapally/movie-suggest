import Movie from "./Movie";

function DispayMovieList(props) {
  

    return (
        <>
            <h2 className="display-movies-heading">{props.heading}</h2>
            <div className="display-movies-div">
                {props.movieList.map((movie) => {
                    return <Movie key={movie.movie_id} movie={movie}/>
                })}
            </div>
        </>
      
    );
  }
  
export default DispayMovieList;