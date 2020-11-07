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
def index():
    """Show homepage."""

    return render_template('index.html')

@app.route('/handle-login.json')
def handle_login():
    
    email = request.args.get("email")
    password = request.args.get("password")
    user = crud.get_user_by_email(email)
    
    if user == None:
        flash('Username does not exist.')
        return redirect('/login')
    if user.password != password:
        flash('Incorrect username/password')
        return redirect('/login')
    
    # session['user'] = user --> how to save login to session? or should i only save status
    return 'OK'


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)