import {motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";


function About() {


    const navigate = useNavigate()
    const redirectToHome = () => {
        navigate('/');
    };

    const redirectToMovieLens = () => {
        window.open("https://doi.org/10.1145/2827872");
      };
      const redirectToTmdb = () => {
        window.open("https://www.themoviedb.org/");
      };
  

    return (
        <>
            <motion.div 
               initial={{ opacity: 0, y: -200 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
                className='about-div'>
                <div className="logo-div clickable-item" onClick={()=>{redirectToHome()}}>
                    <span className="material-symbols-outlined">movie</span>
                    <h3>MovieSuggest</h3>
                </div>
                <h1>About...</h1>
                <h3>MovieSuggest is a                 
                    <strong className='about-strong'> movie recommendation engine </strong>
                    backed by
                    <strong className='about-strong'> AI and Machine Learning Models </strong>
                    trained with real world dataset of movie reveiws (popular movies until 2018) provided by real world users.
                </h3>
                <div><h1>. . .</h1></div>
                <h3>It's about 
                <strong className='about-strong'> The Similar Minded People </strong>
                and
                <strong className='about-strong'> Not about Similar Genres. </strong>
                </h3>
                <div  className='cluster-img-div'>
                    <img src={process.env.PUBLIC_URL + '/clustering-image.jpeg' } ></img>
                </div>
                
                <div><h1>. . .</h1></div>
                <h1>=============== ATTRIBUTIONS ===============</h1>
                <div className='attributions-div'>
                    <hr></hr>
                    <h2> <strong className='about-strong'> Data set is provided by:</strong> F. Maxwell Harper and Joseph A. Konstan. 2015. The MovieLens Datasets: History and Context. 
                        ACM Transactions on Interactive Intelligent Systems (TiiS) 5, 4: 19:1–19:19. 
                        <u className='clickable-item' onClick={()=>{redirectToMovieLens()}}> https://doi.org/10.1145/2827872</u></h2>
                    <hr></hr>
                    <h2><strong className='about-strong'>Movie images are provided by:</strong> The Movie Db</h2>
                    <img className='clickable-item' onClick={()=>{redirectToTmdb()}} 
                    src={process.env.PUBLIC_URL + '/tmdb-logo.svg'} max-width="100%" height="auto"></img>
                    <hr></hr>
                    
                </div>
                <div><h1>. . .</h1></div>
                    <h2><strong className='about-strong'>Note:</strong> This application does not generate any revenue and is only for research.</h2>
                <div><h1>. . .</h1></div>
            </motion.div>
            {window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
        </>
      
    );
  }
  
export default About;