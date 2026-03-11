# FireReach Email Generator Dashboard

A simple, modern prototype dashboard to generate outreach emails using the Groq LLM.

## Project Structure
- `backend/`: FastAPI server for email generation.
- `frontend/`: React dashboard styled with TailwindCSS.

## Features
- **Modern UI**: Clean, responsive dashboard design.
- **LLM Powered**: Generates emails based on ICP, Company, and Email inputs.
- **Copy to Clipboard**: Easily copy generated emails for outreach.

## Setup Instructions

### Backend
1. `cd backend`
2. Create virtual environment: `python -m venv venv`
3. Activate venv: `source venv/bin/activate` or `venv\Scripts\activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Create a `.env` file in the `backend` folder and add your key:
   ```env
   GROQ_API_KEY=your_actual_key_here
   ```
6. Run server: `uvicorn main:app --reload`

### Frontend
1. `cd frontend`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
