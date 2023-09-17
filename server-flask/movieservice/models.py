
class Movie(dict):
    def __init__(self, movie_id=-1, movie_name="", imdb_id=-1, tags=None):
        if tags is None:
            tags = []
        dict.__init__(self, movie_id=movie_id, movie_name=movie_name, imdb_id=imdb_id, tags=tags)


class LRUCache:
    def __init__(self, n):
        self.cache_size = n
        self.dq = []
        self.ma = {}

    def refer(self, x):
        if x not in self.ma.keys():
            if len(self.dq) == self.cache_size:
                last = self.dq[-1]
                ele = self.dq.pop()
                del self.ma[last]
        else:
            del self.dq[self.ma[x]]
        self.dq.insert(0, x)
        self.ma[x] = 0;
