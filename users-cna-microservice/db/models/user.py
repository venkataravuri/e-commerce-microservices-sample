from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base
from db.config import Base
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True)

class UserBase(BaseModel):
    name: str
    email: str
    password: str

class UserIn(UserBase):
    pass

class UserOut(UserBase):
    id: int

#'orm_mode' has been renamed to 'from_attributes'
    class Config:
        from_attributes = True

class LoggedInUserInfo(BaseModel):
    accessToken: str
    tokenType: str
    loggedInUserEmail: str
    loggedInUserName: str


class SignInRequest(BaseModel):
    email: str
    password: str