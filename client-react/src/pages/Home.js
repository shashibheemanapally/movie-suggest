import { useState, useEffect } from "react";
import axios from "axios";
import DispayMovieList from "./components/DispayMovieList";
import { useRef } from "react";
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { movieSuggestEngineApiHost } from "./Constants";



function Home() {

    const [searchItem, setSearchItem] = useState(() => {
        if(localStorage.getItem("searchItem")){
            return localStorage.getItem("searchItem")
          }
        else{
            let arr = ["Gravity","The Revenant", "Interstellar", "Godfather"];
            return arr[(Math.floor(Math.random() * arr.length))];
        }
    });

    useEffect(() => {
        localStorage.setItem("searchItem", searchItem);
    },[searchItem])

    const [searchResults, setSearchResults] = useState([])

    const fetchSearchResults = async () => {
        const res = await axios.get(`${movieSuggestEngineApiHost}/search-movies?movie_name=${searchItem}&limit=10`);
        setSearchResults(res.data)
    };

    const inputRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if(inputRef.current.value === searchItem) {
                fetchSearchResults();
            }
          }, 1200)
          return () => {
            clearTimeout(timer)
          }  
        
    },[searchItem, inputRef])

    const [recentSearches, setRecentSearches] = useState([])

    const fetchRecentResults = async () => {
        const res = await axios.get(`${movieSuggestEngineApiHost}/recent-searches?limit=15`);
        setTimeout(()=>{setRecentSearches(res.data)},500)
        
    };

    useEffect(()=>{
        fetchRecentResults()
    }, [])
    
    const navigate = useNavigate()
    const redirectToHome = () => {
        navigate('/');
    };

    const redirectToAbout = () => {
        navigate('/about');
      };
    

    
  
    return (
        <>
        <motion.div 
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
         className="Home">
            <div className="logo-div clickable-item" onClick={()=>{redirectToHome()}}>
                <span className="material-symbols-outlined">movie</span>
                <h2>MovieSuggest</h2>
                <h5>AI powered</h5>
            </div>
            <div className="search-bar-div">
                <input type='text' spellCheck='false' placeholder="Enter a movie that you liked..."value={searchItem} ref={inputRef} onChange={(e) => setSearchItem(e.target.value)}></input>
            </div>

            <div className="movie-list-with-heading-div">
                <DispayMovieList heading={"Search results:"} movieList={searchResults}></DispayMovieList>
            </div>
            
            <div className="movie-list-with-heading-div">
                <DispayMovieList heading={"People recently searched for:"} movieList={recentSearches}></DispayMovieList>
            </div>
            <div className="about-button-div"><h2 className="clickable-item" onClick={()=>{redirectToAbout()}}>About...</h2></div> 
        </motion.div>
        </>
    );
  }
  
export default Home;