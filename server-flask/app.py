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
    return movie_engine.get_top_20_search_results(search_sub_string)


@app.route('/similar-movies', methods=['GET'])
def similar_movies():
    args = request.args
    movie_id = args.get("movie_name", default=0, type=int)


#############################################

if __name__ == '__main__':
    movie_engine.populate_data_tables()
    app.run(host='0.0.0.0', port=5000)
