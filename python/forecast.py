import argparse
import pandas as pd
import json
from prophet import Prophet
from sqlalchemy import create_engine
from datetime import datetime
from urllib.parse import quote_plus
import warnings
import sys
import os
import hashlib
import time

# === Clean warnings and stderr ===
warnings.filterwarnings("ignore")
sys.stderr = open(os.devnull, 'w')

# === DB Configuration ===
db_config = {
    "user": "root",
    "password": "Nilanjan@12345",
    "host": "localhost",
    "database": "improved_sales_db"
}
encoded_password = quote_plus(db_config["password"])
engine = create_engine(
    f"mysql+pymysql://{db_config['user']}:{encoded_password}@{db_config['host']}/{db_config['database']}"
)

# === Cache Utility ===
CACHE_DIR = ".cache"
os.makedirs(CACHE_DIR, exist_ok=True)

def get_cache_file(cache_key: str):
    hashed_key = hashlib.md5(cache_key.encode()).hexdigest()
    return os.path.join(CACHE_DIR, f"{hashed_key}.json")

def load_cache(cache_key: str, max_age_seconds: int = 600):
    cache_file = get_cache_file(cache_key)
    if os.path.exists(cache_file):
        mtime = os.path.getmtime(cache_file)
        if time.time() - mtime < max_age_seconds:
            with open(cache_file, "r") as f:
                return json.load(f)
    return None

def save_cache(cache_key: str, data):
    cache_file = get_cache_file(cache_key)
    with open(cache_file, "w") as f:
        json.dump(data, f)

# === Argument Parser ===
parser = argparse.ArgumentParser()
parser.add_argument("--type", choices=["forecast", "actual"], required=True)
args = parser.parse_args()

# === Check cache first ===
cache_key = f"sales_forecast_{args.type}"
cached_data = load_cache(cache_key)

if cached_data is not None:
    print(json.dumps(cached_data))  # ✅ Only one print
    sys.exit(0)

# === SQL and Forecast Logic ===
if args.type == "forecast":
    sql = """
    SELECT
      DATE_FORMAT(document_date, '%%Y-%%m') AS month,
      SUM(retailing) AS retailing
    FROM psr_data
    GROUP BY month
    ORDER BY month
    """
    df = pd.read_sql(sql, engine)
    df["month"] = pd.to_datetime(df["month"])
    df = df.rename(columns={"month": "ds", "retailing": "y"})

    model = Prophet()
    model.fit(df)
    future = model.make_future_dataframe(periods=6, freq="MS")
    forecast = model.predict(future)
    forecast = forecast[["ds", "yhat"]].tail(6)
    forecast["month"] = forecast["ds"].dt.strftime("%Y-%m")
    result = forecast[["month", "yhat"]].rename(columns={"yhat": "forecast"})
    result = result.to_dict(orient="records")

elif args.type == "actual":
    df = pd.read_sql("SELECT document_date, retailing FROM psr_data", engine)
    df["document_date"] = pd.to_datetime(df["document_date"])
    df["year"] = df["document_date"].dt.year
    df["month"] = df["document_date"].dt.month
    max_year = df["year"].max()
    valid_years = [max_year - 1, max_year]
    df = df[df["year"].isin(valid_years)]
    result = (
        df.groupby(["year", "month"])["retailing"]
        .sum()
        .reset_index()
        .sort_values(["year", "month"])
        .to_dict(orient="records")
    )

# ✅ Save to cache and print
save_cache(cache_key, result)
print(json.dumps(result))
