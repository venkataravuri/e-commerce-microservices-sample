from typing import List, Optional
from sqlalchemy import update
from sqlalchemy.future import select
from sqlalchemy.orm import Session
from db.models.user import User, UserIn, UserOut
from werkzeug.security import check_password_hash,generate_password_hash
class UserDAL():
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def create_user(self, user: UserIn) -> UserOut:
        hashed_password = generate_password_hash(user.password)
        new_user = User(name=user.name, email=user.email, password=hashed_password)
        self.db_session.add(new_user)
        await self.db_session.flush()
        return UserOut.from_orm(new_user)

    async def verify_user(self, email: str, password: str) -> UserOut:
        queryResult = await self.db_session.execute(select(User).where(User.email == email))
        user = queryResult.scalar()
        if user is None:
            return None
        if not check_password_hash(user.password, password):
            return None
        return UserOut.from_orm(user)

    async def get_all_users(self) -> List[UserOut]:
        queryResult = await self.db_session.execute(select(User).order_by(User.id))
        return [UserOut.from_orm(user) for user in queryResult.scalars().all()]

    async def get_user(self, user_id: str) -> UserOut:
        queryResult = await self.db_session.execute(select(User).where(User.id == user_id))
        return UserOut.from_orm(queryResult.scalar())

    async def update_user(self, user_id: int, user: UserIn) -> UserOut:
        queryResult = update(User).where(User.id == user_id).values(name=user.name, email=user.email, password=user.password)
        queryResult.execution_options(synchronize_session="fetch")
        await self.db_session.execute(queryResult)
        updated_user = await self.get_user(user_id)
        return updated_user
    async def get_user_by_email(self, email: str) -> UserOut:
        queryResult = await self.db_session.execute(select(User).where(User.email == email))
        result = queryResult.scalar()
        if result is None:
            return None
        return UserOut.from_orm(result)
    

  