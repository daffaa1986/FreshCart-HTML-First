from fastapi import FastAPI

app = FastAPI(title="FreshCart API", version="0.1.0")

@app.get("/health")
def health():
    return {"status": "healthy", "service": "freshcart-api", "note": "Starter endpoint; database is not connected yet."}
