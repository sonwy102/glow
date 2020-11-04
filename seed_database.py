"""Script to seed database."""

import os
from datetime import datetime
from faker import Faker


import crud_faker
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
    user = crud_faker.create_fake_user(email, password, fname, lname, birthday)
    users_in_db.append(user)