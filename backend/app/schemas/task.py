from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str | None = Field(default=None, max_length=1000)


class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=200)
    description: str | None = Field(default=None, max_length=1000)
    is_done: bool | None = None


class TaskOut(BaseModel):
    id: int
    title: str
    description: str | None
    is_done: bool
    owner_id: int

    class Config:
        from_attributes = True
