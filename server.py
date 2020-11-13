"""Server for Glow app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import connect_to_db
import crud
import json

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
@app.route('/login')
@app.route('/register')
@app.route('/profile')
@app.route('/searchresults')
@app.route('/routine')
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

    response = {'status_code': '', 'msg': '', 'session_id': ''}

    # check if email already exists
    user_in_db = crud.get_user_by_email(email)       
    if user_in_db:
        response['status_code'] = 409
        response['msg'] = 'Account already exists.'
        response['session_id'] = None
        return jsonify(response)
        
    new_user = crud.create_user(email, password, first_name, last_name, birthday)
    if new_user:
        session['user_id'] = new_user.user_id
        response['status_code'] = 200
        response['msg'] = 'Your account was successfully created!'
        response['session_id'] = session['user_id']
    else:
        response['status_code'] = 406 
        response['msg'] = 'Registration failed. Try again later.'
        response['session_id'] = None
    
    return jsonify(response)


@app.route('/product-search.json')
def search_product_info():
    """Query database for products, brands, or ingredients relevant to user's
    input."""

    table_name = request.args.get("search_category")
    querystr = request.args.get("product_search")

    if table_name == 'Product':
        search_results = crud.search_products_like_name(querystr)
    elif table_name == 'Brand':
        search_results = crud.search_brands_like_name(querystr)
    else:
        search_results = crud.search_ings_like_name(querystr)
    
    res = []
    for item in search_results:
        res.append({'name': item.name})
        
    return jsonify(res) 

@app.route('/user-info.json')
def show_user_info():
    """Query database for a user and return their info."""
    # TODO: refactor the logic out into crud.py later

    user_id = int(request.args.get("uid"))
    user = crud.get_user_by_id(user_id)
    user_skin_types_in_db = crud.get_user_skin_type(user_id)
    user_skin_types = []
    for item in user_skin_types_in_db:
        user_skin_types.append(crud.get_skin_type_by_id(item.skin_type_id))
    
    user_goals_in_db = crud.get_active_user_goals(user_id)
    user_goals = []
    for item in user_goals_in_db:
        user_goals.append(crud.get_goal_by_id(item.goal_id))
        
    res = {
        'name': (f'{user.fname} {user.lname}'),
        'photo': user.user_photo,
        'email': user.email,
        'skin_types': [skin_type.name for skin_type in user_skin_types],
        'goals': [goal.name for goal in user_goals]
    }

    return jsonify([res])

@app.route('/routine-products.json')
def get_latest_products():
    """Query database for a user's list of products used in their latest routine"""

    user_id = int(request.args.get("uid"))

    routine = crud.get_latest_user_routine(user_id)
    products = crud.get_latest_routine_products(routine)
    
    res = []
    for product in products:
        res.append(product.name)
    
    return jsonify(res)



if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
    