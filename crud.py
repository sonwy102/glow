from model import ( 
    db, User, SkinType, UserSkinType, Goal, UserGoal, UserGoalEntry, Routine, 
    Country, Brand, BrandType, BrandBrandType, ProductType, Product, 
    RoutineProduct, Ingredient, IngAltName, ProductIng, IngGoal, connect_to_db)

if __name__ == '__main__':
    from server import app
    connect_to_db(app)

def create_user(email,password,fname,lname,birthday):
    """Create and return a new user."""

    user = User(email=email, 
                password=password, 
                fname=fname, 
                lname=lname, 
                birthday=birthday)

    db.session.add(user)
    db.session.commit()

    return user


def get_users():
    """Return all users."""

    return User.query.all()


def get_user_by_id(user_id):
    """Return a user by id."""

    return User.query.get(user_id)


def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()

def create_skin_type(skin_type):
    skin_type = SkinType(name=skin_type)

    db.session.add(skin_type)
    db.session.commit()

    return skin_type

def create_user_skin_type(user_id, skin_type_id):
    user_skin_type = UserSkinType(user_id=user_id, skin_type_id=skin_type_id)

    db.session.add(user_skin_type)
    db.session.commit()

    return user_skin_type

def create_goal(goal_name, description=None):
    
    goal = Goal(name=goal_name, description=description)

    db.session.add(goal)
    db.session.commit()

    return goal

def create_user_goal(user_id, goal_id):
    user_goal = UserGoal(user_id=user_id, goal_id=goal_id)

    db.session.add(user_goal)
    db.session.commit()

    return user_goal

def create_user_goal_entry(user_goal_id, routine_id, goal_rating):
    
    user_goal_entry = UserGoalEntry(user_goal_id=user_goal_id, 
                                    routine_id=routine_id, 
                                    goal_rating=goal_rating)
    
    db.session.add(user_goal_entry)
    db.session.commit()

    return user_goal_entry

def create_routine(user_id, journal_date):

    routine = Routine(user_id=user_id, journal_date=journal_date)

    db.session.add(routine)
    db.session.commit()    

    return routine

def create_country(name, code):

    country = Country(name=name, code=code)
    
    db.session.add(country)
    db.session.commit()    

    return country

def create_brand(name, country_id):

    brand = Brand(name=name, country_id=country_id)

    db.session.add(brand)
    db.session.commit()

    return brand

def create_brand_type(name):

    brand_type = BrandType(name=name)

    db.session.add(brand_type)
    db.session.commit() 

    return brand_type

def create_brand_brand_type(brand_id, brand_type_id):

    brand_brand_type = BrandBrandType(brand_id=brand_id, brand_type_id=brand_type_id)

    db.session.add(brand_brand_type)
    db.session.commit() 

    return brand_brand_type

def create_product_type(name):

    product_type = ProductType(name=name)

    db.session.add(product_type)
    db.session.commit() 
    
    return product_type

def create_product(name, brand_id, product_type_id):

    product = Product(name=name,
                      brand_id=brand_id,
                      product_type_id=product_type_id)

    db.session.add(product)
    db.session.commit() 

    return product

def create_routine_product(routine_id, product_id):

    routine_product = RoutineProduct(routine_id=routine_id,
                                     product_id=product_id)
    
    db.session.add(routine_product)
    db.session.commit() 

    return routine_product

def create_ingredient(name):

    ingredient = Ingredient(name=name)
    
    db.session.add(ingredient)
    db.session.commit() 

    return ingredient

def create_ing_altname(ingredient_id, name):

    ing_altname = IngAltName(ingredient_id=ingredient_id,
                             name=name)

    db.session.add(ing_altname)
    db.session.commit() 

    return ing_altname

def create_product_ing(product_id, ingredient_id):

    product_ing = ProductIng(product_id=product_id,
                             ingredient_id=ingredient_id)

    db.session.add(product_ing)
    db.session.commit() 

    return product_ing

def create_ing_goal(ingredient_id, goal_id):

    ing_goal = IngGoal(ingredient_id=ingredient_id, goal_id=goal_id)

    db.session.add(ing_goal)
    db.session.commit() 

    return ing_goal