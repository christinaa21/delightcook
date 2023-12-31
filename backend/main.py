from fastapi import FastAPI
from menu import router as menu_router
from ingredients import router as ingredient_router
from composition import router as composition_router
from customization import router as customization_router
from authentication import router as authentication_router
from soundspace import router as soundspace_router
from order import router as order_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this based on your frontend's domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

app.include_router(menu_router, prefix="/menu_items")
app.include_router(ingredient_router, prefix="/ingredients")
app.include_router(composition_router, prefix="/composition")
app.include_router(customization_router, prefix="/customization")
app.include_router(authentication_router)
app.include_router(order_router, prefix="/order")
app.include_router(soundspace_router, prefix="/soundspace")