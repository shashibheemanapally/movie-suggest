from pathlib import Path
import pandas as pd
from .models import Movie
import random
import math

cluster_map = {}  # cluster_number --> set of movie ids
movie_name_map = {}  # list of movie names
movie_map = {}  # movie_id --> Movie object{movie_id,movie_name,imdb_id,[tags]}
centroids = []  # Numpy array with centroids


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
    for i in movie_name_map.keys():
        movie_name_map[i] = movie_name_map[i].lower()

    links_map = dict(zip(links_df[0], links_df[1]))

    movie_map = {}
    for i, movie_row in movies_df.iterrows():
        movie_id = movie_row['movieId']
        movie_name = movie_row['title']
        imdb_id = ''.join(['tt', str(links_map[movie_row['movieId']])])
        tags = movie_row['genres'].split('|')
        movie_map[movie_id] = Movie(movie_id=movie_id, movie_name=movie_name, imdb_id=imdb_id, tags=tags)

    centroids = centroid_df.to_numpy()

    print(f'cluster_map: {len(cluster_map)}')
    print(f'movie_name_map: {len(movie_name_map)}')
    print(f'movie_map: {len(movie_map)}')
    print(f'centroids: {len(centroids)}')

    print(f'=====>Populated data tables')


def get_top_20_search_results(search_string=""):
    result = []
    count = 0
    sub_str = search_string.lower()
    for key, value in movie_name_map.items():
        if sub_str in value and key in movie_map:
            result.append(movie_map[key])
            count += 1
        if count > 20:
            return result

    return result


def get_top_similar_movies(movie_id):
    if movie_id not in movie_map.keys():
        return {}

    selected_movie = movie_map[movie_id]
    similar_movies = get_top_similar_movies_sub(movie_id)

    return {"selectedMovie": selected_movie, "similarMovies": similar_movies}


def get_top_similar_movies_sub(movie_id):
    minimum_suggestions = 15
    maximum_suggestions = 50
    cluster = -1

    for key, value in cluster_map.items():
        if movie_id in value:
            cluster = key
            continue

    if cluster == -1:
        return []

    if len(cluster_map[cluster]) > minimum_suggestions:
        movie_ids = random.sample(tuple(cluster_map[cluster]), k=min(maximum_suggestions,len(cluster_map[cluster])))
        if movie_id in movie_ids: movie_ids.remove(movie_id)
        movies = list(map(lambda m_id: movie_map[m_id], movie_ids))
        return movies
    else:
        cluster_1, cluster_2 = find_closest_centroids(cluster)

        if len(cluster_map[cluster_1]) + len(cluster_map[cluster]) < minimum_suggestions:
            cluster_union = cluster_map[cluster_1].union(cluster_map[cluster_2]).union(cluster_map[cluster])
        else:
            cluster_union = cluster_map[cluster_1].union(cluster_map[cluster])

        print(f'len of cluster_union {len(cluster_union)}')

        movie_ids = random.sample(tuple(cluster_union), k=min(maximum_suggestions, len(cluster_union)))
        if movie_id in movie_ids: movie_ids.remove(movie_id)
        movies = list(map(lambda m_id: movie_map[m_id], movie_ids))
        return movies


def find_closest_centroids(cluster):
    target_point = centroids[cluster]
    distances = list(map(lambda centroid: math.dist(centroid,target_point), centroids))
    distances[cluster] = math.inf
    smallest_idx = 0
    second_smallest_idx = 1

    if distances[1] < distances[0]:
        smallest_idx = 1
        second_smallest_idx = 0

    for i in range(2, len(distances)):
        if distances[i] < distances[smallest_idx]:
            second_smallest_idx = smallest_idx
            smallest_idx = i
        elif distances[i] < distances[second_smallest_idx]:
            second_smallest_idx = i
    return smallest_idx, second_smallest_idx

