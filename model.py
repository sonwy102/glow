from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    '''A user.'''

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)
    fname = db.Column(db.String(30), nullable=False)
    lname = db.Column(db.String(30), nullable=False)
    user_photo = db.Column(db.String, default='/static/img/user/default_user.png')
    birthday = db.Column(db.DateTime, default=None)
    created_on = db.Column(db.DateTime, default=datetime.utcnow)

    # TODO: test this relationship and use it in crud.py and server.py
    skin_types = db.relationship('SkinType', backref='users', secondary='userskintypes')
    def __repr__(self):
        return f'<User id={self.user_id} email={self.email}>'

class SkinType(db.Model):

    __tablename__ = 'skintypes'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(30), nullable=False)

    def __repr__(self):
        return f'<SkinType id={self.id} type={self.name}>'


class UserSkinType(db.Model):

    __tablename__ = 'userskintypes'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    skin_type_id = db.Column(db.Integer, db.ForeignKey('skintypes.id'))

    # TODO: Switch default to False
    is_active = db.Column(db.Boolean, default=True, nullable=False)

    skin_type = db.relationship('SkinType', backref='userskintypes')
    user = db.relationship('User', backref='userskintypes')

    def __repr__(self):
        return f'<UserSkinType id={self.id} is_active={self.is_active}>'


class Goal(db.Model):

    __tablename__ = 'goals'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    ref_photo = db.Column(db.String)

    def __repr__(self):
        return f'<Goal id={self.id} name={self.name}>'

class UserGoal(db.Model):

    __tablename__ = 'usergoals'
    
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    goal_id = db.Column(db.Integer, db.ForeignKey('goals.id'))
    is_active = db.Column(db.Boolean, default=True, nullable=False)

    goal = db.relationship('Goal', backref='usergoals')
    user = db.relationship('User', backref='usergoals')

    def __repr__(self):
        return f'<UserGoal id={self.id} is_active={self.is_active}>'

class UserGoalEntry(db.Model):

    __tablename__ = 'usergoalentries'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_goal_id = db.Column(db.Integer, db.ForeignKey('usergoals.id'))
    routine_id = db.Column(db.Integer, db.ForeignKey('routines.id'))
    goal_rating = db.Column(db.Integer, nullable=False)
        # how to set default value to most recent value?
    
    usergoal = db.relationship('UserGoal', backref='usergoalentries')
    routine = db.relationship('Routine', backref='usergoalentries')

    def __repr__(self):
        return f'<UserGoalEntry id={self.id} goal_rating={self.goal_rating}>'


class Routine(db.Model):

    __tablename__ = 'routines'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    created_on = db.Column(db.DateTime, default=datetime.utcnow)
    journal_date = db.Column(db.DateTime, nullable=False)
    notes = db.Column(db.Text)
    photo = db.Column(db.String)

    user = db.relationship('User', backref='routines')
    products = db.relationship('Product', backref='routine', secondary='routineproducts')

    def __repr__(self):
        return f'<Routine id={self.id} user={self.user_id} journal_date={self.journal_date}>'

class Country(db.Model):

    __tablename__ = 'countries'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    code = db.Column(db.String(2), nullable=False)

    def __repr__(self):
        return f'<Country id={self.id} code={self.code}>'

class Brand(db.Model):

    __tablename__ = 'brands'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    num_products = db.Column(db.Integer, nullable=False, default=0)
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'))

    country = db.relationship('Country', backref='brands')

    def __repr__(self):
        return f'<Brand id={self.id} name={self.name}>'
    
    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'num_products': self.num_products,
            'country': self.country_id
        }

class BrandType(db.Model):

    __tablename__ = 'brandtypes'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<BrandType id={self.id} type={self.name}>'


class BrandBrandType(db.Model):

    __tablename__ = 'brandbrandtypes'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    brand_id = db.Column(db.Integer, db.ForeignKey('brands.id'))
    brand_type_id = db.Column(db.Integer, db.ForeignKey('brandtypes.id'))

    brand = db.relationship('Brand', backref='brandbrandtypes')
    brand_type = db.relationship('BrandType', backref='brandbrandtypes')

    def __repr__(self):
        return f'<BrandBrandType id={self.id} brand={self.brand_id}>'


class ProductType(db.Model):

    __tablename__ = 'producttypes'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<ProductType id={self.id} type={self.name}>'


class Product(db.Model):

    __tablename__ = 'products'
    
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    photo = db.Column(db.String, nullable=False, default=None)
    brand_id = db.Column(db.Integer, db.ForeignKey('brands.id'))
    product_type_id = db.Column(db.Integer, db.ForeignKey('producttypes.id'))
    is_discontinued = db.Column(db.Boolean, default=False, nullable=False)

    brand = db.relationship('Brand', backref='products')
    product_type = db.relationship('ProductType', backref='products')

    def __repr__(self):
        return f'<Product id={self.id} name={self.name} is_discontinued={self.is_discontinued}>'
    
    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'photo': self.photo,
            'brand': self.brand_id,
            'product_type_id': self.product_type_id,
            'is_discontinued': self.is_discontinued
        }

class RoutineProduct(db.Model):

    __tablename__ = 'routineproducts'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    routine_id = db.Column(db.Integer, db.ForeignKey('routines.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))

    routine = db.relationship('Routine', backref='routineproducts')
    product = db.relationship('Product', backref='routineproducts')

    def __repr__(self):
        return f'<RoutineProduct id={self.id} routine_id={self.routine_id} product_id={self.product_id}>'


class Ingredient(db.Model):

    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<Ingredient id={self.id} name={self.name}'
    
    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }
    

class IngAltName(db.Model):

    __tablename__ = 'ingaltnames'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))
    name = db.Column(db.String, nullable=False)

    ingredient = db.relationship('Ingredient', backref='ingaltnames')

    def __repr__(self):
        return f'<IngCommonName id={self.id} name={self.name}'


class ProductIng(db.Model):

    __tablename__ = 'productings'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))

    product = db.relationship('Product', backref='productings')
    ingredient = db.relationship('Ingredient', backref='productings')

    def __repr__(self):
        return f'<ProductIng id={self.id} product_id={self.product_id} ingredient_id={self.ingredient_id}'


class IngGoal(db.Model):

    __tablename__ = 'inggoals'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))
    goal_id = db.Column(db.Integer, db.ForeignKey('goals.id'))
    rating = db.Column(db.Integer, default=None)

    ingredient = db.relationship('Ingredient', backref='inggoals')
    goal = db.relationship('Goal', backref='inggoals')

    def __repr__(self):
        return f'<IngGoal id={self.id} goal_id={self.goal_id} ingredient_id={self.ingredient_id}'


def connect_to_db(flask_app, db_uri='postgresql:///glow', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)
