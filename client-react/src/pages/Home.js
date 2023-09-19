import { useState, useEffect } from "react";
import axios from "axios";
import DispayMovieList from "./components/DispayMovieList";
import { useRef } from "react";


function Home() {

    const [searchItem, setSearchItem] = useState(() => {
        if(localStorage.getItem("searchItem")){
            return localStorage.getItem("searchItem")
          }
        else{
            let arr = ["Titanic", "Interstellar","Shawshank Redemption", "Godfather"];
            return arr[(Math.floor(Math.random() * arr.length))];
        }
    });

    useEffect(() => {
        localStorage.setItem("searchItem", searchItem);
    },[searchItem])

    const [searchResults, setSearchResults] = useState([])

    const fetchSearchResults = async () => {
        const res = await axios.get(`http://192.168.100.6:5000/search-movies?movie_name=${searchItem}&limit=10`);
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
        const res = await axios.get(`http://192.168.100.6:5000/recent-searches?limit=15`);
        setRecentSearches(res.data)
    };

    useEffect(()=>{
        fetchRecentResults()
    }, [])
    

    

    
  
    return (
        <>
        <div className="Home">
            <div className="logo-div">
                <h3>Logo</h3>
            </div>
            <div className="search-bar-div">
                <input type='text' placeholder="Enter a movie that you liked..."value={searchItem} ref={inputRef} onChange={(e) => setSearchItem(e.target.value)}></input>
            </div>

            <div className="search-results-div">
                <DispayMovieList heading={"Search results:"} movieList={searchResults}></DispayMovieList>
            </div>
            
            <div className="recent-searches-div">
                <DispayMovieList heading={"People recently searched for:"} movieList={recentSearches}></DispayMovieList>
            </div>     
        </div>
        </>
    );
  }
  
export default Home;