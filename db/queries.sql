-- FailData queries

SELECT SUM(quantity)
FROM FailData;

SELECT SUM(quantity * price)
FROM FailData
WHERE substr(date_shorted, 5, 2) = '05';

SELECT SUM(quantity * price) as total, symbol
FROM FailData
GROUP BY symbol
ORDER BY total DESC
LIMIT 10;

SELECT SUM
(quantity) AS total, symbol
FROM FailData
WHERE symbol = 'GME';

SELECT SUM(quantity) as total
FROM FailData
WHERE symbol in ('GME', 'GAMR', 'XRT', 'RETL', 'XSVM', 'RWJ', 'PSCD', 'VIOG', 'IUSS', 'VCR', 'SFYF', 'IWC', 'EWSC', 'SYLD', 'PRF', 'RALS', 'FNDX', 'FNDB', 'VBR', 'SLYV', 'NUSC');

SELECT SUM
(quantity) AS total, symbol
FROM FailData
WHERE symbol in ('GME', 'GAMR', 'XRT', 'RETL', 'XSVM', 'RWJ', 'PSCD', 'VIOG', 'IUSS', 'VCR', 'SFYF', 'IWC', 'EWSC', 'SYLD', 'PRF', 'RALS', 'FNDX', 'FNDB', 'VBR', 'SLYV', 'NUSC')
GROUP BY symbol
ORDER BY total;

-- VolumeData queries

SELECT SUM(volume)
from VolumeData
WHERE symbol='GME';

SELECT SUM(volume)
from VolumeData
WHERE symbol in ('GME', 'GAMR', 'XRT', 'RETL', 'XSVM', 'RWJ', 'PSCD', 'VIOG', 'IUSS', 'VCR', 'SFYF', 'IWC', 'EWSC', 'SYLD', 'PRF', 'RALS', 'FNDX', 'FNDB', 'VBR', 'SLYV', 'NUSC');