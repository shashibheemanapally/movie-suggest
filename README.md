
# Movie Suggest

Try it here:
<br>
[<img alt="MovieSuggest" src="assets/logo.png" />](https://moviesuggest.net/)








### About
A movie suggestion engine that recommends movies based on a movie that a user already watched and liked. Suggestions are based on the ratings given by other users.


It's based on the phrase: *"People who liked this movie also liked this movie..."*


![image](https://github.com/shashibheemanapally/movie-suggest/assets/62506255/02205998-4f33-482a-9e3d-331f135cd6d9)




### Tech stack

#### Frontend
ReactJs with build deployed on Amazon S3 with cloudfront as CDN.
#### Backend
Dockerised Flask API with gunicorn as web interface deployed on Amazon elastic beanstalk.

### Attributions
**Data sets are provided by**: F. Maxwell Harper and Joseph A. Konstan. 2015. The MovieLens Datasets: History and Context. ACM Transactions on Interactive Intelligent Systems (TiiS) 5, 4: 19:1–19:19. https://doi.org/10.1145/2827872

**Movie images are provided by**: The Movie Db https://www.themoviedb.org/
![image](https://github.com/shashibheemanapally/movie-suggest/assets/62506255/fffc3937-f709-4e10-b5d4-1af8b9b08029)


***
***
***
### More info
The movie suggest engine inherently uses [Collaborative Filtering](https://en.wikipedia.org/wiki/Collaborative_filtering) a machine learning technique applied over real world user movie ratings.

The notebooks used for training the machine learning models used in this application are:
https://www.kaggle.com/code/shashibheemanapally/movie-suggest-generate-x-collaborative?scriptVersionId=142716701
<br>
https://www.kaggle.com/code/shashibheemanapally/movie-suggest-cluster-centroids-st-deviation?scriptVersionId=143055433
