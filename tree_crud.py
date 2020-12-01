import crud

from model import (db, Ingredient)

"""TREE CRUD FUNCTIONS FOR D3-HIERARCHY"""

class IngNode():
    
    def __init__(self, data, children=None):
        self.data = data
        self.children = children or []
    
    def __repr__(self):
        return f"<NODE {self.data}>"

class IngTree():

    def __init__(self, root):
        self.root = root
    
    def __repr__(self):
        return f"<Tree root={self.root}>"


def create_ing_json():
    """create JSON of ingredient tree data"""
    all_ings = crud.get_all_ingredients()
    
    # family nodes
    fragrance = IngNode({'family': 'fragrance'})
    alcohol = IngNode({'family': 'fragrance'})
    parabens = IngNode({'family': 'parabens'})
    sulfates = IngNode({'family': 'sulfates'})
    oils = IngNode({'family': 'oils'})
    aha = IngNode({'family': 'AHA'})
    bha = IngNode({'family': 'BHA'})
    antioxidants = IngNode({'family': 'antioxidants'})
    humectants = IngNode({'family': 'humectants'})
    ceramides = IngNode({'family': 'ceramides'})
    aloe = IngNode({'family': 'aloe'})
    collagen = IngNode({'family': 'collagen'})
    spf = IngNode({'family': 'SPF'})


    # category nodes
    irritants = IngNode(
        {
            'category': 'irritant', 
            'description': 'Ingredients that could contribute to irritation and/or inflammation of our skin', 
            'value': -1
        },
        [fragrance, alcohol, parabens, sulfates]
    )
    actives = IngNode(
        {
            'category': 'actives', 
            'description': 'Functional ingredients that are linked to improving specific skin concerns.', 
            'value': 1
        },
        [aha, bha, antioxidants, spf, collagen])
    hydrators = IngNode(
        {
            'category': 'hydrators', 
            'description': 'Ingredients that helps keep our skin hydrated and/or enrich the moisture level of our skin', 
            'value': 1
        },
        [ceramides, humectants, oils]
    )
    botanicals = IngNode(
        {
            'category': 'botanicals', 
            'description': 'Ingredients derived from plants. Effects vary by ingredient.', 
            'value': 0
        }, [aloe])
    # solvents = IngNode({'category': 'solvents', 'description': 'Substances, such as alcohol or water, which dissolve other ingredients', 'value': 0})
    silicones = IngNode({'category': 'silicones', 'description': 'A group of semi-liquid substances derived from silica that are best known for their occlusive properties', 'value': 0})

    # root nodes
    root = IngNode('ingredient', [irritants,actives,hydrators, botanicals, solvents, silicones])
    
    
    for ing_query in all_ings:
        ing = ing_query.serialize
        ing_tree_details = crud.check_active_ingredient(ing['name'])
        node = IngNode(ing)




