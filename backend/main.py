import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

app = FastAPI(title="FireReach Outreach API")

# Enable CORS for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

class EmailGenerationRequest(BaseModel):
    icp: str
    company: str
    email: str

@app.post("/generate-email")
async def generate_email(request: EmailGenerationRequest):
    if not os.environ.get("GROQ_API_KEY"):
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not configured on server.")

    prompt = f"""You are a simple email writing assistant.

Your task is to generate a short outreach email introducing cybersecurity training services.

Rules:

* Write a professional but generic email.
* Do not research the company.
* Do not assume funding, hiring signals, or growth signals.
* Do not use real-time data.
* Keep the email short (5–7 lines).
* The email should introduce cybersecurity training services for growing startups.

Inputs passed to the model:

ICP: {request.icp}
Company: {request.company}
Email: {request.email}
"""

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that writes professional emails."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500,
        )
        
        generated_email = completion.choices[0].message.content
        return {"email": generated_email}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
