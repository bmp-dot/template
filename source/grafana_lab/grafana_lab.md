## Grafana Lab

### 1. Open Grafana and Log In
- Go to: `http://your-grafana-server:3000`
- Login:  
  - **Username:** `admin`  
  - **Password:** `admin` *(or as configured)*

---

### 2. Add a Data Source
- Go to: **Configuration → Data Sources**
- Click **Add data source**
- Select **Prometheus** (or other backend)
- Set:
  - **URL:** `http://localhost:9090` *(or your Prometheus URL)*
  - Leave other settings as default
- Click **Save & Test**
- ✅ Confirm: “Data source is working”

---

### 3. Import a Dashboard
- Go to: **Dashboards → Import**
- Either:
  - Upload JSON file  
  - OR enter dashboard ID (e.g. `12345`)
- Click **Load**
- Select the correct data source
- Click **Import**

---

### 4. Set Up Notification Channels
- Go to: **Alerting → Notification channels**
- Click **New channel**
- Enter:
  - **Name:** (e.g. `Slack Alerts`)
  - **Type:** Slack, Email, etc.
  - **Webhook URL** (for Slack)
  - **Recipient/channel**
- Click **Save**

---

### 5. Add an Alert Rule
- On desired dashboard panel, click the **bell icon**
- Configure:
  - **Evaluation interval:** (e.g. every 1m or 5m)
  - **Condition:**  
    ```
    WHEN avg() OF query(A, 5m, now) > 80
    ```
  - **Name & Message**
  - **Notification channel**
- Click **Save**

---

### 6. Adjust Time Range & Refresh
- Use the **time picker** at top:
  - Last 5m, Last 1h, Custom, etc.
- Set **Auto-refresh:** 5s, 10s, 30s, etc.

---

### 7. Save Your Dashboard
- Click the **disk icon** or “Save dashboard”
- Confirm name and location

---

You now have a fully functional Grafana setup with:
- Data sources configured
- Dashboards imported
- Alerts and notifications set
- Time ranges and refresh intervals managed