from fastapi import APIRouter, HTTPException, Depends, status, Request, Form
from fastapi.encoders import jsonable_encoder
import json
from pydantic import BaseModel
import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.hash import bcrypt
from menu import check_menu
from ingredients import check_ingredient
from authentication import *

class Composition_Item(BaseModel):
    menu_id: int
    ingredient_id: int
    default_quantity: float
    unit: str

json_filename="data/menu_item_ingredients.json"

with open(json_filename,"r") as read_file:
    data = json.load(read_file)

router = APIRouter(tags=["Composition"])

@router.get('/')
async def read_all_composition(user: User = Depends(get_current_user)):
    return data['menu_item_ingredients']

@router.get('/{menu_id}')
async def read_menu_composition(menu_id: int, user: User = Depends(get_current_user)):
    list_composition = []
    menu_found = 0
    for composition_item in data['menu_item_ingredients']:
        print(composition_item)
        if composition_item['menu_id'] == menu_id:
            menu_found += 1
            list_composition.append(composition_item)
    if menu_found != 0:
        return list_composition
    else:
        raise HTTPException(
            status_code=404, detail=f'Menu not found!'
        )

@router.get('/{ingredient_id}')
async def read_menu_with_this_ingredient(ingredient_id: int, user: User = Depends(get_current_user)):
    list_composition = []
    ingredient_found = 0
    for composition_item in data['menu_item_ingredients']:
        print(composition_item)
        if composition_item['ingredient_id'] == ingredient_id:
            ingredient_found += 1
            list_composition.append(composition_item)
    if ingredient_found != 0:
        return list_composition
    else:
        raise HTTPException(
            status_code=404, detail=f'Ingredient not found!'
        )

@router.post('/')
async def add_menu_composition(item: Composition_Item, user: User = Depends(get_current_user)):
    item_dict = item.dict()
    if check_menu(item_dict['menu_id']) == True:
        if check_ingredient(item_dict['ingredient_id']) == True:
            item_found = False
            for composition_item in data['menu_item_ingredients']:
                if (composition_item['menu_id'] == item_dict['menu_id']) and (composition_item['ingredient_id'] == item_dict['ingredient_id']):
                    item_found = True
                    return "Menu ID "+str(item_dict['menu_id'])+" and ingredient ID "+str(item_dict['ingredient_id'])+" exists."
            if not item_found:
                data['menu_item_ingredients'].append(item_dict)
                with open(json_filename, "w") as write_file:
                    json.dump(data, write_file)
                return item_dict
            raise HTTPException(
                status_code=404, detail=f'Item not found!'
            )

@router.put('/')
async def update_menu_composition(item: Composition_Item, user: User = Depends(get_current_user)):
    item_dict = item.dict()
    item_found = False
    for composition_idx, composition_item in enumerate(data['menu_item_ingredients']):
        if (composition_item['menu_id'] == item_dict['menu_id']) and (composition_item['ingredient_id'] == item_dict['ingredient_id']):
            item_found = True
            data['menu_item_ingredients'][composition_idx] = item_dict
            with open(json_filename, "w") as write_file:
                json.dump(data, write_file)
            return "Composition updated!"
    if not item_found:
        return "Menu ID or Ingredient ID not found!"
    raise HTTPException(
        status_code=404, detail=f'Item not found!'
    )