import os
import sys
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg') # Prevent blocking GUI popups
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
import statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor

# Force stdout to use UTF-8 encoding to prevent Windows CMD/Powershell encoding crashes
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass


# 1. LOAD DATASET FROM EXCEL
excel_path = "Malaysia_Paddy_Statistics_1980_2019.xlsx"
print(f"Loading dataset from: {excel_path}")

try:
    df = pd.read_excel(excel_path, header=2)
except Exception as e:
    print(f"Error loading Excel: {e}")
    # Fallback to local file in workspace path if needed
    excel_path = r"c:\Users\hp\OneDrive\Desktop\emmanuel sir j\Malaysia_Paddy_Statistics_1980_2019.xlsx"
    df = pd.read_excel(excel_path, header=2)

# Clean column headers (remove line breaks, strip spaces)
df.columns = [col.replace('\n', ' ').strip() for col in df.columns]

print("Columns found in Excel:")
for i, col in enumerate(df.columns):
    print(f"  [{i}] {col}")

# Map variables based on the proposal
# Dependent (y): Average Yield (Kg/Hectare)
# Independent (x1): Planted Area (Hectare)
# Independent (x2): Rice Production (Tonne)

# Identify the columns dynamically by looking at their prefixes/keywords
year_col = [c for c in df.columns if 'Year' in c][0]
area_col = [c for c in df.columns if 'Planted' in c][0]
yield_col = [c for c in df.columns if 'Yield' in c][0]
prod_col = [c for c in df.columns if 'Rice' in c][0]

# Clean the dataset
df_clean = df[[year_col, area_col, yield_col, prod_col]].copy()
df_clean.columns = ['Year', 'PlantedArea', 'AvgYield', 'RiceProduction']

# Convert 'Year' and other columns to numeric, strip characters like 'P' or 'e' from years (e.g. 2018 P, 2019 e)
df_clean['Year'] = df_clean['Year'].astype(str).str.extract(r'(\d{4})').astype(int)
for col in ['PlantedArea', 'AvgYield', 'RiceProduction']:
    df_clean[col] = pd.to_numeric(df_clean[col], errors='coerce')

df_clean = df_clean.dropna().reset_index(drop=True)
n = len(df_clean)
print(f"\nSuccessfully cleaned and loaded {n} rows of data (Years {df_clean['Year'].min()} - {df_clean['Year'].max()})")

x1 = df_clean['PlantedArea'].values
x2 = df_clean['RiceProduction'].values
y  = df_clean['AvgYield'].values

# 2. RUN MULTIPLE LINEAR REGRESSION
X = sm.add_constant(np.column_stack([x1, x2]))
model = sm.OLS(y, X).fit()

b0, b1, b2 = model.params
y_pred = model.fittedvalues
residuals = model.resid
std_resid = residuals / residuals.std()

# 3. STATISTICAL CALCULATIONS
# Correlation Matrix
corr_matrix = df_clean[['PlantedArea', 'RiceProduction', 'AvgYield']].corr()

# VIF (Multicollinearity Check) - Must include constant for correct centered VIF
Xvif = sm.add_constant(np.column_stack([x1, x2]))
vif1 = variance_inflation_factor(Xvif, 1)
vif2 = variance_inflation_factor(Xvif, 2)

# ANOVA Elements
ss_reg = float(np.sum((y_pred - y.mean()) ** 2))
ss_res = float(np.sum(residuals ** 2))
ss_tot = float(np.sum((y - y.mean()) ** 2))
df_reg, df_res, df_tot = 2, n - 3, n - 1
ms_reg = ss_reg / df_reg
ms_res = ss_res / df_res
f_stat = ms_reg / ms_res
p_f    = float(stats.f.sf(f_stat, df_reg, df_res))
r2     = float(model.rsquared)
r2_adj = float(model.rsquared_adj)
rmse   = float(np.sqrt(ms_res))

# Shapiro-Wilk Test for Normality of Residuals
sw_stat, sw_p = stats.shapiro(residuals)

# 4. PRINT RESULTS TO TERMINAL
results_str = f"""=================================================================
             MULTIPLE LINEAR REGRESSION ANALYSIS RESULTS
=================================================================
Dataset: Malaysia Paddy Statistics (1980-2019)
Observations (n): {n}

--- MODEL EQUATION ---
ŷ = {b0:.4f} + ({b1:.6f}) x₁ + ({b2:.6f}) x₂

Where:
  ŷ  = Average Yield (Kg/Hectare)
  x₁ = Planted Area (Hectare)
  x₂ = Rice Production (Tonne)

--- MODEL SUMMARY & FIT ---
R² (R-squared)        : {r2:.6f} ({r2*100:.2f}%)
Adjusted R²          : {r2_adj:.6f} ({r2_adj*100:.2f}%)
Residual Std Error   : {rmse:.4f} Kg/Ha (RMSE)
F-statistic          : {f_stat:.4f}
Prob (F-statistic)   : {p_f:.4e} (Model is {"statistically significant" if p_f < 0.05 else "not statistically significant"})

--- COEFFICIENTS ---
Variable          Estimate (β)     Std Error       t-value         p-value
-----------------------------------------------------------------
Intercept (β₀)     {b0:>12.4f}  {model.bse[0]:>12.4f}  {model.tvalues[0]:>12.4f}  {model.pvalues[0]:>12.4e}
Planted Area (β₁)  {b1:>12.6f}  {model.bse[1]:>12.6f}  {model.tvalues[1]:>12.4f}  {model.pvalues[1]:>12.4e}
Rice Production (β₂){b2:>12.6f} {model.bse[2]:>12.6f}  {model.tvalues[2]:>12.4f}  {model.pvalues[2]:>12.4e}

--- ANOVA TABLE ---
Source          SS               df     MS               F            p-value
-----------------------------------------------------------------
Regression      {ss_reg:>15.2f}  {df_reg:>4}  {ms_reg:>15.2f}  {f_stat:>10.4f}  {p_f:>10.4e}
Residual        {ss_res:>15.2f}  {df_res:>4}  {ms_res:>15.2f}
Total           {ss_tot:>15.2f}  {df_tot:>4}

--- CORRELATION MATRIX ---
                  Planted Area    Rice Production   Average Yield
Planted Area        {corr_matrix.iloc[0,0]:.6f}        {corr_matrix.iloc[0,1]:.6f}        {corr_matrix.iloc[0,2]:.6f}
Rice Production     {corr_matrix.iloc[1,0]:.6f}        {corr_matrix.iloc[1,1]:.6f}        {corr_matrix.iloc[1,2]:.6f}
Average Yield       {corr_matrix.iloc[2,0]:.6f}        {corr_matrix.iloc[2,1]:.6f}        {corr_matrix.iloc[2,2]:.6f}

--- ASSUMPTION CHECKS ---
1. Linearity: Checked via scatter plots.
2. Multicollinearity (VIF):
   - VIF (Planted Area): {vif1:.4f}
   - VIF (Rice Production): {vif2:.4f}
   {"✔ No severe multicollinearity (VIF < 10)" if vif1 < 10 and vif2 < 10 else "⚠ High multicollinearity detected (VIF > 10). Note as study limitation."}
3. Normality of Residuals:
   - Shapiro-Wilk stat: {sw_stat:.4f}
   - Shapiro-Wilk p-value: {sw_p:.4f}
   {"✔ Residuals are normally distributed (p > 0.05)" if sw_p > 0.05 else "⚠ Residuals depart slightly from normality (p <= 0.05)"}
4. Homoscedasticity: Checked via residual plots.
================================================================="""

print(results_str)

# Write results to file
txt_out_path = "mlr_analysis_results.txt"
with open(txt_out_path, "w", encoding="utf-8") as f:
    f.write(results_str)
print(f"\nSaved analysis text report to: {txt_out_path}")


# 5. GENERATE & SAVE VISUALIZATIONS (HEADLESS)
print("\nGenerating and saving diagnostic figures...")

# Figure 1: Scatter Plots / Linearity Check
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
fig.suptitle('Figure 1: Scatter Plots — Linearity Check\n(Average Yield vs Each Independent Variable)',
             fontsize=12, fontweight='bold')

for ax, xvar, xlabel, color in zip(
        axes,
        [x1, x2],
        ['Planted Area (Hectare)', 'Rice Production (Tonne)'],
        ['#1A7A6E', '#D45F3C']):
    m, b, r, p, se = stats.linregress(xvar, y)
    xline = np.linspace(xvar.min(), xvar.max(), 200)
    ax.scatter(xvar, y, color=color, edgecolors='white', s=60, zorder=3, label='Data points')
    ax.plot(xline, m * xline + b, color='#4A5568', lw=2, label=f'Trend line (r = {r:.4f})')
    ax.set_xlabel(xlabel)
    ax.set_ylabel('Average Yield (Kg/Hectare)')
    ax.legend(fontsize=9)
    ax.grid(alpha=0.3)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

plt.tight_layout()
fig1_path = 'Fig1_ScatterPlots_Linearity.png'
plt.savefig(fig1_path, dpi=150, bbox_inches='tight')
plt.close()
print(f"  Saved: {fig1_path}")

# Figure 2: Correlation Matrix Heatmap
fig2, ax2 = plt.subplots(figsize=(7, 5.5))
fig2.suptitle('Figure 2: Correlation Matrix Heatmap', fontsize=12, fontweight='bold')
cmap = sns.diverging_palette(220, 20, as_cmap=True)
sns.heatmap(corr_matrix, annot=True, fmt='.4f', cmap=cmap, vmin=-1, vmax=1, center=0,
            linewidths=1, linecolor='white', annot_kws={'size': 11, 'weight': 'bold'}, ax=ax2)
ax2.set_xticklabels(['Planted Area', 'Rice Prod.', 'Avg Yield'], rotation=20, ha='right')
ax2.set_yticklabels(['Planted Area', 'Rice Prod.', 'Avg Yield'], rotation=0)
ax2.set_title(f'VIF(PlantedArea) = {vif1:.4f}   |   VIF(RiceProduction) = {vif2:.4f}', fontsize=9, pad=8)
plt.tight_layout()
fig2_path = 'Fig2_CorrelationMatrix.png'
plt.savefig(fig2_path, dpi=150, bbox_inches='tight')
plt.close()
print(f"  Saved: {fig2_path}")

# Figure 3: Residual Diagnostic Plots (Homoscedasticity & Normality)
fig3, axes3 = plt.subplots(1, 3, figsize=(15, 5))
fig3.suptitle('Figure 3: Residual Diagnostic Plots — Homoscedasticity & Normality',
              fontsize=12, fontweight='bold')

# Plot A: Residuals vs Fitted
axes3[0].scatter(y_pred, residuals, color='#1A7A6E', edgecolors='white', s=55, zorder=3)
axes3[0].axhline(0, color='#D45F3C', lw=1.8, linestyle='--')
axes3[0].set_xlabel('Fitted Values (Kg/Ha)')
axes3[0].set_ylabel('Residuals')
axes3[0].set_title('Residuals vs Fitted Values')
axes3[0].grid(alpha=0.3)

# Plot B: Scale-Location (Standardised residuals)
axes3[1].scatter(y_pred, std_resid, color='#D45F3C', edgecolors='white', s=55, zorder=3)
axes3[1].axhline(0, color='#1A7A6E', lw=1.8, linestyle='--')
axes3[1].axhline(2, color='#4A5568', lw=1, linestyle=':', alpha=0.6)
axes3[1].axhline(-2, color='#4A5568', lw=1, linestyle=':', alpha=0.6)
axes3[1].set_xlabel('Fitted Values (Kg/Ha)')
axes3[1].set_ylabel('Standardised Residuals')
axes3[1].set_title('Scale-Location (Homoscedasticity)')
axes3[1].grid(alpha=0.3)

# Plot C: Normal Q-Q Plot
(osm, osr), (slope, intercept, r_qq) = stats.probplot(residuals, dist='norm')
axes3[2].scatter(osm, osr, color='#C9A227', edgecolors='white', s=55, zorder=3)
axes3[2].plot(osm, slope * np.array(osm) + intercept, color='#4A5568', lw=2)
axes3[2].set_xlabel('Theoretical Quantiles')
axes3[2].set_ylabel('Sample Quantiles')
axes3[2].set_title(f'Normal Q-Q Plot  (Shapiro-Wilk p = {sw_p:.4f})')
axes3[2].grid(alpha=0.3)

for ax in axes3:
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

plt.tight_layout()
fig3_path = 'Fig3_ResidualDiagnostics.png'
plt.savefig(fig3_path, dpi=150, bbox_inches='tight')
plt.close()
print(f"  Saved: {fig3_path}")

# Figure 4: Actual vs Predicted Plot
fig4, ax4 = plt.subplots(figsize=(12, 5))
ax4.plot(df_clean['Year'], y, color='#1A7A6E', lw=2, marker='o', ms=4, label='Actual Yield')
ax4.plot(df_clean['Year'], y_pred, color='#D45F3C', lw=2, marker='s', ms=3, linestyle='--', label='Predicted Yield')
ax4.fill_between(df_clean['Year'], y, y_pred, alpha=0.1, color='#C9A227')
ax4.set_xlabel('Year', fontsize=10)
ax4.set_ylabel('Average Yield (Kg/Hectare)', fontsize=10)
ax4.set_title(f'Figure 4: Actual vs Predicted Average Yield\nŷ = {b0:.4f} + ({b1:.6f})x₁ + ({b2:.6f})x₂  |  R² = {r2:.4f}',
              fontsize=11, fontweight='bold')
ax4.legend(fontsize=9)
ax4.grid(alpha=0.3)
ax4.spines['top'].set_visible(False)
ax4.spines['right'].set_visible(False)
plt.tight_layout()
fig4_path = 'Fig4_Actual_vs_Predicted.png'
plt.savefig(fig4_path, dpi=150, bbox_inches='tight')
plt.close()
print(f"  Saved: {fig4_path}")

print("\nAnalysis complete. Results file and 4 diagnostic figures saved successfully.")
