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

``` text
jira-worklog-summary/
│
├── app/
│   ├── main.py                # FastAPI entry point
│   ├── core/
│   │   └── config.py          # Environment & settings
│   ├── models/
│   │   └── worklog.py         # Request models
│   ├── services/
│   │   └── jira_service.py    # Jira integration logic
│   ├── utils/
│   │   └── helpers.py         # Utility functions
│   ├── ui/
│   │   ├── router.py          # UI routes
│   │   └── templates/
│   │       ├── base.html
│   │       └── worklog_summary.html
│
├── .env
├── requirements.txt
├── README.md
```

------------------------------------------------------------------------

## 🔐 Environment Setup

Create a `.env` file at the project root:

``` env
JIRA_EMAIL=your-email@company.com
JIRA_API_TOKEN=your_api_token_here
JIRA_DOMAIN=your-domain.atlassian.net
```

> ⚠️ Never commit `.env` or API tokens to source control.

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

### Endpoint

    POST /api/v1/jira-worklogs/summary

### Request Body

``` json
{
  "accountId": "557058:abc123",
  "startDate": "2026-01-01",
  "endDate": "2026-01-31"
}
```

### Response

Returns a structured JSON response grouped by: - Day - Issue - Worklog
entries

------------------------------------------------------------------------

## 🖥 UI Usage

Open in browser:

    http://localhost:8000/ui/worklogs

### UI Capabilities

-   Input Jira Account ID
-   Select date range
-   View daily summaries
-   Expand issue and worklog details
-   Sticky header for filters

------------------------------------------------------------------------

## 🔍 How to Get Jira Account ID

Open the following URL while logged into Jira:

    https://your-domain.atlassian.net/rest/api/3/myself

Copy the `accountId` from the response.

------------------------------------------------------------------------
## 👨‍💻 Maintainer

**Akshay NP**\
Stabilix Solutions

------------------------------------------------------------------------

## 📄 License

Stabilix use only. Not for public distribution.
