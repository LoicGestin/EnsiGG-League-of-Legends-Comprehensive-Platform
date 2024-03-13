from sqlalchemy import create_engine


def init_services():
    db_path = "sqlite:///database.db"

    engine = create_engine(db_path)

    conn = engine.connect()
    return conn
