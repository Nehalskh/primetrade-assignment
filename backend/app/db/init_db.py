from app.db.session import engine
from app.models.user import Base as UserBase
from app.models.task import Base as TaskBase


def init_db() -> None:
    UserBase.metadata.create_all(bind=engine)
    TaskBase.metadata.create_all(bind=engine)
