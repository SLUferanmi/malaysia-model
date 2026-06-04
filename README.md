# Group 19 — Crop Yield Prediction MLR Dashboard

An interactive, high-fidelity web dashboard for the Multiple Linear Regression (MLR) model predicting crop yield, built for the Department of Computer Science, Kwara State University, Malete.

This application is designed as a Vercel-ready static web application, requiring no backend database or server, executing all machine learning predictions and visualizations directly in the browser.

## Project Structure

*   `index.html` — The main user interface structure.
*   `style.css` — Modern glassmorphism UI styles with custom dark mode and green accents.
*   `main.js` — Core JavaScript logic containing the DOSM dataset, the regression formula, and Chart.js code for the interactive graphs.
*   `run_mlr.py` — Python analysis script (uses `pandas`, `statsmodels`, `scipy`) to generate and verify all regression outputs.
*   `mlr_analysis_results.txt` — Full statistical report of the regression analysis (coefficients, ANOVA, assumptions).
*   `Malaysia_Paddy_Statistics_1980_2019.xlsx` — The original DOSM dataset.

## How the Model Works

The web dashboard uses the exact mathematical formula computed from the Ordinary Least Squares (OLS) Multiple Linear Regression model:

$$\text{Average Yield } (\hat{y}) = 2981.1461 - 0.004403 \times (\text{Planted Area}) + 0.002291 \times (\text{Rice Production})$$

### Model Quality:
*   **$R^2$ (Coefficient of Determination):** **$99.92\%$** (excellent fit).
*   **Residual Standard Error (RMSE):** **$14.72$ Kg/Ha** (average prediction error is less than $0.4\%$).
*   **ANOVA p-value:** **$1.24 \times 10^{-57}$** (highly statistically significant).

---

## Local Execution

You can run the web dashboard locally in two ways:

### Option 1: Direct File Open
1.  Navigate to your project directory.
2.  Double-click `index.html` to open it directly in any modern web browser.

### Option 2: Local Python Server (Recommended)
To run a local web server (to test exactly how it behaves on Vercel):
1.  Open your command line/terminal in the project directory.
2.  Run the following command:
    ```bash
    python -m http.server 5000
    ```
3.  Open your browser and navigate to: `http://localhost:5000`

---

## Vercel Deployment

Deploying this dashboard to Vercel is free and takes less than a minute:

### Option A: Vercel CLI (Fastest)
1.  Install Vercel CLI: `npm install -g vercel`
2.  Run the command `vercel` in your project folder.
3.  Follow the prompts to link and deploy your project.

### Option B: GitHub Integration (Recommended for continuous deployment)
1.  Push this folder's contents (`index.html`, `style.css`, `main.js`) to a new repository on GitHub.
2.  Log in to [Vercel](https://vercel.com).
3.  Click **"Add New"** > **"Project"**.
4.  Import your GitHub repository.
5.  Click **"Deploy"** (Vercel will auto-detect the static files and deploy them instantly!).
