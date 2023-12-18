from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    mobile = Column(String, unique=True, index=True)

class UserBase(BaseModel):
    name: str
    email: str
    mobile: int

class UserIn(UserBase):
    pass

class UserOut(UserBase):
    id: int

#'orm_mode' has been renamed to 'from_attributes'
    class Config:
        from_attributes = True