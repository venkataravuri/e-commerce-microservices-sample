from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from db.models.user import User, UserIn, UserOut
from db.config import async_session, engine, Base
import uvicorn
from routers.user_router import router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer

import os

# create db session
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

# create FastAPI instance
app = FastAPI()
# import routers
app.include_router(router)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# 환경 변수 사용
app_host = os.getenv("APP_HOST")
app_port = int(os.getenv("APP_PORT"))  # port는 정수
app_reload = os.getenv("APP_RELOAD").lower() == 'true'  # reload는 불리언

cors_origins = list(os.getenv("CORS_ORIGINS").split(','))

@app.on_event("startup")
async def startup():
    # create db tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)    

origins = cors_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    uvicorn.run("app:app", host=app_host, port=app_port, reload=app_reload)