from pathlib import Path

import pandas as pd
from .models import Movie
import os




cluster_map = None  # cluster_number --> set of movie ids
movie_name_map = None  # list of movie names
movie_map = None  # movie_id --> Movie object{movie_id,movie_name,imdb_id,[tags]}
centroids = None  # Numpy array with centroids




def populate_data_tables():
    print(f'=====>Populating data tables')
    global cluster_map
    global movie_name_map
    global movie_map
    global centroids

    base_path = Path(__file__).parent

    links_file = (base_path / 'data/movie_indices_by_std/links.csv').resolve()
    centroids_file = (base_path / 'data/movie_indices_by_std/movie_centroids_using_std_300.csv').resolve()
    indices_file = (base_path / 'data/movie_indices_by_std/movie_indices_using_std_300.csv').resolve()
    movies_file = (base_path / 'data/movie_indices_by_std/movies.csv').resolve()


    indices_df = pd.read_csv(indices_file, header=None)
    movies_df = pd.read_csv(movies_file)
    links_df = pd.read_csv(links_file, header=None)
    centroid_df = pd.read_csv(centroids_file, header=None)


    cluster_map = indices_df.groupby(1)[0].agg(set).to_dict()

    movie_name_map = dict(zip(movies_df['movieId'], movies_df['title']))

    links_map = dict(zip(links_df[0], links_df[1]))

    movie_map = {}
    for i, movie_row in movies_df.iterrows():
        movie_id = movie_row['movieId']
        movie_name = movie_row['title']
        imdb_id = ''.join(['tt', str(links_map[movie_row['movieId']])])
        tags = movie_row['genres'].split('|')
        movie_map[movie_id] = Movie(movie_id=movie_id, movie_name=movie_name, imdb_id=imdb_id, tags=tags)

    print(f'=====>Populated data tables')
    print(f'cluster_map: {len(cluster_map)}')
    print(f'movie_name_map: {len(movie_name_map)}')
    print(f'movie_map: {len(movie_map)}')
    print(f'centroids: {len(centroids)}')
    centroids = centroid_df.to_numpy()




def get_top_10_search_results(search_string):
    pass


def get_top_similar_movies(movie_id):
    pass
