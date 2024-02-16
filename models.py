from sqlalchemy import Column, Integer, ForeignKey,  String, CHAR
from sqlalchemy.orm import declarative_base
from db import engine
Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username= Column(String)
    password = Column(String)
    email = Column(String)

class Token(Base):
    __tablename__ = "tokens"

    id = Column(Integer, primary_key=True)
    user_id= Column(Integer)
    token = Column(String)



class Playlists(Base):
    __tablename__ = "playlists"

    id = Column(Integer, primary_key=True)
    name = Column(CHAR)

class allplaylists(Base):
    __tablename__ = "allplaylists"

    allplaylists_id = Column(Integer, primary_key=True)
    user_id = Column(ForeignKey("users.id"))
    playlists_id = Column( ForeignKey("Playlists.id"))

# class Token(Base):
#       access_token: str
#       token_type: str

# class User(Base):
#       username: str
    
Base.metadata.create_all(engine)
