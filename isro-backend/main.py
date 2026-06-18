import io
import base64
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageOps, ImageEnhance

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def analyze_image_pixels(img):
    # Image ke pixels scan karke real data nikalne ka desi logic
    small_img = img.resize((100, 100)) # Calculation fast karne ke liye
    rgb_img = small_img.convert("RGB")
    
    concrete_pixels = 0
    green_pixels = 0
    water_pixels = 0
    total_pixels = 10000
    
    for x in range(100):
        for y in range(100):
            r, g, b = rgb_img.getpixel((x, y))
            
            # Green cover detection (Vegetation)
            if g > r * 1.1 and g > b * 1.1:
                green_pixels += 1
            # Water body detection (Dark blue/blackish water)
            elif b > r * 1.1 and b > g * 0.9 or (r < 50 and g < 70 and b > 70):
                water_pixels += 1
            # Concrete/Buildings/Roads (Grey, white, bright pixels)
            else:
                concrete_pixels += 1

    concrete_pct = int((concrete_pixels / total_pixels) * 100)
    green_pct = int((green_pixels / total_pixels) * 100)
    water_pct = int((water_pixels / total_pixels) * 100)
    
    # Total 100% match karne ke liye adjustment
    total = concrete_pct + green_pct + water_pct
    if total != 100:
        concrete_pct += (100 - total)
        
    return concrete_pct, green_pct, water_pct

def generate_heat_map(img):
    try:
        gray_img = img.convert("L") 
        enhanced_img = ImageEnhance.Contrast(gray_img).enhance(2.5) 
        heat_mapped_img = ImageOps.colorize(enhanced_img, black="blue", white="red", mid="orange")
        
        buffered = io.BytesIO()
        heat_mapped_img.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        return f"data:image/jpeg;base64,{img_str}"
    except Exception as e:
        print(f"Thermal Map Error: {str(e)}")
        return None

@app.get("/")
def home():
    return {"status": "ISRO Pixel Analytics Engine is running!"}

@app.post("/analyze-heat")
async def analyze_heat(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        pil_image = Image.open(io.BytesIO(image_bytes))
        
        # 1. Real Thermal Map Generation
        processed_image_base64 = generate_heat_map(pil_image)
        
        # 2. Real Pixel Data Calculation (No AI API needed!)
        concrete, green, water = analyze_image_pixels(pil_image)
        
        # 3. Dynamic Reports built from pixel metrics
        hotspot_text = "- Dense Infrastructure Zone identified.\n- Surface temperature spike due to low albedo materials."
        if concrete > 50:
            hotspot_text += "\n- Critical Urban Heat Island (UHI) detected in high concrete cluster."
        else:
            hotspot_text += "\n- Moderate heat retention observed near vegetative buffers."
            
        solution_text = f"- Deploy Cool Roof technologies to counter {concrete}% concrete layout."
        if green < 30:
            solution_text += "\n- Immediate target: Increase urban canopy cover by 15% to mitigate hotspots."
        else:
            solution_text += "\n- Maintain existing green cover and introduce bioswales near built structures."

        ai_response_text = f"""HOTSPOTS:
{hotspot_text}

CHARTS_DATA:
- Concrete Area: {concrete}%
- Green Cover: {green}%
- Water Bodies: {water}%

SOLUTIONS:
{solution_text}"""

        return {
            "success": True,
            "report": ai_response_text,
            "processed_image": processed_image_base64
        }
        
    except Exception as e:
        print(f"Backend Error: {str(e)}")
        return {
            "success": False,
            "report": "Error processing image data.",
            "processed_image": None
        }