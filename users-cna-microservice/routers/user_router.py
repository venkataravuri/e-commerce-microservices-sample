from typing import List, Optional

from fastapi import APIRouter, Depends

from db.dals.user_dal import UserDAL
from db.models.user import User
from dependencies import get_user_dal

router = APIRouter()


@router.post("/users")
async def create_user(name: str, email: str, mobile: str, user_dal: UserDAL = Depends(get_user_dal)):
    print("name: " + name)
    return await user_dal.create_user(name, email, mobile)


@router.put("/users/{user_id}")
async def update_user(user_id: int, name: Optional[str] = None, email: Optional[str] = None, mobile: Optional[str] = None,
                      user_dal: UserDAL = Depends(get_user_dal)):
    return await user_dal.update_user(user_id, name, email, mobile)

@router.get("/users/{user_id}")
async def get_user(user_id: int, user_dal: UserDAL = Depends(get_user_dal)):
    return await user_dal.get_user(user_id)

@router.get("/users")
async def get_all_users(user_dal: UserDAL = Depends(get_user_dal)) -> List[User]:
    return await user_dal.get_all_users()