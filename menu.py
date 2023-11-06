from fastapi import APIRouter, HTTPException
import json
from pydantic import BaseModel


class Menu_Item(BaseModel):
	menu_id: int
	menu_name: str
	price: int
	duration: int
	calories: float
	level: str
	description: str

json_filename="data/menu_items.json"

with open(json_filename,"r") as read_file:
	data = json.load(read_file)

router = APIRouter()

@router.get('/')
async def read_all_menu():
	return data['menu_items']

@router.get('/{menu_id}')
async def check_menu(menu_id: int):
	menu_found = False
	for menu_item in data['menu_items']:
		print(menu_item)
		if menu_item['menu_id'] == menu_id:
			menu_found = True
	return menu_found

@router.get('/{menu_id}')
async def read_menu(menu_id: int):
	for menu_item in data['menu_items']:
		print(menu_item)
		if menu_item['menu_id'] == menu_id:
			return menu_item
	raise HTTPException(
		status_code=404, detail=f'Menu not found!'
	)

@router.post('/')
async def add_menu(item: Menu_Item):
	item_dict = item.dict()
	item_found = False
	for menu_item in data['menu_items']:
		if menu_item['menu_id'] == item_dict['menu_id']:
			item_found = True
			return "Menu ID "+str(item_dict['menu_id'])+" exists."
	
	if not item_found:
		data['menu_items'].append(item_dict)
		with open(json_filename,"w") as write_file:
			json.dump(data, write_file)
		return item_dict
	
	raise HTTPException(
		status_code=404, detail=f'Item not found!'
	)

@router.put('/')
async def update_menu(item: Menu_Item):
	item_dict = item.dict()
	item_found = False
	for menu_idx, menu_item in enumerate(data['menu_items']):
		if menu_item['menu_id'] == item_dict['menu_id']:
			item_found = True
			data['menu_items'][menu_idx]=item_dict
			
			with open(json_filename,"w") as write_file:
				json.dump(data, write_file)
			return "Menu updated!"
	
	if not item_found:
		return "Menu ID not found!"
	raise HTTPException(
		status_code=404, detail=f'Item not found!'
	)

@router.delete('/{menu_id}')
async def delete_menu(menu_id: int):
	item_found = False
	for menu_idx, menu_item in enumerate(data['menu_items']):
		if menu_item['menu_id'] == menu_id:
			item_found = True
			data['menu_items'].pop(menu_idx)
			
			with open(json_filename,"w") as write_file:
				json.dump(data, write_file)
			return "Menu deleted!"
	
	if not item_found:
		return "Menu ID not found!"
	raise HTTPException(
		status_code=404, detail=f'Item not found!'
	)
