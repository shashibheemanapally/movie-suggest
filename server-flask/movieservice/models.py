import json


class Movie(dict):
    def __init__(self, movie_id=-1, movie_name="", imdb_id=-1, tags=None):
        if tags is None:
            tags = []
        dict.__init__(self, movie_id=movie_id, movie_name=movie_name, imdb_id=imdb_id, tags=tags)


