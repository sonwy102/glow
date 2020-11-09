'''API helper functions'''

import os
import requests

GOOGLE_API_KEY = os.environ['GOOGLE_API_KEY']
GOOGLE_API_CX = os.environ['GOOGLE_CX']

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
        return (f'Ingredient data fetching failed - status code = {res.status_code}')

def get_all_brands():
    
    brands = {}
    products = get_all_products()
    
    for product in products:
        brands[product['brand']] = brands.get(product['brand'], 0) + 1
    
    return brands

def get_product_img(brand, product):

    google_img_url = 'https://customsearch.googleapis.com/customsearch/v1'
    payload = {
        "key": GOOGLE_API_KEY,
        "cx": GOOGLE_API_CX,
        "searchType": "image",
        "num": 1,
        "q": brand,
        "hq": product,
        "exactTerms": product,
        "linkSite": (f'{brand}.com')}
        
    res = requests.get(google_img_url, params=payload)

    if res.status_code == 200:
        img_data = res.json()
        if 'items' in img_data:
            img_link = img_data['items'][0].get('link', '/static/img/product/default_product')
        else:
            img_link = '/static/img/product/default_product'
        return img_link
    elif res.status_code == 429:
        raise RuntimeError(f'get_product_img failed - google api resource exhausted')
    else:
        raise RuntimeError(f'get_product_img failed - status code={res.status_code}')
    
    





