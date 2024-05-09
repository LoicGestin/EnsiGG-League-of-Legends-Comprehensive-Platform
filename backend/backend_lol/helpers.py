from fastapi import HTTPException


def http_error_handler(message: str) -> HTTPException:
    return HTTPException(
        404,
        {
            "status": {
                "status_code": 404,
                "message": message,
            }
        },
    )
