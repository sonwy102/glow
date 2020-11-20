from faker import Faker
from faker.providers import BaseProvider
from model import (User, Routine, UserGoal, UserGoalEntry, RoutineProduct, 
                   UserSkinType)
import crud
import datetime
fake = Faker()

def create_test_user():
    
    # create testuser
    user = crud.create_user(
        email = self.fake.email(),
        password = self.fake.password(),
        fname = self.fake.first_name(),
        lname = self.fake.last_name(),
        birthday = self.fake.date()
    )
    
    # randomly activate a skin type and goals
    crud.activate_user_skin_type_status(user.user_id, fake.random_int(1, 6))
    for _ in range(2):
        crud.activate_user_goal_status(user.user_id, fake.random_int(1, 5))
    
    user_skin_types = crud.get_user_skin_type(user.user_id)
    user_goals = crud.get_user_goals(user.user_id)

def create_test_routines(user_id):
    today_AM = datetime.datetime.strptime(f'2020-11-19 10:00:00', '%Y-%m-%d %H:%M:%S')
    today_PM = datetime.datetime.strptime(f'2020-11-19 22:00:00', '%Y-%m-%d %H:%M:%S')
    dates_AM = [today_AM - datetime.timedelta(days=x) for x in range(100)]
    dates_PM = [today_PM - datetime.timedelta(days=x) for x in range(100)]
    print('dates_AM: ', dates_AM[0,4])
    print('dates_PM: ', dates_PM[0,4])

    for journal_date in dates_AM:
        crud.create_routine(user_id, journal_date)
    
    for journal_date in dates_PM:
        crud.create_routine(user_id, journal_date)

def create_test_routine_products(user_id, routine_id):
    
if __name__ == '__main__':
