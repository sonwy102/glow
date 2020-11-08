"""Server for Glow app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect)
from model import connect_to_db
import crud
import jsonify

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

@app.route('/handle-login.json')
def handle_login():
    
    email = request.args.get("email")
    password = request.args.get("password")
    user = crud.get_user_by_email(email)
    
    if user == None:
        return 'Username does not exist.'
    if user.password != password:
        return 'Incorrect username/password'
    
    # session['user'] = user --> how to save login to session? or should i only save status
    return 'OK'
    
    # return user

@app.route('/handle-register.json', methods=["POST"])
def register_user():

    email = request.form.get("email")
    password = request.form.get("password")
    first_name = request.form.get("firstName")
    last_name = request.form.get("lastName")
    birthday = request.form.get("birthday")

    new_user = crud.create_user(email, password, first_name, last_name, birthday)
    return new_user

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)