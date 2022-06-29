from typing import List, Optional

from sqlalchemy import update
from sqlalchemy.future import select
from sqlalchemy.orm import Session

from db.models.user import User

class UserDAL():
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def create_user(self, name: str, email: str,   mobile: str):
        new_user = User(name=name,email=email, mobile=mobile)
        self.db_session.add(new_user)
        await self.db_session.flush()

    async def get_all_users(self) -> List[User]:
        q = await self.db_session.execute(select(User).order_by(User.id))
        return q.scalars().all()

    async def get_user(self, user_id: str) -> User:
        q = await self.db_session.execute(select(User).where(User.id == user_id))
        return q.scalar()

    async def update_user(self, user_id: int, name: Optional[str], email: Optional[str], mobile: Optional[str]):
        q = update(User).where(User.id == user_id)
        if name:
            q = q.values(name=name)
        if email:
            q = q.values(email=email)
        if mobile:
            q = q.values(mobile=mobile)
        q.execution_options(synchronize_session="fetch")
        await  self.db_session.execute(q)