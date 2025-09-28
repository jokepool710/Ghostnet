#VPN Project

A lightweight VPN control panel with a FastAPI backend and a simple browser-based frontend.
This project is designed as an MVP to demonstrate VPN connection handling, session logging, and a user-friendly interface.

Features

 Connect / Disconnect API using FastAPI

 Web control panel with HTML, CSS, and JavaScript

 SQLite database schema for users and VPN activity logs

 Simple, modular codebase for hackathon or MVP demos

Tech Stack

Backend: Python 3.11, FastAPI, Uvicorn

Frontend: HTML, CSS, Vanilla JavaScript

Database: SQLite (lightweight, file-based)

How It Works

Backend runs a FastAPI server exposing /connect and /disconnect endpoints.

Frontend calls these APIs to simulate VPN control.

Database schema supports user accounts and logs activity for future expansion.

Use Cases

Hackathon demo project

Learning stack integration (API + frontend + DB)

Prototype for a larger VPN management system
