from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import  session

from models import User, Token, Playlists, allplaylists
app = FastAPI()

# Setup our origins...
# ...for now it's just our local environments
origins = [
    "http://localhost",
    "http://localhost:3000",
]

# Add the CORS middleware...
# ...this will pass the proper CORS headers
# https://fastapi.tiangolo.com/tutorial/middleware/
# https://fastapi.tiangolo.com/tutorial/cors/
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Root Route"}

@app.get('/users')
def get_users():
    users = session.query(User)
    print(users)
    print(User)
    return users.all()

@app.get('/playlists')
def get_playlists():
    playlists = session.query(Playlists)
    print(playlists)
    print(Playlists)
    return playlists.all()

@app.get('/allplaylist')
def get_allplaylists():
    playlists = session.query(allplaylists, User, Playlists).join(User, User.id == allplaylists.user_id).join(Playlists, Playlists.id == allplaylists.playlists_id)
    results = playlists.all()
    playlist_list = []
    for playlists in results:
        playlist_dict = {
            "all_playlists_id": playlists.allplaylists.playlists_id, 
            "user_name": playlists.User.username,
            "playlists_name": playlists.Playlists.name,
        }
        print(Playlists)
        print(playlist_dict)
        print(playlists)
        print(playlist_list)
        playlist_list.append(playlist_dict)
    return playlist_list 

    

@app.post("/create/")
async def create_User(username: str, password: str, email: str):
    item = User(username = username, password = password, email = email)
    session.add(item)
    session.commit()
    session.close()
    return {"user added"}

@app.post("/create/playlist")
async def add_Playlists(name: str):
    playlists = Playlists(name=name, )
    session.add(playlists)
    session.commit()
    return {"playlist added": playlists.name}

@app.put('/user/{id}/update')
async def update_id(id: int, name: str = None):
    new_users = session.query(User).filter(User.id == id).first()
    if new_users is not None:
        if name:
            new_users.username = name
        session.add(new_users)
        session.commit()
        return {"Updated student": new_users.username}
    else:
        return {"message": "User ID not found"}
    
@app.put('/playlist/{id}/update')
async def update_playlist(id: int, name: str = None):
    new_playlist = session.query(Playlists).filter(Playlists.id == id).first()
    if new_playlist is not None:
        if name:
            new_playlist.name = name
        session.add(new_playlist)
        session.commit()
        return {"Updated playlist": new_playlist.name}
    else:
        return {"message": "playlist ID not found"}

@app.delete('/user/{id}/delete')
async def remove_user(id: int):
    user = session.query(User).filter(User.id == id).first()
    if user is not None:
        session.delete(user)
        session.commit()
        return {"Deleted user": user.username}
    else:
        return {"message": "User ID not found"}
    
@app.delete('/playlist/{id}/delete')
async def remove_user(id: int):
    playlist = session.query(Playlists).filter(Playlists.id == id).first()
    if playlist is not None:
        session.delete(playlist)
        session.commit()
        return {"Deleted playlist": playlist.name}
    else:
        return {"message": "Playlist ID not found"}

