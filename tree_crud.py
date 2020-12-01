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

    root = Node('ingredient', )
    for ing in all_ings:
        node = IngNode(ing)

