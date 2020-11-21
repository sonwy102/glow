from faker import Faker
from faker.providers import BaseProvider
from model import (db, User, Routine, UserGoal, UserGoalEntry, RoutineProduct, 
                   UserSkinType, connect_to_db)
import crud
import datetime
fake = Faker()

def create_test_user():
    
    # create testuser
    user = crud.create_user(
        email = fake.email(),
        password = fake.password(),
        fname = fake.first_name(),
        lname = fake.last_name(),
        birthday = fake.date()
    )
    
    # randomly activate a skin type and goals
    crud.activate_user_skin_type_status(user.user_id, fake.random_int(1, 6))
    for _ in range(2):
        crud.activate_user_goal_status(user.user_id, fake.random_int(1, 5))
    
    user_skin_types = crud.get_user_skin_type(user.user_id)
    user_goals = crud.get_user_goals(user.user_id)

    return user

def create_test_routines(user_id):
    today_AM = datetime.datetime.strptime(f'2020-11-19 10:00:00', '%Y-%m-%d %H:%M:%S')
    today_PM = datetime.datetime.strptime(f'2020-11-19 22:00:00', '%Y-%m-%d %H:%M:%S')
    dates_AM = [today_AM - datetime.timedelta(days=x) for x in range(50)]
    dates_PM = [today_PM - datetime.timedelta(days=x) for x in range(50)]

    routine_am = set()
    routine_pm = set()

    for journal_date in dates_AM:
        routine_am.add(crud.create_routine(user_id, journal_date))
    
    for journal_date in dates_PM:
        routine_pm.add(crud.create_routine(user_id, journal_date))
    
    if (len(routine_am) == 50) and (len(routine_pm) == 50):
        print('Test routines successfully created.')
        return ({'routine_am': routine_am, 'routine_pm': routine_pm})
    else:
        return (f'Test routine creation failed. routine_am = {len(routine_am)}, routine_pm = {len(routine_pm)}')

def create_test_routine_products(user_id, routine_set):


    routine_lst = list(routine_set)
    journal_time = input('AM or PM Routine?')

    if journal_time == 'AM':
        for i in range(len(routine_lst)):
            crud.create_routine_product(routine_lst[i].id, 1361)
            crud.create_routine_product(routine_lst[i].id, 191)
            crud.create_routine_product(routine_lst[i].id, 555)
    else:
        for i in range(len(routine_lst)):
            crud.create_routine_product(routine_lst[i].id, 29)
            crud.create_routine_product(routine_lst[i].id, 1361)
            crud.create_routine_product(routine_lst[i].id, 1593)
            crud.create_routine_product(routine_lst[i].id, 1598)
            if i % 3 == 0 :
                crud.create_routine_product(routine_lst[i].id, 1045)
            if i % 5 == 0 :
                crud.create_routine_product(routine_lst[i].id, 1151)

def create_test_user_goal_entries(user_id, routine_set):

    user_goals = crud.get_active_user_goals(user_id)
    routine_lst = list(routine_set)

    for i in range(len(routine_lst)):
        for user_goal in user_goals:
            crud.create_user_goal_entry(user_goal.id, routine_lst[i].id, fake.random_int(1, 10))      
        
if __name__ == '__main__':
    from server import app
    connect_to_db(app)
    