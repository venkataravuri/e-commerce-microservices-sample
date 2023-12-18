from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "sqlite+aiosqlite:///./test.db"

# 비동기식 SQLAlchemy 엔진 생성
engine = create_async_engine(DATABASE_URL, future=True, echo=True)
# 세션 생성을 위한 팩토리 생성
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
# 데이터베이스 모델 클래스의 베이스 클래스 생성
Base = declarative_base()