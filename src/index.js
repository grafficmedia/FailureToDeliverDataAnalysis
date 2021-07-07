const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const readline = require('readline');
const pMap = require('p-map');

async function main() {
  let db = new sqlite3.Database('db/FailureToDeliver.db', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to the in-memory SQlite database.');
    }
  });

  await db.exec('DROP TABLE IF EXISTS FailData');
  await db.exec('CREATE TABLE FailData(id integer primary key autoincrement, date_shorted text, cusip text, symbol text, quantity integer, description text, price float)');

  await db.exec('DROP TABLE IF EXISTS VolumeData');
  await db.exec('CREATE TABLE VolumeData(id integer primary key autoincrement, symbol text, date date, closePrice float, volume integer, openPrice float, highPrice float, lowPrice float)');

  await processMonthlyFailData(db);
  await processVolumeData(db);

  db.all('SELECT COUNT(*) from FailData', (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
    }
  });

  db.close(() => {
    console.log("Connection closed");
  });
}

async function processMonthlyFailData(db) {
  const failData = ['january_fails.txt', 'february_fails.txt', 'march_fails.txt', 'april_fails.txt', 'may_fails.txt'];
  await pMap(failData, async (fileName) => {
    const filestream = fs.createReadStream(`data/fail_data/${fileName}`);
    const rl = readline.createInterface({
      input: filestream,
      crlfDelay: Infinity
    });

    const values = [];
    for await (const line of rl) {
      const tokens = line.split('|');
      const quantity = parseInt(tokens[3]);
      const price = parseFloat(tokens[5]);
      
      if (quantity && price) {
        values.push(`('${tokens[0]}', '${tokens[1].replace("'", "")}', '${tokens[2].replace("'", "")}', ${quantity}, '${tokens[4].replace("'", "")}', ${price})`);
      }
    }

    await db.exec(`INSERT INTO FailData (date_shorted, cusip, symbol, quantity, description, price) VALUES ${values.join(',')}`);
  });
}

async function processVolumeData(db) {
  const volumeData = ['ewsc', 'fndb', 'fndx', 'gamr', 'gme', 'iuss', 'iwc', 'nusc', 'prf', 'pscd', 'rals', 'retl', 'rwj', 'sfyf', 'slyv', 'syld', 'vbr', 'vcr', 'viog', 'xrt', 'xsvm'];
  await pMap(volumeData, async (symbol) => {
    const filestream = fs.createReadStream(`data/volume_data/${symbol}.csv`);
    const rl = readline.createInterface({
      input: filestream,
      crlfDelay: Infinity
    });

    const values = [];
    for await (const line of rl) {
      const tokens = line.split(',');
      const date = tokens[0];
      const closePrice = parseFloat(tokens[1].replace('$', ''));
      const volume = parseInt(tokens[2]);
      const openPrice = parseFloat(tokens[3].replace('$', ''));
      const highPrice = parseFloat(tokens[4].replace('$', ''));
      const lowPrice = parseFloat(tokens[5].replace('$', ''));
      if (date && closePrice && volume && openPrice && highPrice && lowPrice) {
        values.push(`('${symbol.toUpperCase()}', ${date}, ${closePrice}, ${volume}, ${openPrice}, ${highPrice}, ${lowPrice})`);
      }
    }

    await db.exec(`INSERT INTO VolumeData (symbol, date, closePrice, volume, openPrice, highPrice, lowPrice) VALUES ${values.join(',')}`);
  })
}

main();
