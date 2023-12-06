from fastapi import APIRouter, HTTPException, Depends, status, Request, Form
from fastapi.encoders import jsonable_encoder
import json
from pydantic import BaseModel
import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.hash import bcrypt
from authentication import *

class Order_Item(BaseModel):
	order_id: int
	customer_id: int
	menu_id: int

json_filename = "data/order.json"

with open(json_filename,"r") as read_file:
	data = json.load(read_file)

router = APIRouter(tags=["Order"])

@router.get('/')
async def read_all_order(user: User = Depends(get_current_user)):
	return data['order']

@router.get('/{order_id}')
async def read_order(order_id: int, user: User = Depends(get_current_user)):
	for order_item in data['order']:
		print(order_item)
		if order_item['order_id'] == order_id:
			return order_item
	raise HTTPException(
		status_code=404, detail=f'Order not found!'
    )

@router.post('/')
async def add_order(item: Order_Item, user: User = Depends(get_current_user)):
	item_dict = item.dict()
	item_found = False
	for order_item in data['order']:
		if order_item['order_id'] == item_dict['order_id']:
			item_found = True
			return "order ID "+str(item_dict['order_id'])+" exists."
	
	if not item_found:
		data['order'].append(item_dict)
		with open(json_filename,"w") as write_file:
			json.dump(data, write_file)

		return item_dict
	raise HTTPException(
		status_code=404, detail=f'Item not found!'
	)