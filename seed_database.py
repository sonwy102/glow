"""Script to seed database."""

import os
from datetime import datetime
from faker import Faker
import json


import crud
import model
import server
import api

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

brands = api.get_all_brands()
for brand_name in brands.keys():
    crud.create_brand(name=brand_name, num_products=brands[brand_name], country_id=None)

ingredients = api.get_all_ingredients()
for ingredient in ingredients:
    crud.create_ingredient(name=ingredient['ingredient'])

products = api.get_all_products()
for product in products:
    brand = crud.get_brand_by_name(product['brand'])
    crud.create_product(name=product['name'], brand_id=brand.id, product_type_id=None)





