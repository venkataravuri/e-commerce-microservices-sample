from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from db.dals.user_dal import UserDAL
from db.models.user import UserIn, UserOut,LoggedInUserInfo, SignInRequest
from dependencies import get_user_dal
from jose import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

router = APIRouter()

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.get("/")
async def root():
    return {"message": "Hello World"}

@router.get("/users/{user_id}", response_model=UserOut)
async def get_user(user_id: int, user_dal: UserDAL = Depends(get_user_dal)):
    db_user = await user_dal.get_user(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/users", response_model=List[UserOut])
async def get_all_users(user_dal: UserDAL = Depends(get_user_dal)):
    return await user_dal.get_all_users()

@router.post("/users", response_model=UserOut)
async def create_user(user: UserIn, user_dal: UserDAL = Depends(get_user_dal)):
    db_user = await user_dal.get_user_by_email(user.email)
    print(db_user)
    if db_user:
        print(db_user)
        raise HTTPException(status_code=400, detail="🎃Email already registered")
    return await user_dal.create_user(user)

@router.post("/sign-in", response_model=LoggedInUserInfo)
async def verify_user(sign_in_request: SignInRequest, user_dal: UserDAL = Depends(get_user_dal)):
    db_user = await user_dal.verify_user(sign_in_request.email, sign_in_request.password)
    if db_user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
      data={"sub": db_user.email}, expires_delta=access_token_expires
    )

    return {"accessToken": access_token, "tokenType": "bearer", "loggedInUserEmail": db_user.email ,"loggedInUserName": db_user.name}

@router.put("/users/{user_id}", response_model=UserOut)
async def update_user(user_id: int, user: UserIn, user_dal: UserDAL = Depends(get_user_dal)):
    db_user = await user_dal.get_user(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return await user_dal.update_user(user_id, user)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt