"""Script to seed database."""

import os
from datetime import datetime
from faker import Faker
import json


import crud
import model
import server

fake = Faker()

os.system('dropdb glow')
os.system('createdb glow')

model.connect_to_db(server.app)
model.db.create_all()

users_in_db = []
for n in range(10):
    email = fake.email()
    password = fake.password()
    fname = fake.first_name()
    lname = fake.last_name()
    birthday = fake.date()
    user = crud.create_user(email, password, fname, lname, birthday)
    users_in_db.append(user)

skin_types = ['normal', 'dry', 'combination', 'oily', 'sensitive', 'unsure']
for name in skin_types:
    crud.create_skin_type(name)

with open('data/goals.json') as f:
    goals_data = json.loads(f.read())

for goal in goals_data:
    crud.create_goal(goal['name'], goal['description'])

with open('data/countries.json') as f:
    country_data = json.loads(f.read())

for country in country_data:
    crud.create_country(country['name'], country['code'])






