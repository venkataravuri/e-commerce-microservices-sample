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

@app.on_event("startup")
async def startup():
    # create db tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)    
    
    async with async_session() as session:
        async with session.begin():
            session.add_all([
                User(name = 'Peter', email = 'peter@exmaple.com', mobile='298479284'),
                User(name = 'John', email = 'john@exmaple.com', mobile='998479284'),
                User(name = 'Jason', email = 'jason@exmaple.com', mobile='928479285')]
            )
        await session.commit()



if __name__ == '__main__':
    uvicorn.run("app:app", port=9090, host='127.0.0.1', reload=True)