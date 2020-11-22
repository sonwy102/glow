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

    skin_types = get_all_skin_types()
    for st in skin_types:
        user_st = create_user_skin_type(user.user_id, st.id)
        db.session.add(user_st)
        user_st.is_active = False
        db.session.commit()

    goals = get_all_goals()
    for goal in goals:
        user_goal = create_user_goal(user.user_id, goal.id)
        db.session.add(user_goal)
        user_goal.is_active = False
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

def get_user_skin_type(user_id):
    return UserSkinType.query.filter(UserSkinType.user_id == user_id).all()

def get_active_user_skin_types(user_id):
    return UserSkinType.query.filter(UserSkinType.user_id == user_id, UserSkinType.is_active).all()

def activate_user_skin_type_status(user_id, skin_type_id):
    user_skin_type = UserSkinType.query.filter(UserSkinType.user_id == user_id, UserSkinType.skin_type_id == skin_type_id).first()
    user_skin_type.is_active = True
    db.session.commit()
 
def deactivate_user_skin_type_status(user_id, skin_type_id):
    user_skin_type = UserSkinType.query.filter(UserSkinType.user_id == user_id, UserSkinType.skin_type_id == skin_type_id).first()
    user_skin_type.is_active = False
    db.session.commit()

def get_skin_type_by_id(skin_type_id):
    return SkinType.query.get(skin_type_id)

def get_all_skin_types():
    return SkinType.query.all()

def create_goal(goal_name, description=None):
    
    goal = Goal(name=goal_name, description=description)

    db.session.add(goal)
    db.session.commit()

    return goal

def get_goal_by_id(goal_id):
    return Goal.query.get(goal_id)

def create_user_goal(user_id, goal_id):
    user_goal = UserGoal(user_id=user_id, goal_id=goal_id)

    db.session.add(user_goal)
    db.session.commit()

    return user_goal

def get_user_goals(user_id):
    return UserGoal.query.filter(UserGoal.user_id == user_id).all()

def activate_user_goal_status(user_id, goal_id):
    user_goal = UserGoal.query.filter(UserGoal.user_id == user_id, UserGoal.goal_id == goal_id).first()
    user_goal.is_active = True
    db.session.commit()

def deactivate_user_goal_status(user_id, goal_id):
    user_goal = UserGoal.query.filter(UserGoal.user_id == user_id, UserGoal.goal_id == goal_id).first()
    user_goal.is_active = False
    db.session.commit()

def get_active_user_goals(user_id):
    return UserGoal.query.filter(UserGoal.user_id == user_id, UserGoal.is_active).all()

def get_all_goals():
    return Goal.query.all()

def create_user_goal_entry(user_goal_id, routine_id, goal_rating):
    
    user_goal_entry = UserGoalEntry(user_goal_id=user_goal_id, 
                                    routine_id=routine_id, 
                                    goal_rating=goal_rating)
    
    db.session.add(user_goal_entry)
    db.session.commit()

    return user_goal_entry

def get_latest_goal_entries(routine):
    """return a list of user goal entries from the latest routine"""
    
    return UserGoalEntry.query.with_parent(routine).all()
    

def create_routine(user_id, journal_date, notes=None, photo=None):

    routine = Routine(user_id=user_id, journal_date=journal_date, notes=notes, photo=photo)

    db.session.add(routine)
    db.session.commit()    

    return routine

def get_latest_user_routine(user_id):

    routines = Routine.query.with_parent(get_user_by_id(user_id)).order_by('journal_date').all()

    return routines[-1]

def get_latest_user_routines(user_id, n):
    """return n latest user routines"""
    
    routines = Routine.query.with_parent(get_user_by_id(user_id)).order_by(Routine.journal_date.desc()).all()

    return routines[0:n]

def get_routine_days(user_id):
    """return how many days (int) in a row a routine was entered by user"""

    routines = Routine.query.filter(User.user_id == user_id).order_by(Routine.journal_date.desc()).all()
    routine_days = 0

    for i in range(len(routines-1)):
        time_diff = routines[i].journal_date - routines[i+1].journal_date
        time_diff_hours = time_diff.total_seconds() / 3600
        if time_diff_hours <= 24:
            routine_days += 1
        else:
            break
    
    return routine_days

def create_country(name, code):

    country = Country(name=name, code=code)
    
    db.session.add(country)
    db.session.commit()    

    return country

def create_brand(name, num_products, country_id):

    brand = Brand(name=name, num_products=num_products, country_id=country_id)

    db.session.add(brand)
    db.session.commit()

    return brand

def get_brand_by_id(brand_id):

    return Brand.query.get(brand_id)

def get_brand_by_name(brand_name):
    
    return Brand.query.filter(Brand.name == brand_name).first()

def search_brands_like_name(querystr):
    brands_in_db = Brand.query.filter(Brand.name.like(f'%{querystr}%')).limit(20).all()
    brands = []
    for item in brands_in_db:
        brands.append(get_brand_by_id(item.id))
    
    return brands

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

def create_product(name, photo, brand_id, product_type_id):

    product = Product(name=name,
                      photo=photo,
                      brand_id=brand_id,
                      product_type_id=product_type_id)

    db.session.add(product)
    db.session.commit() 

    return product

def get_product_by_id(product_id):
    return Product.query.get(product_id)

def get_product_usage(product_id, user_id):
    
    usage_days = RoutineProduct.query.filter(User.user_id == user_id, RoutineProduct.product_id == product_id).count()

    return usage_days


def search_products_like_name(querystr):
    products_in_db = Product.query.filter(Product.name.like(f'%{querystr}%')).limit(20).all()
    products = []
    for item in products_in_db:
        products.append(get_product_by_id(item.id))
    
    return products
    

def create_routine_product(routine_id, product_id):

    routine_product = RoutineProduct(routine_id=routine_id,
                                     product_id=product_id)
    
    db.session.add(routine_product)
    db.session.commit() 

    return routine_product

def get_latest_routine_products(routine):
    """Return a list of Products in user's latest routine"""

    latest_products = []
    for rp in routine.routineproducts:
        latest_products.append(rp.product)
    
    return latest_products


def create_ingredient(name):

    ingredient = Ingredient(name=name)
    
    db.session.add(ingredient)
    db.session.commit() 

    return ingredient

def get_ing_by_id(ing_id):
    return Ingredient.query.get(ing_id)

def get_ing_by_name(ing_name):

    return Ingredient.query.filter(Ingredient.name == ing_name).first()

def search_ings_like_name(querystr):
    ings_in_db = Ingredient.query.filter(Ingredient.name.like(f'%{querystr}%')).limit(20).all()
    ings = []
    for item in ings_in_db:
        ings.append(get_ing_by_id(item.id))
    
    return ings

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