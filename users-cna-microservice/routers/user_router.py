from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from db.dals.user_dal import UserDAL
from db.models.user import UserIn, UserOut
from dependencies import get_user_dal

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Hello World"}

@router.post("/users", response_model=UserOut)
async def create_user(user: UserIn, user_dal: UserDAL = Depends(get_user_dal)):
    db_user = await user_dal.get_user_by_email(user.email)
    print(db_user)
    if db_user:
        print(db_user)
        raise HTTPException(status_code=400, detail="🎃Email already registered")
    return await user_dal.create_user(user)


@router.put("/users/{user_id}", response_model=UserOut)
async def update_user(user_id: int, user: UserIn, user_dal: UserDAL = Depends(get_user_dal)):
    db_user = await user_dal.get_user(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return await user_dal.update_user(user_id, user)

@router.get("/users/{user_id}", response_model=UserOut)
async def get_user(user_id: int, user_dal: UserDAL = Depends(get_user_dal)):
    db_user = await user_dal.get_user(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/users", response_model=List[UserOut])
async def get_all_users(user_dal: UserDAL = Depends(get_user_dal)):
    return await user_dal.get_all_users()

@router.post("/sign-in", response_model=UserOut)
async def verify_user(email: str, password: str, user_dal: UserDAL = Depends(get_user_dal)):
    db_user = await user_dal.verify_user(email, password)
    if db_user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return db_user