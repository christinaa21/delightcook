import requests
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from authentication import *
from typing import Optional

class CreateSessionModel(BaseModel):
    studio_name: str
    session_date: str
    session_time: str
    genre: Optional[str] = None
    theme: Optional[str] = None
    max_participants: int
    total_fee: int

SOUND_SPACE_BASE_URL = "http://soundspace.aedmg0hfejf2bhhf.southeastasia.azurecontainer.io"

router = APIRouter(tags=["SoundSpace"])

def get_token():
    token_response = requests.post(f"{SOUND_SPACE_BASE_URL}/token", data= {
        'username': 'DelightCook',
        'password': 'delightcook'
    })
    if token_response.status_code == 200:
        token = token_response.json().get('access_token')
        return token
    else:
        print("Failed to fetch token:", token_response.status_code, token_response.text)
        return None
    
def create_sessions_to_soundspace(sessions):
    token = get_token()
    if not token:
        print("No token available")
        return None
    
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(
        f"{SOUND_SPACE_BASE_URL}/sessions",
        headers=headers,
        json=sessions
    )
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to create session:", response.status_code, response.text)
        return None
    
@router.post("/")
async def create_session(session_data: CreateSessionModel, current_user: User = Depends(get_current_user)):
    session = session_data.dict()
    session_response = create_sessions_to_soundspace(session)

    if session_response:
        return session_response
    else:
        raise HTTPException(status_code=400, detail="Failed to create session in Sound Space")