class Movie:
    def __init__(self, movie_id=-1, movie_name="", imdb_id=-1, tags=None):
        if tags is None:
            tags = []
        self.movie_id = movie_id
        self.movie_name = movie_name
        self.imdb_id = imdb_id
        self.tags = tags