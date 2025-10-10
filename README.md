# VPN Control Panel — FastAPI + Frontend Demo

A lightweight demo VPN control panel built with **FastAPI** and **Vanilla JavaScript**, designed for hackathons, MVPs, and proof-of-concept demos.  
Instant setup. Minimal dependencies. Complete control.

## Features

- One-click **Connect/Disconnect** simulation  
- **FastAPI backend** with modular endpoints  
- **SQLite** database for users and activity logs  
- **Browser-based frontend** (HTML, CSS, JS)  
- Minimal, clean, and extendable codebase  

## Tech Stack

| Layer | Technology |
|--------|-------------|
| Backend | Python 3.11, FastAPI, Uvicorn |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Database | SQLite |


## Project Structure


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

``
## Setup Instructions

### Backend Setup
``bash
cd backend
pip install -r requirements.txt
python server.py
`

 Database Setup

`bash
sqlite3 vpn.db < db/schema.sql
``

# Frontend

Open `frontend/index.html` directly in your browser.

---

## Usage

1. Start the backend server:

   ```bash
   python server.py
   ```
2. Open the frontend in your browser.
3. Click **Connect** or **Disconnect** to test the API in action.

---

## API Endpoints

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| GET    | `/`           | Health check               |
| POST   | `/connect`    | Simulate VPN connection    |
| POST   | `/disconnect` | Simulate VPN disconnection |

---

## Common Errors & Fixes

**Port already in use:**
Kill the process using port 8000 or change the port number in `server.py`.

**CORS error in browser:**
Add:

```python
from fastapi.middleware.cors import CORSMiddleware
```

and enable CORS in the FastAPI app.

**sqlite3 not found:**
Install the SQLite CLI or use Python’s built-in `sqlite3` module.

---

## Roadmap

* Add authentication system
* Real VPN tunneling integration
* Logging dashboard for frontend

---

## Contributing

1. Fork this repository
2. Create a feature branch

   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes

   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your fork

   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for details.

```
