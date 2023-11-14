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

class Customization_Item(BaseModel):
    custom_id: int
    order_id: int
    customer_id: int
    menu_id: int
    ingredient_id: int
    adjusted_quantity: float

json_filename="data/customer_ingredient_customization.json"

with open(json_filename,"r") as read_file:
    data = json.load(read_file)

router = APIRouter(tags=["Customization"])

@router.get('/')
async def read_all_customization(user: User = Depends(get_current_user)):
    return data['customer_ingredient_customization']

@router.get('/{order_id}')
async def read_order_customization(order_id: int, user: User = Depends(get_current_user)):
    list_customization = []
    order_found = 0
    for customization_item in data['customer_ingredient_customization']:
        print(customization_item)
        if customization_item['order_id'] == order_id:
            order_found += 1
            list_customization.append(customization_item)
    if order_found != 0:
        return list_customization
    else:
        raise HTTPException(
            status_code=404, detail=f'Order not found!'
        )

@router.get('/{customer_id}')
async def read_customer_customization(customer_id: int, user: User = Depends(get_current_user)):
    list_customization = []
    customer_found = 0
    for customization_item in data['customer_ingredient_customization']:
        print(customization_item)
        if customization_item['customer_id'] == customer_id:
            customer_found += 1
            list_customization.append(customization_item)
    if customer_found != 0:
        return list_customization
    else:
        raise HTTPException(
            status_code=404, detail=f'Customer not found!'
        )

@router.get('/{menu_id}')
async def read_menu_customization(menu_id: int, user: User = Depends(get_current_user)):
    list_customizaton = []
    menu_found = 0
    for customization_item in data['customer_ingredient_customization']:
        print(customization_item)
        if customization_item['menu_id'] == menu_id:
            menu_found += 1
            list_customizaton.append(customization_item)
    if menu_found != 0:
        return list_customizaton
    else:
        raise HTTPException(
            status_code=404, detail=f'Menu not found!'
        )

@router.get('/{ingredient_id}')
async def read_ingredient_customization(ingredient_id: int, user: User = Depends(get_current_user)):
    list_customization = []
    ingredient_found = 0
    for customization_item in data['customer_ingredient_customization']:
        print(customization_item)
        if customization_item['ingredient_id'] == ingredient_id:
            ingredient_found += 1
            list_customization.append(customization_item)
    if ingredient_found != 0:
        return list_customization
    else:
        raise HTTPException(
            status_code=404, detail=f'Ingredient not found!'
        )

@router.post('/')
async def add_customization(item: Customization_Item, user: User = Depends(get_current_user)):
    item_dict = item.dict()
    if check_menu(item_dict['menu_id']) != None:
        if check_ingredient(item_dict['ingredient_id']) != None:
            item_found = False
            for customization_item in data['customer_ingredient_customization']:
                if (customization_item['menu_id'] == item_dict['menu_id']) and (customization_item['ingredient_id'] == item_dict['ingredient_id']):
                    item_found = True
                    update_customization(item)
            if not item_found:
                data['customer_ingredient_customization'].append(item_dict)
                with open(json_filename, "w") as write_file:
                    json.dump(data, write_file)
                return item_dict
            raise HTTPException(
                status_code=404, detail=f'Item not found!'
            )

@router.put('/')
async def update_customization(item: Customization_Item, user: User = Depends(get_current_user)):
    item_dict = item.dict()
    item_found = False
    for customization_idx, customization_item in enumerate(data['customer_ingredient_customization']):
        if (customization_item['menu_id'] == item_dict['menu_id']) and (customization_item['ingredient_id'] == item_dict['ingredient_id']):
            item_found = True
            data['customer_ingredient_customization'][customization_idx] = item_dict
            with open(json_filename, "w") as write_file:
                json.dump(data, write_file)
            return "Customization updated!"
    if not item_found:
        return "Menu ID or Ingredient ID not found!"
    raise HTTPException(
        status_code=404, detail=f'Item not found!'
    )