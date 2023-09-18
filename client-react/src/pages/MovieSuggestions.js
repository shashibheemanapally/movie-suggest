import { useLocation } from "react-router-dom";

function MovieSuggestions() {
  
    const location = useLocation();

    return (
      <h1>Movie suggestions for id {location.state.id}</h1>
    );
  }
  
export default MovieSuggestions;