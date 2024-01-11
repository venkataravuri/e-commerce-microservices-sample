from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
import os

# 환경 변수 사용
db_engine = os.getenv("DB_ENGINE")
db_username = os.getenv("DB_USERNAME")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_name = os.getenv("DB_NAME")

# 데이터베이스 연결 문자열 생성
DATABASE_URL = f"{db_engine}://{db_username}:{db_password}@{db_host}/{db_name}"

# 비동기식 SQLAlchemy 엔진 생성
engine = create_async_engine(DATABASE_URL, future=True, echo=True)
# 세션 생성을 위한 팩토리 생성
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
# 데이터베이스 모델 클래스의 베이스 클래스 생성
Base = declarative_base()