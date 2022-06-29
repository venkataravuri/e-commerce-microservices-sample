from fastapi import FastAPI
import uvicorn

from db.config import engine, Base
from routers import user_router
from fastapi import Depends
from db.config import async_session
from db.models.user import User

app = FastAPI()
app.include_router(user_router.router)


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