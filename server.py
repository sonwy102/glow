"""Server for Glow app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import connect_to_db
import crud
import json
from datetime import datetime
from datetime import timedelta

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
@app.route('/details')
@app.route('/editprofile')
@app.route('/dashboard')
@app.route('/ratingschart')
def index():
    """Show homepage."""

    return render_template('index.html')

@app.route('/handle-login.json', methods=["POST"])
def handle_login():
    """Validate user log-in credentials."""
    
    userLoginData = request.get_json()
    user = crud.get_user_by_email(userLoginData['email'])
    response = {'status_code': '', 'msg': '', 'session_id': ''}
    
    if user != None and (user.password == userLoginData['password']):
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

    newUserData = request.get_json()
    response = {'status_code': '', 'msg': ''}

    # check if email already exists
    user_in_db = crud.get_user_by_email(newUserData['email'])       
    if user_in_db:
        response['status_code'] = 409
        response['msg'] = 'Account already exists.'
        return jsonify(response)
        
    new_user = crud.create_user(
        newUserData['email'],
        newUserData['password'],
        newUserData['firstName'],
        newUserData['lastName'],
        newUserData['birthday'])
    if new_user:
        session['user_id'] = new_user.user_id
        response['status_code'] = 200
        response['msg'] = 'Your account was successfully created! Sign in to start tracking your skin health.'
    else:
        response['status_code'] = 406 
        response['msg'] = 'Registration failed. Try again later.'
    
    return jsonify(response)


@app.route('/product-search.json/<table_name>/<querystr>')
def search_product_info(table_name, querystr):
    """Query database for products, brands, or ingredients relevant to user's
    input."""

    if table_name == 'Product':
        search_results = crud.search_products_like_name(querystr)
    elif table_name == 'Brand':
        search_results = crud.search_brands_like_name(querystr)
    else:
        search_results = crud.search_ings_like_name(querystr)
    
    res = []
    for item in search_results:
        res.append({'category':table_name, 'id':item.id, 'name': item.name})
        
    return jsonify(res) 

@app.route('/user-info.json/<user_id>')
def show_user_info(user_id):
    """Query database for a user and return their info."""
    # TODO: refactor the logic out into crud.py later

    user = crud.get_user_by_id(user_id)
    user_skin_types_in_db = crud.get_active_user_skin_types(user_id)
    
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
        'skin_types': [{'id': skin_type.id, 'name': skin_type.name} for skin_type in user_skin_types],
        'goals': [{'id': goal.id, 'name': goal.name} for goal in user_goals]
    }

    return jsonify(res)

@app.route('/user-skin-types.json/<user_id>')
def get_all_skin_types_status(user_id):
    """Query database and return a list of all skin types and its status in db"""
    
    skin_types = crud.get_all_skin_types()
    active_user_skin_types = crud.get_active_user_skin_types(user_id)
    active_user_st_id = []
    for st in active_user_skin_types:
        active_user_st_id.append(st.skin_type_id)

    res = []
    for skin_type in skin_types:
        if skin_type.id in active_user_st_id:
            res.append({'id': skin_type.id, 'name': skin_type.name, 'isActive': True})
        else:
            res.append({'id': skin_type.id, 'name': skin_type.name, 'isActive': False})
    
    return jsonify(res)

@app.route('/user-goals.json/<user_id>')
def get_all_goals_status(user_id):
    """Query database and return a list of all goals and its status in db"""

    goals = crud.get_all_goals()
    active_goals = crud.get_active_user_goals(user_id)
    active_goals_id = []
    for usergoal in active_goals:
        active_goals_id.append(usergoal.goal_id)
    
    res = []
    for goal in goals:
        if goal.id in active_goals_id:
            res.append({'id': goal.id, 'name': goal.name, 'isActive': True})
        else:
            res.append({'id': goal.id, 'name': goal.name, 'isActive': False})
    
    return jsonify(res)

@app.route('/routine-products.json/<user_id>')
def get_latest_products(user_id):
    """Query database for a user's list of products used in their latest routine"""

    routine = crud.get_latest_user_routine(user_id)
    products = crud.get_routine_products_by_routine(routine)
    
    res = []
    for product in products:
        res.append({'productID': product.id, 'productName': product.name})
    
    return jsonify(res)

@app.route('/goal-ratings.json/<user_id>')
def get_latest_goal_ratings(user_id):
    """Query database and return a list of user's latest goals and ratings"""

    routine = crud.get_latest_user_routine(user_id)
    goal_entries = crud.get_goal_entries_by_routine(routine)

    res = []
    for goal_entry in goal_entries:
        res.append({
            'id':goal_entry.usergoal.id,
            'name': goal_entry.usergoal.goal.name, 
            'rating': goal_entry.goal_rating})
   
    return jsonify(res)


# TODO: create routine, routineProducts, userGoalEntry records in db
    #TODO: getting None back for products even though formData is populated right
    #TODO: check how to handle getting JS arrays back

@app.route('/add-routine.json/<user_id>', methods=["POST"])
def add_user_routine(user_id):
    """Create db records of Routine, RoutineProducts, and UserGoalEntry"""

    # get JSON from fetch request body
    routineData = request.get_json()
    
    # get journal_date (datetime data type)
    datestr = routineData["journalDate"]
    if routineData["journalTime"] == "AM":
        journal_date = datetime.strptime(f'{datestr} 10:00:00', '%Y-%m-%d %H:%M:%S')
    else: 
        journal_date = datetime.strptime(f'{datestr} 22:00:00', '%Y-%m-%d %H:%M:%S')

    # create routine
    # TODO: IS there a way to wait for product and goal to successfully get served and then create Routine?
    routine = crud.create_routine(user_id, journal_date, routineData['notes'], routineData['photo'])
    routine_products = []
    goal_entries = []

    # Create RoutineProducts
    for product in routineData['products']:
        routine_products.append(crud.create_routine_product(routine.id, product['value']))
    
    # Create UserGoalEntries
    for goal in routineData['goals']:
        goal_entries.append(crud.create_user_goal_entry(goal['id'], routine.id, goal['rating']))
    
    # Build res JSON to send back as response to client
    res = {'status_code': '', 'msg': ''}
    if routine and routine_products and goal_entries:
        res['status_code'] = 200
        res['msg'] = 'Routine successfully added.'
    else:
        res['status_code'] = 406
        res['msg'] = f'Add-routine failed. routine: {routine}, products: {routine_products}, goals: {goal_entries}'
    return jsonify(res)

@app.route('/search-result-details.json')
def get_search_result_details():
    """query db for product/brand/ing records with matching category and querystr"""
    
    category = request.args.get('category')
    pid = request.args.get('pid')

    if category == 'Product':
        result_details = crud.get_product_by_id(pid)
    elif category == 'Ingredient':
        result_details = crud.get_ing_by_id(pid)
    else:
        result_details = crud.get_brand_by_id(pid)
    
    return jsonify(result_details.serialize)

@app.route('/update-user-profile.json/<user_id>', methods=['POST'])
def update_user_profile(user_id):
    """Update user's skin types and skin goals when they are edited"""

    user_info_data = request.get_json()

    user_skin_types_id = []
    for user_skin_type in user_info_data['skinTypes']:
        user_skin_types_id.append(user_skin_type['id'])

    user_skin_types_in_db = crud.get_user_skin_type(user_id)
    
    res = {'msg': []}
    for user_skin_type in user_skin_types_in_db:
        if user_skin_type.skin_type_id in user_skin_types_id:
            crud.activate_user_skin_type_status(user_id, user_skin_type.skin_type_id)
            res['msg'].append(f'skin_type_id={user_skin_type.skin_type_id} activated')
        else:
            crud.deactivate_user_skin_type_status(user_id, user_skin_type.skin_type_id)
            res['msg'].append(f'skin_type_id={user_skin_type.skin_type_id} deactivated')

    user_goals_id = []
    for user_goal in user_info_data['goals']:
        user_goals_id.append(user_goal['id'])
    user_goals_in_db = crud.get_user_goals(user_id)

    for user_goal in user_goals_in_db:
        if user_goal.goal_id in user_goals_id:
            crud.activate_user_goal_status(user_id, user_goal.goal_id)
            res['msg'].append(f'goal_id={user_goal.goal_id} activated')
        else:
            crud.deactivate_user_goal_status(user_id, user_goal.goal_id)
            res['msg'].append(f'goal_id={user_goal.goal_id} deactivated')
    
    return jsonify(res)

@app.route('/get-highlights/<user_id>')
def get_user_highlights(user_id):
    
    res = {}

    # Query how many products in user's routine, what those products are, and
    # how long they have been using each product for
    products = {}
    routines = crud.get_latest_user_routines(user_id, 4)

    for routine in routines:
        routine_products = crud.get_routine_products_by_routine(routine)
        for product in routine_products:
            brand = crud.get_brand_by_id(product.brand_id)
            product_name = f'{brand.name} {product.name}'
            if product_name in products:
                products[product_name] += 1
            else: 
                products[product_name] = 1
    
    res['productHighlight'] = {'product_count': len(products), 'product_data': products}
    print('response: ', res)
    
    # Query how many days in a row user did a skincare routine
    # TODO: fix routine_days unit issue - right now, it's how many 'routines in a row'
    routine_days = crud.get_routine_days(user_id)
    routine_ratio = crud.get_routine_am_pm_ratio(user_id)
    res['daysHighlight'] = {'routine_count': routine_days, 'routine_ratio': routine_ratio}

    # Query how many goals user is tracking, what those goals are.
    # TODO: track how long they've been tracking it.
    goals_active = crud.get_active_user_goals(user_id)

    goals = []
    for usergoal in goals_active:
        goal = crud.get_goal_by_id(usergoal.goal_id)
        goals.append({'name': goal.name})
    res['goalsHighlight'] = {'goal_count': len(goals_active), 'goal_data': goals}
    return jsonify(res)

@app.route('/goal-ratings-trend/<user_id>/<view_option>')
def get_goal_ratings_over_time(user_id, view_option):
    
    usergoals = crud.get_active_user_goals(user_id)
    res = {}
    today = datetime.now()
    start_date = today - timedelta(days=int(view_option))
    if usergoals:
        for i in range(len(usergoals)):
            res[i] = crud.get_goal_entries_on_date_by_goal(user_id, usergoals[i].id, start_date, today)
    
    return jsonify(res)

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
    