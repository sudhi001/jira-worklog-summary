# Jira Worklog Summary

An internal FastAPI-based application to fetch, aggregate, and visualize
Jira worklogs in a **daily, issue-wise, and worklog-level summary**
format.

This tool is designed for **internal employees** to: - Track how much
time they logged per day - View worklogs grouped by Jira issue - Render
data via both **REST API** and a **simple UI**

------------------------------------------------------------------------

## 🚀 Features

-   ✅ Daily worklog summary
-   ✅ Issue-level and worklog-level breakdown
-   ✅ Human-readable time formatting (e.g., `8h 30m`)
-   ✅ FastAPI REST endpoint
-   ✅ Simple server-rendered UI (Jinja2)
-   ✅ Environment-based configuration
-   ✅ Cloud-ready architecture

------------------------------------------------------------------------

## 🧱 Project Structure

This project follows **Hexagonal Architecture (Ports & Adapters)** pattern, organizing code into clear layers:

``` text
jira-worklog-summary/
│
├── app/
│   ├── main.py                # FastAPI entry point & app configuration
│   │
│   ├── presentation/          # PRESENTATION LAYER (Routes/Controllers)
│   │   ├── api/              # REST API endpoints
│   │   │   └── v1/
│   │   │       └── worklogs.py
│   │   └── web/              # Web UI routes
│   │       ├── auth.py       # Authentication routes
│   │       └── worklogs.py   # Worklog UI routes
│   │
│   ├── domain/                # DOMAIN LAYER (Business Logic)
│   │   ├── interfaces.py     # Domain interfaces (ports)
│   │   ├── repositories/     # Repository interfaces & implementations
│   │   │   └── worklog_repository.py
│   │   └── services/         # Business logic services
│   │       └── worklog_service.py
│   │
│   ├── infrastructure/        # INFRASTRUCTURE LAYER (Adapters)
│   │   └── jira_client.py    # Jira API client adapter
│   │
│   ├── core/                  # CORE (Shared Utilities)
│   │   ├── config.py         # Configuration
│   │   ├── auth.py           # OAuth authentication logic
│   │   ├── base.py           # Base classes (Repository, Service)
│   │   ├── exceptions.py     # Custom exception hierarchy
│   │   ├── logging.py        # Structured JSON logging
│   │   ├── error_handler.py  # Error handling utilities
│   │   ├── container.py      # Dependency injection
│   │   ├── dependencies.py   # FastAPI dependencies
│   │   └── session.py        # Session management
│   │
│   ├── models/                # Data models (DTOs)
│   │   └── worklog.py
│   │
│   └── utils/                 # Utility functions
│       └── helpers.py
│
├── static/                     # Static files (CSS, JS, images)
├── templates/                  # Jinja2 templates
├── .env
├── requirements.txt
└── README.md
```

### Architecture Layers Explained

1. **Presentation Layer** (`presentation/`)
   - **Purpose**: Handles HTTP requests/responses
   - **Contains**: API routes (REST) and Web routes (UI)
   - **Responsibility**: Request validation, response formatting, authentication checks

2. **Domain Layer** (`domain/`)
   - **Purpose**: Core business logic (independent of frameworks)
   - **Contains**: Interfaces, repositories, services
   - **Responsibility**: Business rules, data aggregation, validation

3. **Infrastructure Layer** (`infrastructure/`)
   - **Purpose**: External system adapters
   - **Contains**: Jira API client, database clients (if any)
   - **Responsibility**: Communication with external services

4. **Core** (`core/`)
   - **Purpose**: Shared utilities and cross-cutting concerns
   - **Contains**: Config, logging, exceptions, DI container
   - **Responsibility**: Application-wide functionality

### Design Principles

- **Separation of Concerns**: Each layer has a single responsibility
- **Dependency Inversion**: Domain layer doesn't depend on infrastructure
- **Testability**: Business logic can be tested without HTTP/DB dependencies
- **Maintainability**: Clear boundaries make code easier to understand and modify

------------------------------------------------------------------------

## 🔐 Environment Setup

Create a `.env` file at the project root:

``` env
JIRA_DOMAIN=your-domain.atlassian.net
JIRA_OAUTH_CLIENT_ID=your_oauth_client_id
JIRA_OAUTH_CLIENT_SECRET=your_oauth_client_secret
JIRA_OAUTH_REDIRECT_URI=http://localhost:8000/auth/callback
SECRET_KEY=your-secret-key-for-session-management
```

> ⚠️ Never commit `.env` or OAuth credentials to source control.

------------------------------------------------------------------------

## ▶️ Running the Application

### 1️⃣ Create & activate virtual environment

``` bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```

### 2️⃣ Install dependencies

``` bash
pip install -r requirements.txt
```

### 3️⃣ Start FastAPI server

``` bash
python app/main.py
```

Server will start at:

    http://localhost:8000

------------------------------------------------------------------------

## 🔌 API Usage

### Authentication

The application uses OAuth 2.0 for authentication. Users must authenticate via the `/auth/login` endpoint before accessing protected endpoints.

### Endpoint

    POST /api/v1/jira-worklogs/summary

**Requires:** Authentication (OAuth token in session)

### Request Body

``` json
{
  "accountId": "557058:abc123",
  "startDate": "2026-01-01",
  "endDate": "2026-01-31"
}
```

### Response

Returns a structured JSON response grouped by: - Day - Issue - Worklog entries

------------------------------------------------------------------------

## 🖥 UI Usage

Open in browser:

    http://localhost:8000/ui/worklogs

You will be redirected to login if not authenticated.

### UI Capabilities

-   OAuth-based authentication with Jira
-   Select date range
-   View daily summaries
-   Expand issue and worklog details
-   Sticky header for filters

------------------------------------------------------------------------

## 🔍 OAuth Setup

To set up OAuth authentication:

1. Go to [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/)
2. Create a new OAuth 2.0 (3LO) app
3. Set the callback URL to match `JIRA_OAUTH_REDIRECT_URI` in your `.env`
4. Copy the Client ID and Client Secret to your `.env` file
5. The app will automatically use the authenticated user's account ID

------------------------------------------------------------------------
## 👨‍💻 Maintainer

**Akshay NP**\
Stabilix Solutions

------------------------------------------------------------------------

## 📄 License

Stabilix use only. Not for public distribution.
