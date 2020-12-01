import crud
import json

from model import (db, Ingredient, connect_to_db)

"""TREE CRUD FUNCTIONS FOR D3-HIERARCHY"""

if __name__ == '__main__':
    from server import app
    connect_to_db(app, echo=False)

class IngNode():
    
    def __init__(self, data, children=None):
        self.data = data
        self.children = children or []
    
    def __repr__(self):
        return f"<NODE {self.data}>"
    
    def find(self, name):

        to_visit = [self]

        while to_visit:
            current = to_visit.pop()
            if current.data['name'] == name:
                return current
            to_visit.extend(current.children)


class IngTree():

    def __init__(self, root):
        self.root = root
    
    def __repr__(self):
        return f"<Tree root={self.root}>"
    
    def find_in_tree(self, name):
        return self.root.find(name)
    

def create_ing_json():
    """create JSON of ingredient tree data"""
    all_ings = crud.get_all_ingredients()

    
    # sub-category nodes
    fragrance = IngNode({'name': 'fragrance'})
    alcohol = IngNode({'name': 'alcohol'})
    parabens = IngNode({'name': 'parabens'})
    sulfates = IngNode({'name': 'sulfates'})
    facialoils = IngNode({'name': 'facialoils'})
    otheroils = IngNode({'name': 'otheroils'})
    aha = IngNode({'name': 'aha'})
    bha = IngNode({'name': 'bha'})
    antioxidants = IngNode({'name': 'antioxidants'})
    humectants = IngNode({'name': 'humectants'})
    ceramides = IngNode({'name': 'ceramides'})
    aloe = IngNode({'name': 'aloe'})
    collagen = IngNode({'name': 'collagen'})
    spf = IngNode({'name': 'spf'})


    # category nodes
    irritants = IngNode(
        {
            'name': 'irritants', 
            'description': 'Ingredients that could contribute to irritation and/or inflammation of our skin'
        },
        [fragrance, alcohol, parabens, sulfates]
    )
    actives = IngNode(
        {
            'name': 'actives', 
            'description': 'Functional ingredients that are linked to improving specific skin concerns.'
        },
        [aha, bha, antioxidants, spf, collagen])
    hydrators = IngNode(
        {
            'name': 'hydrators', 
            'description': 'Ingredients that helps keep our skin hydrated and/or enrich the moisture level of our skin'
        },
        [ceramides, humectants]
    )
    oils = IngNode(
        {
            'name': 'oils', 'description:': 'Lipid-based ingredients. Function and effect varies by ingredient'
        }, [facialoils, otheroils])
    botanicals = IngNode(
        {
            'name': 'botanicals', 
            'description': 'Ingredients derived from plants. Effects vary by ingredient.'
        }, [aloe])
    silicones = IngNode({'name': 'silicones', 'description': 'A group of semi-liquid substances derived from silica that are best known for their occlusive properties'})
    other = IngNode({'name': 'other', 'description': 'Any other, uncategorized ingredients'})
    
    # root node
    root = IngNode({'name': 'ingredient_root'}, [irritants, actives, hydrators, botanicals, silicones, oils, other])

    ing_tree = IngTree(root)
    
    for ing_query in all_ings:
        ing = ing_query.serialize
        ing_tree_details = crud.check_active_ingredient(ing['name'])
        ing_value = ing_tree_details['value']
        ing['value'] = ing_value

        parent = ing_tree_details['parent']
        parent_node = ing_tree.find_in_tree(parent)
        parent_node.children.append(IngNode(ing))
        
    # with open('data/ingredient_tree.json', 'w') as outfile:
    #     json.dump(root.__dict__, outfile, default=lambda o: o.__dict__)

    return json.dumps(root.__dict__, default=lambda o: o.__dict__)