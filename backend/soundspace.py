import requests

SOUND_SPACE_BASE_URL = "http://soundspace.aedmg0hfejf2bhhf.southeastasia.azurecontainer.io/docs"

def get_token():
    token_response = requests.post(f"{SOUND_SPACE_BASE_URL}/token", data= {
        'username': 'marvel',
        'password': '12345678'
    })
    if token_response.status_code == 200:
        token = token_response.json().get('access_token')
        return token
    else:
        print("Failed to fetch token:", token_response.status_code, token_response.text)
        return None