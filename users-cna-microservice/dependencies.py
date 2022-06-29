
from db.config import async_session
from db.dals.user_dal import UserDAL


async def get_user_dal():
    async with async_session() as session:
        async with session.begin():
            yield UserDAL(session)