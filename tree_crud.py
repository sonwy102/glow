import crud
import json

from model import (db, Ingredient, connect_to_db)

"""TREE CRUD FUNCTIONS FOR D3-HIERARCHY"""

if __name__ == '__main__':
    from server import app
    connect_to_db(app, echo=False)

class RootNode():
    def __init__(self, name, children=None):
        self.name=name
        self.children = children or []

    def find(self, name):

        to_visit = [self]

        while to_visit:
            current = to_visit.pop()
            if current.name == name:
                return current
            to_visit.extend(current.children)

class CategoryNode(RootNode):
    
    def __init__(self, name, metadata=None, children=None):
        self.name = name
        self.metadata = metadata
        self.children = children or []
    
    def __repr__(self):
        return f"<NODE {self.name}>"
    

class FamilyNode(CategoryNode):

    def __init__(self, name, children=None):
        self.name = name
        self.children = children or []

class IngNode():

    def __init__(self, name, metadata, value):
        self.name = name,
        self.metadata = metadata,
        self.value = value
        self.children = []

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
    fragrance = FamilyNode('fragrance')
    alcohol = FamilyNode('alcohol')
    parabens = FamilyNode('parabens')
    sulfates = FamilyNode('sulfates')
    facialoils = FamilyNode('facialoils')
    otheroils = FamilyNode('otheroils')
    aha = FamilyNode('aha')
    bha = FamilyNode('bha')
    antioxidants = FamilyNode('antioxidants')
    humectants = FamilyNode('humectants')
    ceramides = FamilyNode('ceramides')
    aloe = FamilyNode('aloe')
    collagen = FamilyNode('collagen')
    spf = FamilyNode('spf')


    # category nodes
    irritants = CategoryNode(
        name='irritants',
        metadata={'description': 'Ingredients that could contribute to irritation and/or inflammation of our skin'},
        children=[fragrance, alcohol, parabens, sulfates]
    )
    actives = CategoryNode(
        name='actives', 
        metadata={'description': 'Functional ingredients that are linked to improving specific skin concerns.'},
        children=[aha, bha, antioxidants, spf, collagen])
    hydrators = CategoryNode(
        name='hydrators',
        metadata={'description': 'Ingredients that helps keep our skin hydrated and/or enrich the moisture level of our skin'},
        children=[ceramides, humectants]
    )
    oils = CategoryNode(
        name='oils',
        metadata={'description:': 'Lipid-based ingredients. Function and effect varies by ingredient'}, 
        children=[facialoils, otheroils])
    botanicals = CategoryNode(
        name='botanicals', 
        metadata={'description': 'Ingredients derived from plants. Effects vary by ingredient.'}, 
        children=[aloe])
    silicones = CategoryNode('silicones', metadata={'description': 'A group of semi-liquid substances derived from silica that are best known for their occlusive properties.'})
    other = CategoryNode('other', metadata={'description': 'Any other, uncategorized ingredients.'})
    
    # root node
    root = RootNode('root', children=[irritants, actives, hydrators, botanicals, silicones, oils, other])

    ing_tree = IngTree(root)
    
    for ing_query in all_ings:
        ing_name = ing_query.name
        
        ing_tree_details = crud.check_active_ingredient(ing_name)
        ing_metadata = {
            'id': ing_query.id,
            'impact': ing_tree_details['impact']
        }
        ing_value = crud.get_product_count_by_ingredient(ing_query.id)
        
        parent_node = ing_tree.find_in_tree(ing_tree_details['parent'])
        
        parent_node.children.append(IngNode(
            name=ing_name, 
            metadata=ing_metadata, 
            value=ing_value
        ))
    

    with open('data/ingredient_tree_reduced_2.json', 'w') as outfile:
        json.dump(root.__dict__, outfile, default=lambda o: o.__dict__)

    # return json.dumps(root.__dict__, default=lambda o: o.__dict__)