from fastapi import FastAPI
import uvicorn
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from db.models.user import User
from db.config import engine, Base

# create db tables
Base.metadata.create_all(bind=engine)

# create db session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# create FastAPI instance
app = FastAPI()

# import routers
app.include_router(user_router.router)

# @app.on_event("startup")를 사용하여 초기 데이터를 생성할 수 있습니다.
# type initial data creation code here

@app.on_event("startup")
async def startup():
    # create initial data
    async with SessionLocal() as session:
        async with session.begin():
            session.add_all([
                User(name='Peter', email='peter@example.com', mobile='298479284'),
                User(name='John', email='john@example.com', mobile='998479284'),
                User(name='Jason', email='jason@example.com', mobile='928479285')]
            )
        await session.commit()


if __name__ == '__main__':
    uvicorn.run("app:app", port=9090, host='127.0.0.1', reload=True)
