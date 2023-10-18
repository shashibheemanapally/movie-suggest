
# Movie Suggest

Try it here:
<br>
[![twitter](https://github-production-user-asset-6210df.s3.amazonaws.com/62506255/276110557-f5a83d93-add2-49fc-81ab-bc8f8cd16331.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231018%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231018T060418Z&X-Amz-Expires=300&X-Amz-Signature=32313a58390fb5f4e3002a3a641b4fab44b3926f66c4cb63e32a2dd7182cada3&X-Amz-SignedHeaders=host&actor_id=62506255&key_id=0&repo_id=692259749)](https://moviesuggest.net)

[![name](https://github-production-user-asset-6210df.s3.amazonaws.com/62506255/276110557-f5a83d93-add2-49fc-81ab-bc8f8cd16331.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231018%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231018T060418Z&X-Amz-Expires=300&X-Amz-Signature=32313a58390fb5f4e3002a3a641b4fab44b3926f66c4cb63e32a2dd7182cada3&X-Amz-SignedHeaders=host&actor_id=62506255&key_id=0&repo_id=692259749)](https://moviesuggest.net)





### About
A movie suggestion engine that recommends movies based on a movie that a user already watched and liked. Suggestions are based on the ratings given by other users.


It's based on the phrase: *"People who liked this movie also liked this movie..."*



> It's about *The Similar Minded People** and Not about the **Similar Genres*


### Tech stack

#### Frontend
ReactJs with build deployed on Amazon S3 with cloudfront as CDN.
#### Backend
Dockerised Flask API with gunicorn as web interface deployed on Amazon elastic beanstalk.

### Attributions
**Data sets are provided by**: F. Maxwell Harper and Joseph A. Konstan. 2015. The MovieLens Datasets: History and Context. ACM Transactions on Interactive Intelligent Systems (TiiS) 5, 4: 19:1–19:19. https://doi.org/10.1145/2827872

**Movie images are provided by**: The Movie Db https://www.themoviedb.org/

***
***
***
### More info
The movie suggest engine inherently uses [Collaborative Filtering](https://en.wikipedia.org/wiki/Collaborative_filtering) a machine learning technique.

The notebooks used for training the machine learning models used in this application are:
https://www.kaggle.com/code/shashibheemanapally/movie-suggest-generate-x-collaborative?scriptVersionId=142716701
<br>
https://www.kaggle.com/code/shashibheemanapally/movie-suggest-cluster-centroids-st-deviation?scriptVersionId=143055433
