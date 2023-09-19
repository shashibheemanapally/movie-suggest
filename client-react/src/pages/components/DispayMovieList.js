import Movie from "./Movie";
import {motion,AnimatePresence} from 'framer-motion'

function DispayMovieList(props) {
  

    return (
        <>
        <motion.div layout>
            <h2 className="display-movies-heading">{props.heading}</h2>
            <motion.div layout  className="display-movies-div">
                <AnimatePresence>
                    {props.movieList.map((movie) => {
                        return <Movie key={movie.movie_id} movie={movie}/>
                    })}
                </AnimatePresence>
            </motion.div>
        </motion.div>
            
        </>
      
    );
  }
  
export default DispayMovieList;