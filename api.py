'''API helper functions'''

import requests

#SkincareAPI helper functions
def get_all_products():
   
    res = requests.get('https://skincare-api.herokuapp.com/products')
    products = res.json()

    return products

def get_all_ingredients():
    res = requests.get('https://skincare-api.herokuapp.com/ingredients')
    ingredients = res.json()

    return ingredients

def get_all_brands():
    
    brands = {}
    products = get_all_products()
    
    for product in products:
        brands[product['brand']] = brands.get(product['brand'], 0) + 1
    
    return brands
        


