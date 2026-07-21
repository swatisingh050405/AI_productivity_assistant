from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.auth_models import (
    SignupRequest,
    LoginRequest,
    TokenResponse,
)

from app.crud.auth_crud import (
    create_user,
    get_user_by_email,
)

from app.core.security import (
    verify_password,
    create_access_token,
)
from app.core.security import get_current_user
from app.models.user_model import User

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.get("/me")
def me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
    }


@router.post("/signup")
def signup(
    request: SignupRequest,
    db: Session = Depends(get_db),
):
    existing_user = get_user_by_email(
        db,
        request.email,
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered.",
        )

    user = create_user(
        db,
        request.name,
        request.email,
        request.password,
    )

    return {
        "message": "Account created successfully.",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        },
    }


@router.post(
    "/login",
    response_model=TokenResponse,
)


def login(
    request: LoginRequest,
    db: Session = Depends(get_db),
):
    user = get_user_by_email(
        db,
        request.email,
    )

    if (
        not user
        or not verify_password(
            request.password,
            user.hashed_password,
        )
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    token = create_access_token(
        {
            "sub": str(user.id),
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }