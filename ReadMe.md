🎵 YouTube Audio Pro
A professional, high-quality YouTube audio downloader web application that allows users to download audio from YouTube videos and convert them to MP3 format with 320kbps quality.

https://img.shields.io/badge/YouTube-Audio%2520Pro-red https://img.shields.io/badge/FastAPI-0.104.1-green https://img.shields.io/badge/React-18-blue https://img.shields.io/badge/Python-3.11+-yellow

✨ Features
🎵 High-Quality Audio Download - Download audio from any YouTube video

🔄 MP3 Conversion - Convert to MP3 format with 320kbps quality

💾 Flexible File Options - Keep original file or convert to MP3

⚡ Real-time Progress - Live download progress with speed and ETA

🎨 Professional UI - Modern, responsive glass-morphism design

📱 Cross-Platform - Works on desktop and mobile devices

🔒 Safe & Secure - No data storage, direct downloads

🚀 Live Demo
Frontend: Coming Soon

Backend API: Coming Soon

🛠️ Tech Stack
Frontend
React 18 - Modern UI framework

Tailwind CSS - Utility-first CSS framework

Vite - Fast build tool and dev server

Backend
FastAPI - Modern, fast web framework for Python

yt-dlp - Feature-rich YouTube downloader

FFmpeg - Audio conversion and processing

Speedtest - Internet speed detection for optimized downloads

📦 Installation
Prerequisites
Python 3.8+

Node.js 16+

FFmpeg installed on your system

1. Clone the Repository
bash
git clone https://github.com/your-username/youtube-audio-pro.git
cd youtube-audio-pro
2. Backend Setup
bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
The backend will be available at http://localhost:8000

3. Frontend Setup
bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
The frontend will be available at http://localhost:5173

🎯 Usage
Enter YouTube URL - Paste any YouTube video URL in the input field

Configure Options:

✅ Convert to MP3 (320kbps high quality)

✅ Keep original audio file

Click Download - The browser will open a save dialog

Choose Location - Select where to save the audio file

Download Complete - File downloads automatically to your chosen location

🔧 API Endpoints
POST /download-file
Download audio from YouTube URL

Request Body:

json
{
  "url": "https://www.youtube.com/watch?v=...",
  "convert_mp3": true,
  "keep_original": false
}
Response: Returns audio file with content-disposition header

GET /download-stream
Stream download progress (SSE)

Query Parameters:

url: YouTube URL

convert_mp3: boolean

keep_original: boolean

GET /health
Health check endpoint

🏗️ Project Structure
text
youtube-audio-pro/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── downloader_core.py      # Core download logic
│   ├── progress.py             # Progress streaming
│   ├── requirements.txt        # Python dependencies
│   ├── Procfile               # Deployment configuration
│   └── runtime.txt            # Python version
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main React component
│   │   ├── main.jsx           # React entry point
│   │   └── api.js             # API communication
│   ├── package.json           # Node.js dependencies
│   ├── vite.config.js         # Vite configuration
│   └── vercel.json            # Vercel deployment
└── README.md
🌐 Deployment
Backend Deployment (Railway/Heroku)
Railway (Recommended)
Fork this repository

Go to Railway

Connect your GitHub repository

Deploy automatically

Heroku
bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set buildpack
heroku buildpacks:set heroku/python

# Deploy
git push heroku main
Frontend Deployment (Vercel)
Vercel (Recommended)
Fork this repository

Go to Vercel

Import GitHub repository

Set build settings:

Framework: Vite

Root Directory: frontend

Build Command: npm run build

Output Directory: dist

Netlify
Build the project: npm run build

Drag and drop the dist folder to Netlify

🔧 Environment Variables
Backend (.env)
env
ENVIRONMENT=production
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
Frontend (.env)
env
VITE_API_URL=https://your-backend-domain.railway.app
🐛 Troubleshooting
Common Issues
FFmpeg not found

bash
# Ubuntu/Debian
sudo apt update && sudo apt install ffmpeg

# macOS
brew install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html
Download fails

Check internet connection

Verify YouTube URL is valid

Ensure video is not age-restricted or private

CORS errors

Update allowed origins in backend CORS configuration

Ensure frontend URL is included in allowed origins

🤝 Contributing
We welcome contributions! Please feel free to submit pull requests, report bugs, or suggest new features.

Development Setup
Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit your changes: git commit -m 'Add amazing feature'

Push to the branch: git push origin feature/amazing-feature

Open a pull request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

⚠️ Disclaimer
This project is for educational purposes only. Users are responsible for complying with YouTube's Terms of Service and applicable copyright laws. Please ensure you have the right to download content before using this tool.

🙏 Acknowledgments
yt-dlp for excellent YouTube downloading capabilities

FastAPI for the modern Python web framework

React for the UI library

Tailwind CSS for the CSS framework

📞 Support
If you encounter any issues or have questions:

Check the Troubleshooting section

Open an Issue

Contact the development team