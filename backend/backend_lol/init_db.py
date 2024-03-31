from models import Base
from sqlalchemy import create_engine

db_path = "sqlite:///backend/backend_lol/database.db"

engine = create_engine(db_path)

try:
    conn = engine.connect()
    print("Success !")
    Base.metadata.drop_all(bind=conn)
    Base.metadata.create_all(bind=conn)

except Exception as e:
    print(e)
