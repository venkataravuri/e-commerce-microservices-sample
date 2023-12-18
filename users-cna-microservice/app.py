from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from db.models.user import User, UserIn, UserOut
from db.config import async_session, engine, Base
import uvicorn
from routers.user_router import router

# create db session
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

# create FastAPI instance
app = FastAPI()

# import routers
app.include_router(router)

# Define a Pydantic model for User input data
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/users/")
async def create_user(user: UserIn):
    # Create a new session
    async with async_session() as session:
        # Create a new user instance
        db_user = User(name=user.name, email=user.email, mobile=user.mobile)
        # Add the user instance to the session
        session.add(db_user)
        # Commit the session to the database
        await session.commit()
        # Return the created user
        return db_user

async def startup():
    # create initial data
    async with async_session() as session:
        session.add_all([
            User(name='Peter', email='peter@example.com', mobile='298479284'),
            User(name='John', email='john@example.com', mobile='998479284'),
            User(name='Jason', email='jason@example.com', mobile='928479285')]
        )
        await session.commit()

if __name__ == '__main__':
    uvicorn.run("app:app", port=9090, host='127.0.0.1', reload=True)