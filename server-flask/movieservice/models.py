import threading


class Movie(dict):
    def __init__(self, movie_id=-1, movie_name="", imdb_id=-1, tags=None):
        if tags is None:
            tags = []
        dict.__init__(self, movie_id=movie_id, movie_name=movie_name, imdb_id=imdb_id, tags=tags)


class SimpleLRU:
    def __init__(self, capacity):
        self.capacity = capacity
        self.dq = []
        self.lock = threading.Lock()

    def get_cache(self, n):
        with self.lock:
            if n > self.capacity:
                return self.dq[::-1]
            return self.dq[:-n:-1]

    def refer(self, num):
        with self.lock:
            if num in self.dq:
                self.dq.remove(num)
                self.dq.append(num)
                return

            if len(self.dq) >= self.capacity:
                self.dq.pop(0)
            self.dq.append(num)
            print(f'cache size is {len(self.dq)}')
