from sqlalchemy import Column, Integer, String

from db.config import Base

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    mobile = Column(Integer, nullable=False)