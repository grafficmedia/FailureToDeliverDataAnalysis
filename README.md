# Failure To Deliver Data Analysis

This repository contains data sets that are freely available online. The failure to deliver data (located in `/data/fail_data`) can be found on (sec.gov)[https://www.sec.gov/data/foiadocsfailsdatahtm]. The volume data (located in `/data/volume_data) can be found on (nasdaq.com)[https://www.nasdaq.com/market-activity/stocks/gme/historical]

# Installation Instructions

1. Download source code
1. Run `yarn` in terminal to install dependencies
1. Run `node src/index.js` - This will place all the data in the sqlite database
1. Run `sqlite3 db/FailureToDeliver.db`
1. You may now run any SQL query your heart desires (samples found in `db/queries.sql`)

# Data Analysis Instructions

There are two tables that this script creates:

1. `FailData` contains Failure to Deliver data for the last six months
1. `VolumeData` contains data around total volume in the last six months for any of the tickers found in `data/volume_data`

A common field that both tables have is `symbol`, which can be a useful join field if needed.

The script can either be configured to
