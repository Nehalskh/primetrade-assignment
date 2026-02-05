from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "PrimeTrade Assignment API"
    API_V1_PREFIX: str = "/api/v1"

    # For dev use SQLite by default. For Postgres, set DATABASE_URL in env.
    DATABASE_URL: str = "sqlite:///./app.db"

    JWT_SECRET_KEY: str = "CHANGE_ME_SUPER_SECRET"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"


settings = Settings()
