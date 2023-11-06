from fastapi import FastAPI
from menu import router as menu_router
from ingredients import router as ingredient_router
from menu_item_ingredients import router as composition_router
from customer_ingredient_customization import router as customization_router

app = FastAPI(
    docs_url="/docs",
    redoc_url="/redoc"
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

app.include_router(menu_router, prefix="/menu_items")
app.include_router(ingredient_router, prefix="/ingredients")
app.include_router(composition_router, prefix="/menu_item_ingredients")
app.include_router(customization_router, prefix="/customer_ingredient_customization")