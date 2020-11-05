'''API helper functions'''

import requests

#SkincareAPI helper functions
def get_all_products():
   
    res = requests.get('https://skincare-api.herokuapp.com/products')
    
    if res.status_code == 200:
        print('product data successfully fetched!')
        return res.json()
    else:
        return (f'Product data fetching failed. status code = {res.status_code}')

def get_all_ingredients():
    res = requests.get('https://skincare-api.herokuapp.com/ingredients')
    
    if res.status_code == 200:
        print('Ingredient data successfully fetched!')
        return res.json()
    else:
        return (f'Ingredient data fetching failed. status code = {res.status_code}')

def get_all_brands():
    
    brands = {}
    products = get_all_products()
    
    for product in products:
        brands[product['brand']] = brands.get(product['brand'], 0) + 1
    
    return brands
        


