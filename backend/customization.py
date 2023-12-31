from fastapi import APIRouter, HTTPException, Depends, status, Request, Form
from fastapi.encoders import jsonable_encoder
import json
from pydantic import BaseModel
import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.hash import bcrypt
from ingredients import check_ingredient
from authentication import *
from typing import List

class Ingredient(BaseModel):
    ingredient_id: int
    adjusted_quantity: float

class Customization_Item(BaseModel):
    custom_id: int
    Ingredients: List[Ingredient]
    order_id: int

json_filename="data/customization.json"
json_filename1="data/order.json"
json_filename2="data/menu_items.json"
json_filename3="data/ingredients.json"
json_filename4="data/composition.json"

with open(json_filename,"r") as read_file:
    data = json.load(read_file)
with open(json_filename1,"r") as read_file:
    data1 = json.load(read_file)
with open(json_filename2,"r") as read_file:
    data2 = json.load(read_file)
with open(json_filename3,"r") as read_file:
    data3 = json.load(read_file)
with open(json_filename4,"r") as read_file:
    data4 = json.load(read_file)

router = APIRouter(tags=["Customization"])

@router.get('/')
async def read_all_customization(user: User = Depends(get_current_user)):
    return data

@router.post('/')
async def create_customization(customization_item: Customization_Item, user: User = Depends(get_current_user)):
    existing_custom_ids = [customization.get('custom_id', 0) for customization in data]
    new_custom_id = max(existing_custom_ids, default=0) + 1

    ingredients_encoded = jsonable_encoder(customization_item.Ingredients)  # Convert Ingredient objects to dict

    existing_order_ids = [order.get('order_id', 0) for order in data1['order']]
    new_order_id = max(existing_order_ids, default=0) + 1

    new_customization = {
        "custom_id": new_custom_id,
        "Ingredients": ingredients_encoded,  # Use the encoded ingredients
        "order_id": new_order_id
    }
    data.append(new_customization)

    with open(json_filename, "w") as write_file:
        json.dump(data, write_file, indent=2)

    return new_customization

@router.get('/history', response_model=List[dict])
async def read_history(user: User = Depends(get_current_user)):
    orders = data1["order"]
    menu_items = data2["menu_items"]
    ingredients = data3["ingredients"]
    composition = data4["composition"]
    customizations = data

    history_data = []
    for order in orders:
        menu_id = order['menu_id']
        menu_quantity = order['menu_quantity']

        menu_detail = next((menu for menu in menu_items if menu['menu_id'] == menu_id), None)

        if menu_detail:
            menu_composition = [comp for comp in composition if comp['menu_id'] == menu_id]
            customization = next((custom for custom in customizations if custom['order_id'] == order['order_id']), None)
            history_item = {
                "order_id": order['order_id'],
                "custom_id": customization['custom_id'] if customization else None,
                "customer_id": order['customer_id'],
                "menu_id": menu_id,
                "menu_quantity": menu_quantity,
                "menu_name": menu_detail['menu_name'],
                "price": menu_detail['price'],
                "duration": menu_detail['duration'],
                "calories": menu_detail['calories'],
                "level": menu_detail['level'],
                "description": menu_detail['description'],
                "menu_url": menu_detail['menu_url'],
                "ingredients": []
            }

            for comp_item in menu_composition:
                ingredient_id = comp_item['ingredient_id']
                ingredient_detail = next((ing for ing in ingredients if ing['ingredient_id'] == ingredient_id), None)
                
                adjusted_quantity = None
                if customization:
                    for ing in customization['ingredients']:
                        if ingredient_id == ing['ingredient_id']:
                            adjusted_quantity = ing['adjusted_quantity']
                
                if ingredient_detail:
                    ingredient_data = {
                        "ingredient_id": ingredient_id,
                        "ingredient_name": ingredient_detail['ingredient_name'],
                        "ingredient_url": ingredient_detail['ingredient_url'],
                        "default_quantity": comp_item['default_quantity'],
                        "adjusted_quantity": adjusted_quantity,
                        "unit": comp_item['unit']
                    }
                    history_item['ingredients'].append(ingredient_data)

            history_data.append(history_item)

    return history_data