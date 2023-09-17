from flask import Flask, request
from movieservice import movie_engine

app = Flask(__name__)


@app.route("/health")
def health():
    return "Okay!"


@app.route('/search-movies', methods=['GET'])
def search_movies():
    args = request.args
    search_sub_string = args.get("movie_name", default="", type=str)
    limit = args.get("limit", default=3, type=int)
    movie_list = movie_engine.get_top_search_results(search_sub_string, limit)
    return movie_list


@app.route('/similar-movies', methods=['GET'])
def similar_movies():
    args = request.args
    movie_id = args.get("movie_id", default=0, type=int)
    suggested_movies = movie_engine.get_top_similar_movies(movie_id)
    return suggested_movies


@app.route('/recent-searches', methods=['GET'])
def recent_searches():
    recently_searched_movies = movie_engine.get_recently_searched()
    return recently_searched_movies


#############################################

if __name__ == '__main__':
    movie_engine.populate_data_tables()
    app.run(host='0.0.0.0', port=5000)
