from flask import Flask, request
from movieservice import movie_engine
from flask_cors import CORS



def create_app():
    app = Flask(__name__)
    CORS(app)
    movie_engine.populate_data_tables()

    @app.route("/")
    def health():
        return "ok"

    @app.route('/api/search-movies', methods=['GET'])
    def search_movies():
        args = request.args
        search_sub_string = args.get("movie_name", default="", type=str)
        limit = args.get("limit", default=3, type=int)
        movie_list = movie_engine.get_top_search_results(search_sub_string, limit)
        return movie_list

    @app.route('/api/similar-movies', methods=['GET'])
    def similar_movies():
        args = request.args
        movie_id = args.get("movie_id", default=0, type=int)
        suggested_movies = movie_engine.get_top_similar_movies(movie_id)
        return suggested_movies

    @app.route('/api/recent-searches', methods=['GET'])
    def recent_searches():
        args = request.args
        limit = args.get("limit", default=12, type=int)
        recently_searched_movies = movie_engine.get_recently_searched(limit)
        return recently_searched_movies

    return app


#############################################

if __name__ == '__main__':
    create_app().run(port=8080)
