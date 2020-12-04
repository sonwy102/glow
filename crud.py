from model import ( 
    db, User, SkinType, UserSkinType, Goal, UserGoal, UserGoalEntry, Routine, 
    Country, Brand, BrandType, BrandBrandType, ProductType, Product, 
    RoutineProduct, Ingredient, IngAltName, ProductIng, IngGoal, connect_to_db)

from datetime import datetime
if __name__ == '__main__':
    from server import app
    connect_to_db(app, echo=False)

"""USER CRUD FUNCTIONS"""
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


"""SKIN TYPE CRUD FUNCTIONS"""
def create_skin_type(skin_type):
    skin_type = SkinType(name=skin_type)

    db.session.add(skin_type)
    db.session.commit()

    return skin_type
def get_skin_type_by_id(skin_type_id):
    return SkinType.query.get(skin_type_id)

def get_all_skin_types():
    return SkinType.query.all()


"""USER SKIN TYPE CRUD FUNCTIONS"""
def create_user_skin_type(user_id, skin_type_id):
    user_skin_type = UserSkinType(user_id=user_id, skin_type_id=skin_type_id)

    db.session.add(user_skin_type)
    db.session.commit()

    return user_skin_type

def get_user_skin_type(user_id):
    return UserSkinType.query.filter(UserSkinType.user_id == user_id).all()

def get_active_user_skin_types(user_id):
    return UserSkinType.query.filter(
        UserSkinType.user_id == user_id, 
        UserSkinType.is_active).all()

def activate_user_skin_type_status(user_id, skin_type_id):
    user_skin_type = UserSkinType.query.filter(
        UserSkinType.user_id == user_id, 
        UserSkinType.skin_type_id == skin_type_id).first()
    user_skin_type.is_active = True
    db.session.commit()
 
def deactivate_user_skin_type_status(user_id, skin_type_id):
    user_skin_type = UserSkinType.query.filter(
        UserSkinType.user_id == user_id, 
        UserSkinType.skin_type_id == skin_type_id).first()
    user_skin_type.is_active = False
    db.session.commit()


"""GOAL CRUD FUNCTIONS"""
def create_goal(goal_name, description=None):
    
    goal = Goal(name=goal_name, description=description)

    db.session.add(goal)
    db.session.commit()

    return goal

def get_goal_by_id(goal_id):
    return Goal.query.get(goal_id)

def get_all_goals():
    return Goal.query.all()


"""USER GOAL CRUD FUNCTIONS"""
def create_user_goal(user_id, goal_id):
    user_goal = UserGoal(user_id=user_id, goal_id=goal_id)

    db.session.add(user_goal)
    db.session.commit()

    return user_goal

def get_user_goal_by_id(usergoal_id):

    return UserGoal.query.get(usergoal_id)

def get_user_goals(user_id):
    return UserGoal.query.filter(UserGoal.user_id == user_id).all()

def get_active_user_goals(user_id):
    return UserGoal.query.filter(
        UserGoal.user_id == user_id, 
        UserGoal.is_active).all()

def activate_user_goal_status(user_id, goal_id):
    user_goal = UserGoal.query.filter(
        UserGoal.user_id == user_id, 
        UserGoal.goal_id == goal_id).first()
    user_goal.is_active = True
    db.session.commit()

def deactivate_user_goal_status(user_id, goal_id):
    user_goal = UserGoal.query.filter(
        UserGoal.user_id == user_id, 
        UserGoal.goal_id == goal_id).first()
    user_goal.is_active = False
    db.session.commit()



"""USER GOAL ENTRY CRUD FUNCTIONS"""
def create_user_goal_entry(user_goal_id, routine_id, goal_rating):
    
    user_goal_entry = UserGoalEntry(user_goal_id=user_goal_id, 
                                    routine_id=routine_id, 
                                    goal_rating=goal_rating)
    
    db.session.add(user_goal_entry)
    db.session.commit()

    return user_goal_entry

def get_goal_entries_by_routine(routine):
    """return a list of user goal entries from a routine"""
    
    return UserGoalEntry.query.with_parent(routine).all()
    
def get_goal_entries_on_date_by_goal(user_id, usergoal_id, start_date, end_date):
    """given a user_id and usergoal_id, return all user goal entries between 
       start and end date (not included)"""

    routines = Routine.query.filter(
        Routine.user_id == user_id,
        Routine.journal_date > start_date,
        Routine.journal_date < end_date 
    ).all()
    
    usergoal = get_user_goal_by_id(usergoal_id)
    goal = get_goal_by_id(usergoal.goal_id)
    goal_entries = {goal.name: {}}
    for routine in routines:
        goal_entry = UserGoalEntry.query.filter(
            UserGoalEntry.routine_id == routine.id,
            UserGoalEntry.user_goal_id == usergoal_id
        ).first()

        goal_entries[goal.name][routine.journal_date.strftime("%Y-%m-%d %H:%M:%S")] = goal_entry.goal_rating
            
    return goal_entries



"""ROUTINE CRUD FUNCTIONS"""
def create_routine(user_id, journal_date, notes=None, photo=None):
    """Create a routine."""

    routine = Routine(
        user_id=user_id, 
        journal_date=journal_date, 
        notes=notes, 
        photo=photo)

    db.session.add(routine)
    db.session.commit()    

    return routine

def get_latest_user_routine(user_id):
    """Return user's latest Routine."""
    return (
        Routine.query.with_parent(
            get_user_by_id(user_id)
        ).order_by(
            Routine.journal_date.desc()
        ).first()
    )

def get_latest_user_routines(user_id, n):
    """return n latest user routines"""
    
    routines = Routine.query.with_parent(
        get_user_by_id(user_id)
    ).order_by(
        Routine.journal_date.desc()
    ).all()

    return routines[0:n]

def get_routine_days(user_id):
    """return how many days (int) in a row a routine was entered by user"""
    # // TODO: how to calculate in days if there are multiple records per day
        # Option 1 : just return len(routines) / 2
        # Option 2 : make a set of dates (drop the time) from journal_date and return len(routine)

    routines = Routine.query.with_parent(
        get_user_by_id(user_id)
    ).order_by(
        Routine.journal_date.desc()
    ).all()

    dates_set = set()

    for i in range(len(routines)-1):
        time_diff = routines[i].journal_date - routines[i+1].journal_date
        time_diff_hours = time_diff.total_seconds() / 3600
        if time_diff_hours <= 24:
            dates_set.add(routines[i].journal_date.date())
        else:
            break
    
    return len(dates_set)

def get_routine_am_pm_ratio(user_id):
    
    routines = Routine.query.with_parent(get_user_by_id(user_id)).all()

    am_count = 0
    pm_count = 0

    am_time = datetime.strptime('10:00', '%H:%M').time()
    pm_time = datetime.strptime('22:00', '%H:%M').time()

    for routine in routines:
        if routine.journal_date.time() == am_time:
            am_count += 1
        elif routine.journal_date.time() == pm_time:
            pm_count += 1

    am_percent = am_count / (am_count + pm_count) * 100
    pm_percent = 100 - am_percent

    return {'AM': am_percent, 'PM': pm_percent}


"""COUNTRY CRUD FUNCTIONS"""
def create_country(name, code):

    country = Country(name=name, code=code)
    
    db.session.add(country)
    db.session.commit()    

    return country


"""BRAND CRUD FUNCTIONS"""
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



"""PRODUCT TYPE CRUD FUNCTIONS"""
def create_product_type(name):

    product_type = ProductType(name=name)

    db.session.add(product_type)
    db.session.commit() 
    
    return product_type



"""PRODUCT CRUD FUNCTIONS"""
def create_product(name, photo, brand_id, product_type_id):

    product = Product(name=name,
                      photo=photo,
                      brand_id=brand_id,
                      product_type_id=product_type_id)

    db.session.add(product)
    db.session.commit() 

    return product

def update_product_photo(product_id, product_photo_url):
    
    product = Product.query.get(product_id)
    product.photo = product_photo_url
    db.session.commit()

def get_product_by_id(product_id):
    return Product.query.get(product_id)

def get_all_products():
    return Product.query.all()

def get_product_by_name(product_name):
    return Product.query.filter(Product.name == product_name).first()

def get_product_without_photo():
    return Product.query.filter(Product.photo == "").all()

def get_products_with_photo():
    return Product.query.filter(Product.photo != "").all()

def get_product_usage(product_id, user_id):
    
    usage_days = RoutineProduct.query.filter(User.user_id == user_id, RoutineProduct.product_id == product_id).count()

    return usage_days

def search_products_like_name(querystr):
    products_in_db = Product.query.filter(Product.name.like(f'%{querystr}%')).limit(20).all()
    products = []
    for item in products_in_db:
        products.append(get_product_by_id(item.id))
    
    return products



"""ROUTINE PRODUCT CRUD FUNCTIONS"""
def create_routine_product(routine_id, product_id):

    routine_product = RoutineProduct(routine_id=routine_id,
                                     product_id=product_id)
    
    db.session.add(routine_product)
    db.session.commit() 

    return routine_product

def get_routine_products_by_routine(routine):
    """Return a list of Products in user's latest routine"""

    latest_products = []
    for rp in routine.routineproducts:
        latest_products.append(rp.product)
    
    return latest_products



"""INGREDIENT CRUD FUNCTIONS"""
def create_ingredient(name):

    ingredient = Ingredient(name=name)
    
    db.session.add(ingredient)
    db.session.commit() 

    return ingredient

def get_ing_by_id(ing_id):
    return Ingredient.query.get(ing_id)

def get_all_ingredients():
    return Ingredient.query.all()

def get_ing_by_name(ing_name):
    return Ingredient.query.filter(Ingredient.name == ing_name).first()

def search_ings_like_name(querystr):
    ings_in_db = Ingredient.query.filter(Ingredient.name.like(f'%{querystr}%')).limit(20).all()
    ings = []
    for item in ings_in_db:
        ings.append(get_ing_by_id(item.id))
    
    return ings

def check_active_ingredient(ing_name):
    
    # TODO: DO THIS LATER
    # words = ing_name.split(' ')
    # ing_words_set = set(words)

    if 'fragrance' in ing_name:
        return {'parent': 'fragrance', 'impact': -1}
    if 'propylene glycol' in ing_name or 'butylene glycol' in ing_name:
        return {'parent': 'humectants', 'impact': 1}
    if 'alcohol' in ing_name or 'ol' == ing_name[-2:]:
        return {'parent': 'alcohol', 'impact': -1} 
    if 'paraben' in ing_name:
        return {'parent': 'parabens', 'impact': -1} 
    if 'sulfate' in ing_name:
        return {'parent': 'sulfates', 'impact': -1} 
    if 'coconut oil' in ing_name:
        return {'parent': 'oils', 'impact': -1} 
    if 'acid' in ing_name:
        if 'citric' in ing_name or 'glycolic' in ing_name or 'lactic' in ing_name or 'malic' in ing_name:
            return {'parent': 'aha', 'impact': 1} 
        elif 'salicylic' in ing_name:
            return {'parent': 'bha', 'impact': 1}
    if 'ascorb' in ing_name or 'vitamin c' in ing_name:
        return {'parent': 'antioxidants', 'impact': 1}
    if 'retinol' in ing_name or 'vitamin a' in ing_name:
        return {'parent': 'antioxidants', 'impact': 1}
    if 'tocopher' in ing_name or 'vitamin e' in ing_name:
        return {'parent': 'antioxidants', 'impact': 1}
    if 'niacin' in ing_name:
        return {'parent': 'antioxidants', 'impact': 1}
    if 'green tea' in ing_name:
        return {'parent': 'antioxidants', 'impact': 1}
    if 'caffeine' in ing_name:
        return {'parent': 'antioxidants', 'impact': 1}
    if 'squalane' in ing_name:
        return {'parent': 'facialoils', 'impact': 1}
    if 'oil' in ing_name:
        if 'castor' in ing_name or 'argan' in ing_name or 'jojoba' in ing_name or 'marula' in ing_name:
            return {'parent': 'facialoils', 'impact': 1}
        else:
            return {'parent': 'otheroils', 'impact': 0}
    if 'hyaluron' in ing_name:
        return {'parent': 'humectants', 'impact': 1}
    if 'ceramide' in ing_name:
        return {'parent': 'ceramides', 'impact': 1}
    if 'aloe' in ing_name:
        return {'parent': 'aloe', 'impact': 1}
    if 'collagen' in ing_name:
        return {'parent': 'collagen', 'impact': 1}
    if 'glycerin' in ing_name or 'sodium pca' in ing_name or 'sorbitol' in ing_name or 'allantoin' in ing_name:
        return {'parent': 'humectants', 'impact': 1}
    if 'oxide' in ing_name:
        if 'titanium' in ing_name or 'zinc' in ing_name:
            return {'parent': 'spf', 'impact': 1}
    if 'dimethicone' in ing_name or 'silicone' in ing_name:
        return {'parent': 'silicones', 'impact': 0}
    return {'parent': 'other', 'impact': None}
        
def get_active_ingredients(ingredients):
    
    active_ings = []
    for ing in ingredients:
        if check_active_ingredient(ing.name)['impact'] is not None:
            active_ings.append(ing)
    return active_ings



"""INGREDIENT ALT NAME CRUD FUNCTIONS"""
def create_ing_altname(ingredient_id, name):

    ing_altname = IngAltName(ingredient_id=ingredient_id,
                             name=name)

    db.session.add(ing_altname)
    db.session.commit() 

    return ing_altname


"""PRODUCT_INGREDIENT CRUD FUNCTIONS"""
def create_product_ing(product_id, ingredient_id):

    product_ing = ProductIng(product_id=product_id,
                             ingredient_id=ingredient_id)

    db.session.add(product_ing)
    db.session.commit() 

    return product_ing

def get_product_ing_by_product(product_id):

    product_ing = ProductIng.query.filter(ProductIng.product_id == product_id).all()

    return product_ing

def get_product_count_by_ingredient(ingredient_id):
    
    product_count = ProductIng.query.filter(ProductIng.ingredient_id == ingredient_id).count() 

    return product_count

"""INGREDIENT_GOAL CRUD FUNCTIONS"""
def create_ing_goal(ingredient_id, goal_id):

    ing_goal = IngGoal(ingredient_id=ingredient_id, goal_id=goal_id)

    db.session.add(ing_goal)
    db.session.commit() 

    return ing_goal