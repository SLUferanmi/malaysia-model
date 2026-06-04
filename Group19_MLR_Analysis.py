# =============================================================================
#  GROUP 19 — KWARA STATE UNIVERSITY, MALETE
#  DEPARTMENT OF COMPUTER SCIENCE
#
#  PROJECT TITLE:
#  A Machine Learning Model to Predict the Optimum Harvest Time for Crops
#  to Maximize Yields and Quality Using Linear Regression
#
#  CHAPTER 4 — IMPLEMENTATION & ANALYSIS
#  Multiple Linear Regression Analysis (Python replaces SPSS)
#
#  DATASET : Malaysia Paddy Statistics 1980–2019 (DOSM Table 9.1)
#  DEPENDENT VARIABLE   (ŷ) : Average Yield (Kg/Hectare)
#  INDEPENDENT VARIABLE (x1): Planted Area (Hectare)
#  INDEPENDENT VARIABLE (x2): Rice Production (Tonne)
#
#  REQUIRED LIBRARIES:
#      pip install pandas numpy scipy statsmodels matplotlib seaborn
# =============================================================================

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
import statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor
import warnings
warnings.filterwarnings('ignore')


# =============================================================================
# SECTION 1 — DATASET
# =============================================================================

data = {
    'Year': list(range(1980, 2020)),
    'PlantedArea': [
        716873, 710789, 682070, 665813, 630833, 656375, 650875, 658954, 671755, 664137,
        680647, 683640, 672753, 693434, 698624, 672787, 685468, 690975, 674404, 692389,
        698702, 673634, 678544, 671820, 676310, 666781, 676034, 676111, 656602, 674928,
        677884, 687940, 684545, 671679, 679239, 681559, 688770, 685548, 700306, 684416
    ],
    'RiceProduction': [
        1318332, 1302921, 1213281, 1116937, 1010279, 1257970, 1104501, 1046467, 1091478, 1122617,
        1215065, 1241796, 1297914, 1357432, 1378945, 1372584, 1438794, 1367951, 1256854, 1314437,
        1381662, 1351461, 1415117, 1453137, 1467052, 1490015, 1407220, 1530971, 1516470, 1620259,
        1588457, 1661260, 1674981, 1677368, 1834831, 1767407, 1766115, 1656302, 1700231, 1876922
    ],
    'AvgYield': [
        2852, 2842, 2762, 2605, 2491, 2975, 2640, 2469, 2525, 2625,
        2769, 2818, 2992, 3035, 3061, 3162, 3251, 3068, 2883, 2941,
        3064, 3110, 3238, 3360, 3434, 3471, 3236, 3514, 3584, 3720,
        3636, 3748, 3797, 3876, 4194, 4022, 3978, 3750, 3770, 4255
    ]
}

df = pd.DataFrame(data)
x1 = df['PlantedArea'].values
x2 = df['RiceProduction'].values
y  = df['AvgYield'].values
n  = len(df)

print("=" * 65)
print("   MULTIPLE LINEAR REGRESSION — MALAYSIA PADDY STATISTICS")
print("   Group 19 | Kwara State University, Malete")
print("=" * 65)
print(f"\n  Dataset loaded: {n} observations (1980–2019)")
print(f"  Dependent variable  (ŷ) : Average Yield (Kg/Hectare)")
print(f"  Independent var (x1)    : Planted Area (Hectare)")
print(f"  Independent var (x2)    : Rice Production (Tonne)\n")


# =============================================================================
# SECTION 2 — STEP 3: EXPLORATORY ANALYSIS (Scatter Plots / Linearity Check)
# =============================================================================

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
fig.suptitle('Figure 1: Scatter Plots — Linearity Check\n'
             '(Average Yield vs Each Independent Variable)',
             fontsize=12, fontweight='bold')

for ax, xvar, xlabel, color in zip(
        axes,
        [x1, x2],
        ['Planted Area (Hectare)', 'Rice Production (Tonne)'],
        ['#1A7A6E', '#D45F3C']):
    m, b, r, p, se = stats.linregress(xvar, y)
    xline = np.linspace(xvar.min(), xvar.max(), 200)
    ax.scatter(xvar, y, color=color, edgecolors='white', s=60, zorder=3,
               label='Data points')
    ax.plot(xline, m * xline + b, color='#4A5568', lw=2,
            label=f'Trend line (r = {r:.4f})')
    ax.set_xlabel(xlabel)
    ax.set_ylabel('Average Yield (Kg/Hectare)')
    ax.legend(fontsize=9)
    ax.grid(alpha=0.3)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

plt.tight_layout()
plt.savefig('Fig1_ScatterPlots_Linearity.png', dpi=150, bbox_inches='tight')
plt.show()
print("  [Figure 1 saved] — Scatter Plots (Linearity Check)")


# =============================================================================
# SECTION 3 — STEP 4: CHECK MULTICOLLINEARITY (Correlation Matrix + VIF)
# =============================================================================

corr_matrix = df[['PlantedArea', 'RiceProduction', 'AvgYield']].corr()

Xvif = np.column_stack([x1, x2])
vif1 = variance_inflation_factor(Xvif, 0)
vif2 = variance_inflation_factor(Xvif, 1)

fig2, ax2 = plt.subplots(figsize=(7, 5.5))
fig2.suptitle('Figure 2: Correlation Matrix — Multicollinearity Check',
              fontsize=12, fontweight='bold')
cmap = sns.diverging_palette(220, 20, as_cmap=True)
sns.heatmap(corr_matrix, annot=True, fmt='.4f', cmap=cmap,
            vmin=-1, vmax=1, center=0,
            linewidths=1, linecolor='white',
            annot_kws={'size': 11, 'weight': 'bold'}, ax=ax2)
ax2.set_xticklabels(['Planted Area', 'Rice Prod.', 'Avg Yield'], rotation=20, ha='right')
ax2.set_yticklabels(['Planted Area', 'Rice Prod.', 'Avg Yield'], rotation=0)
ax2.set_title(f'VIF(PlantedArea) = {vif1:.4f}   |   VIF(RiceProduction) = {vif2:.4f}',
              fontsize=9, pad=8)
plt.tight_layout()
plt.savefig('Fig2_CorrelationMatrix.png', dpi=150, bbox_inches='tight')
plt.show()
print("  [Figure 2 saved] — Correlation Matrix")

print(f"\n  Correlation Matrix:")
print(corr_matrix.to_string())
print(f"\n  VIF — Planted Area   : {vif1:.4f}")
print(f"  VIF — Rice Production: {vif2:.4f}")
if vif1 > 10:
    print("  ⚠ VIF > 10: Multicollinearity noted — record as study limitation")


# =============================================================================
# SECTION 4 — STEP 6: MULTIPLE LINEAR REGRESSION (OLS via statsmodels)
# =============================================================================

X = sm.add_constant(np.column_stack([x1, x2]))  # adds intercept column
model = sm.OLS(y, X).fit()

b0, b1, b2 = model.params
y_pred    = model.fittedvalues
residuals = model.resid
std_resid = residuals / residuals.std()

print("\n" + "─" * 65)
print("  STEP 6: OLS REGRESSION RESULTS")
print("─" * 65)
print(model.summary())


# =============================================================================
# SECTION 5 — STEP 7: ANOVA TABLE
# =============================================================================

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

print("\n" + "─" * 65)
print("  STEP 7: ANOVA TABLE")
print("─" * 65)
print(f"  {'Source':<15} {'SS':>15} {'df':>4} {'MS':>15} {'F':>12} {'p-value':>14}")
print(f"  {'Regression':<15} {ss_reg:>15,.2f} {df_reg:>4} {ms_reg:>15,.2f} {f_stat:>12.4f} {p_f:>14.4e}")
print(f"  {'Residual':<15} {ss_res:>15,.2f} {df_res:>4} {ms_res:>15,.2f}")
print(f"  {'Total':<15} {ss_tot:>15,.2f} {df_tot:>4}")


# =============================================================================
# SECTION 6 — STEP 8: INTERPRET RESULTS
# =============================================================================

sw_stat, sw_p = stats.shapiro(residuals)

print("\n" + "─" * 65)
print("  STEP 8: FINAL RESULTS SUMMARY")
print("─" * 65)
print(f"\n  MLR EQUATION:")
print(f"  ŷ = {b0:.4f}  +  ({b1:.6f}) x₁  +  ({b2:.6f}) x₂")
print(f"\n  MODEL FIT:")
print(f"  {'R²':<42} {r2:.6f}")
print(f"  {'Adjusted R²':<42} {r2_adj:.6f}")
print(f"  {'RMSE':<42} {rmse:.4f} Kg/Ha")
print(f"\n  COEFFICIENTS:")
print(f"  {'Variable':<28} {'β':>12} {'Std Err':>12} {'t':>10} {'p':>14}")
print(f"  {'Intercept (β₀)':<28} {b0:>12.4f} {model.bse[0]:>12.4f} {model.tvalues[0]:>10.4f} {model.pvalues[0]:>14.4e}")
print(f"  {'Planted Area β₁':<28} {b1:>12.6f} {model.bse[1]:>12.6f} {model.tvalues[1]:>10.4f} {model.pvalues[1]:>14.4e}")
print(f"  {'Rice Production β₂':<28} {b2:>12.6f} {model.bse[2]:>12.6f} {model.tvalues[2]:>10.4f} {model.pvalues[2]:>14.4e}")
print(f"\n  ASSUMPTION CHECKS:")
print(f"  {'Shapiro-Wilk stat':<42} {sw_stat:.4f}")
print(f"  {'Shapiro-Wilk p-value':<42} {sw_p:.4f}  {'✔' if sw_p > 0.05 else '⚠ slight departure from normality'}")
print(f"  {'VIF — Planted Area':<42} {vif1:.4f}  {'✔' if vif1 < 10 else '⚠ multicollinearity (limitation)'}")
print(f"  {'VIF — Rice Production':<42} {vif2:.4f}  {'✔' if vif2 < 10 else '⚠ multicollinearity (limitation)'}")
print("=" * 65)


# =============================================================================
# SECTION 7 — RESIDUAL DIAGNOSTIC PLOTS (Homoscedasticity + Normality)
# =============================================================================

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
axes3[1].axhline(0,  color='#1A7A6E', lw=1.8, linestyle='--')
axes3[1].axhline( 2, color='#4A5568', lw=1,   linestyle=':', alpha=0.6)
axes3[1].axhline(-2, color='#4A5568', lw=1,   linestyle=':', alpha=0.6)
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
plt.savefig('Fig3_ResidualDiagnostics.png', dpi=150, bbox_inches='tight')
plt.show()
print("  [Figure 3 saved] — Residual Diagnostic Plots")


# =============================================================================
# SECTION 8 — ACTUAL vs PREDICTED PLOT
# =============================================================================

fig4, ax4 = plt.subplots(figsize=(12, 5))
ax4.plot(df['Year'], y,      color='#1A7A6E', lw=2, marker='o', ms=4, label='Actual Yield')
ax4.plot(df['Year'], y_pred, color='#D45F3C', lw=2, marker='s', ms=3,
         linestyle='--', label='Predicted Yield')
ax4.fill_between(df['Year'], y, y_pred, alpha=0.1, color='#C9A227')
ax4.set_xlabel('Year', fontsize=10)
ax4.set_ylabel('Average Yield (Kg/Hectare)', fontsize=10)
ax4.set_title(f'Figure 4: Actual vs Predicted Average Yield\n'
              f'ŷ = {b0:.4f} + ({b1:.6f})x₁ + ({b2:.6f})x₂  |  R² = {r2:.4f}',
              fontsize=11, fontweight='bold')
ax4.legend(fontsize=9)
ax4.grid(alpha=0.3)
ax4.spines['top'].set_visible(False)
ax4.spines['right'].set_visible(False)
plt.tight_layout()
plt.savefig('Fig4_Actual_vs_Predicted.png', dpi=150, bbox_inches='tight')
plt.show()
print("  [Figure 4 saved] — Actual vs Predicted Yield")

print("\n  All analysis complete. Four figures saved to working directory.")
print("=" * 65)
