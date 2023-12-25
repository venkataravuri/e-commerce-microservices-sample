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

# create db session
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

# create FastAPI instance
app = FastAPI()
# import routers
app.include_router(router)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.on_event("startup")
async def startup():
    # create db tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)    

origins = [
    "http://localhost:3000",  # React 앱이 실행되는 주소
    # 필요한 경우 다른 도메인 추가
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    uvicorn.run("app:app", port=9090, host='127.0.0.1', reload=True)