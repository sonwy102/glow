"""Server for Glow app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import connect_to_db
import crud

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
@app.route('/login')
@app.route('/register')
def index():
    """Show homepage."""

    return render_template('index.html')

@app.route('/handle-login.json', methods=["POST"])
def handle_login():
    """Validate user log-in credentials."""
    
    email = request.form.get("email")
    password = request.form.get("password")
    user = crud.get_user_by_email(email)
    response = {'status_code': '', 'msg': '', 'session_id': ''}
    
    if user != None and (user.password == password):
        session['user_id'] = user.user_id
        response['status_code'] = 200
        response['msg'] = None
        response['session_id'] = session['user_id']
        return jsonify(response)
    else:
        response['status_code'] = 401
        response['msg'] = 'Invalid username/password'
        response['session_id'] = None
        return jsonify(response)
        

@app.route('/handle-register.json', methods=["POST"])
def register_user():
    """Register new user."""

    email = request.form.get("email")
    password = request.form.get("password")
    first_name = request.form.get("firstName")
    last_name = request.form.get("lastName")
    birthday = request.form.get("birthday")

    new_user = crud.create_user(email, password, first_name, last_name, birthday)
    return new_user

@app.route('/product-search.json')
def search_product_info():
    """Query database for products, brands, or ingredients relevant to user's
    input."""

    table_name = request.args.get("search_category")
    print(f'table name: {table_name}')
    querystr = request.args.get("product_search")
    print(f'query string: {querystr}')

    searchResults = crud.search_product_info(table_name, querystr)
    return jsonify(searchResults)
    

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
    