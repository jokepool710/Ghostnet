#VPN Project

A lightweight demo VPN control panel with a FastAPI backend and browser-based frontend.
Built for hackathons and MVP demos.

 Features

 Connect / Disconnect API endpoints (FastAPI)
 Simple web control panel (HTML, CSS, JS)
 SQLite schema for users and activity logs
 Modular and minimal codebase

 Tech Stack

Backend: Python 3.11, FastAPI, Uvicorn

Frontend: HTML, CSS, Vanilla JavaScript

Database: SQLite

 Project Structure
vpn-project/
├── backend/          # FastAPI server
│   ├── server.py
│   ├── requirements.txt
│
├── frontend/         # Web control panel
│   ├── index.html
│   ├── style.css
│   ├── app.js
│
├── db/               # Database schema
│   ├── schema.sql
│
├── .gitignore
├── README.md
├── LICENSE

Backend Setup
cd backend
pip install -r requirements.txt
python server.py

Database Setup
sqlite3 vpn.db < db/schema.sql

 Frontend

Open frontend/index.html in a browser.

Usage

Start backend with python server.py.

Open frontend in browser.

Click Connect or Disconnect to test API.

 API Endpoints
Method	Endpoint	Description
GET	/	Health check
POST	/connect	Simulate connect
POST	/disconnect	Simulate disconnect
Common Errors & Fixes

Port already in use: Kill the process using 8000 or change port in server.py.

CORS error in browser: Add from fastapi.middleware.cors import CORSMiddleware to backend and enable CORS.

sqlite3 not found: Install SQLite CLI or use Python sqlite3 module directly.

 Roadmap

Add authentication system

Real VPN tunneling integration

Logging dashboard in frontend

Contributing

Fork repo

Create feature branch (git checkout -b feature-name)

Commit changes (git commit -m 'Add feature')

Push branch (git push origin feature-name)

Open Pull Request

📜 License

MIT License. See LICENSE
.
