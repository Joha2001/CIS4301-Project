var http = require('http');
const express = require('express');
const oracledb = require('oracledb');
require('dotenv').config();
const cors = require('cors');

const app = express()
app.use(cors());

async function v1(req, res) {
    try {
      connection = await oracledb.getConnection({
          user: process.env.USER,
          password: process.env.PASSWORD,
          connectString: process.env.CONNECT_STRING
      });
  
      console.log('connected to database');
      const appName = req.params.appname;
      const year = req.params.year;
      const playtime = req.params.playtime;
      result = await connection.execute(
        `WITH x1 AS (
          SELECT EXTRACT(MONTH FROM postdate) as Mon, COUNT(*) as Count1 FROM Review, App, Owns
              WHERE App.appID = Review.appID 
              AND Owns.playername = Review.playername 
              AND Owns.appID = review.appid 
              AND App.appName = '${appName}' 
              AND owns.playtime > ${playtime}
              AND review.postdate BETWEEN '01-JAN-${year}' AND '31-DEC-${year}' 
              GROUP BY EXTRACT(MONTH FROM postdate) 
              ORDER BY Mon ASC
        ),
        x2 AS (SELECT MonthID, NVL(COUNT1, 0) AS COUNT1 FROM Months LEFT OUTER JOIN x1 ON monthid = Mon ORDER BY MonthID ASC),
        x3 AS (
            SELECT EXTRACT(MONTH FROM postdate) as Mon, COUNT(*) as Count2 FROM ReviewExtra 
                WHERE appName = '${appName}' 
                AND postdate BETWEEN '01-JAN-${year}' AND '31-DEC-${year}'
                AND playtime > ${playtime}
                GROUP BY EXTRACT(MONTH FROM postdate)
                ORDER BY Mon ASC
        ),
        x4 AS (SELECT MonthID, NVL(COUNT2, 0) AS COUNT2 FROM Months LEFT OUTER JOIN x3 ON monthid = Mon ORDER BY MonthID ASC)
        SELECT x2.MonthID, (COUNT1 + COUNT2) AS MCOUNT FROM x2, x4 WHERE x2.MonthID = x4.MonthID`
      );
    } catch (err) {
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          await connection.close();
          console.log('close connection success');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        return res.send('Query sent no rows!');
      } else {
        return res.send(result.rows);
      }
  
    }
  }

app.get('/api/v1/:appname/:year/:playtime', (req, res) => {
    console.log('attempting connection');
    v1(req, res);
});

async function v2(req, res) {
  try {
    connection = await oracledb.getConnection({
        user: process.env.USER,
        password: process.env.PASSWORD,
        connectString: process.env.CONNECT_STRING
    });

    console.log('connected to database');
    const genre = req.params.genre;
    const tag = req.params.tag;
    const year = req.params.year;
    result = await connection.execute(
      `WITH x1 AS (
          SELECT GenreHas.appid FROM GenreHas WHERE GenreHas.genre = '${genre}'
      ),
      x2 AS (
          SELECT TagHas.appid FROM TagHas WHERE TagHas.tag = '${tag}'
      ),
      x3 AS (
          SELECT x1.appid FROM x1, x2 WHERE x1.appid = x2.appid
      ),
      x4 AS (
          SELECT EXTRACT(MONTH FROM releaseDate) as Mon, ROUND(AVG(CAST(price AS FLOAT)), 2) as AvgPrice FROM x3, App 
              WHERE x3.appID = App.appID 
              AND releaseDate BETWEEN '01-JAN-${year}' AND '31-DEC-${year}' 
              GROUP BY EXTRACT(MONTH FROM releaseDate)
              ORDER BY Mon ASC
      )
      SELECT Months.monthid, NVL(x4.AvgPrice, 0) AS Price FROM Months LEFT OUTER JOIN x4 ON MonthID = Mon ORDER BY MonthID ASC`
    );
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      return res.send('Query sent no rows!');
    } else {
      return res.send(result.rows);
    }

  }
}

app.get('/api/v2/:genre/:tag/:year', (req, res) => {
  console.log('attempting connection');
  v2(req, res);
});

async function v3(req, res) {
  try {
    connection = await oracledb.getConnection({
        user: process.env.USER,
        password: process.env.PASSWORD,
        connectString: process.env.CONNECT_STRING
    });

    console.log('connected to database');
    const appName = req.params.appName;
    const year = req.params.year;
    result = await connection.execute(
      `WITH x1 AS (
          SELECT EXTRACT(MONTH FROM postdate) as Mon, COUNT(*) as Count1 FROM Review, App 
              WHERE App.appID = Review.appID 
              AND App.appName = '${appName}' 
              AND Review.recommend = 1
              AND Review.postdate BETWEEN '01-JAN-${year}' AND '31-DEC-${year}' 
              GROUP BY EXTRACT(MONTH FROM postdate) 
              ORDER BY Mon ASC
      ),
      x1a AS (SELECT MonthID, NVL(x1.Count1, 0) AS Count1 FROM Months LEFT OUTER JOIN x1 ON MonthID = Mon ORDER BY MonthID ASC),
      x2 AS (
          SELECT EXTRACT(MONTH FROM postdate) as Mon, COUNT(*) as Count2 FROM Review, App 
              WHERE App.appID = Review.appID 
              AND App.appName = '${appName}' 
              AND Review.recommend = 0
              AND Review.postdate BETWEEN '01-JAN-${year}' AND '31-DEC-${year}' 
              GROUP BY EXTRACT(MONTH FROM postdate) 
              ORDER BY Mon ASC
      ),
      x2a AS (SELECT MonthID, NVL(x2.Count2, 0) AS Count2 FROM Months LEFT OUTER JOIN x2 ON MonthID = Mon ORDER BY MonthID ASC),
      x3 AS (
          SELECT EXTRACT(MONTH FROM postdate) as Mon, COUNT(*) as Count3 FROM ReviewExtra 
              WHERE appName = '${appName}'
              AND recommend = 1
              AND postdate BETWEEN '01-JAN-${year}' AND '31-DEC-${year}'
              GROUP BY EXTRACT(MONTH FROM postdate)
              ORDER BY Mon ASC
      ),
      x3a AS (SELECT MonthID, NVL(x3.Count3, 0) AS Count3 FROM Months LEFT OUTER JOIN x3 ON MonthID = Mon ORDER BY MonthID ASC),
      x4 AS (
          SELECT EXTRACT(MONTH FROM postdate) as Mon, COUNT(*) as Count4 FROM ReviewExtra 
              WHERE appName = '${appName}'
              AND recommend = 0
              AND postdate BETWEEN '01-JAN-${year}' AND '31-DEC-${year}'
              GROUP BY EXTRACT(MONTH FROM postdate)
              ORDER BY Mon ASC
      ),
      x4a AS (SELECT MonthID, NVL(x4.Count4, 0) AS Count4 FROM Months LEFT OUTER JOIN x4 ON MonthID = Mon ORDER BY MonthID ASC),
      x5 AS (
          SELECT x1a.MonthID AS Mon, (COUNT1 + COUNT3) AS Positive, (COUNT2 + COUNT4) AS Negative FROM x1a, x2a, x3a, x4a
              WHERE x1a.MonthID = x2a.MonthID
              AND x2a.MonthID = x3a.MonthID
              AND x3a.MonthID = x4a.MonthID
      )
      SELECT Mon, ROUND((Positive / (Positive + Negative) * 100), 2) AS Rating FROM x5`
    );
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      return res.send('Query sent no rows!');
    } else {
      return res.send(result.rows);
    }

  }
}

app.get('/api/v3/:appName/:year', (req, res) => {
  console.log('attempting connection');
  v3(req, res);
});

async function v4(req, res) {
  try {
    connection = await oracledb.getConnection({
        user: process.env.USER,
        password: process.env.PASSWORD,
        connectString: process.env.CONNECT_STRING
    });

    console.log('connected to database');
    const appName = req.params.appName;
    const year = req.params.year;
    result = await connection.execute(
      `WITH x1 AS (
          SELECT EXTRACT(MONTH FROM postdate) as Mon, ROUND((SUM(playtime) / 60), 0) as Sum1, COUNT(*) as Count1 FROM Review, App, Owns 
              WHERE App.appID = Review.appID 
              AND Owns.playername = Review.playername 
              AND Owns.appID = review.appid 
              AND App.appName = '${appName}'
              AND review.postdate BETWEEN '01-JAN-${year}' AND '31-DEC-${year}' 
              GROUP BY EXTRACT(MONTH FROM postdate) 
              ORDER BY Mon ASC
      ),
      x1a AS (SELECT MonthID, NVL(x1.Sum1, 0) AS Sum1, NVL(x1.Count1, 0) AS Count1 FROM Months LEFT OUTER JOIN x1 ON MonthID = Mon ORDER BY MonthID ASC),
      x2 AS (
          SELECT EXTRACT(MONTH FROM postdate) as Mon, SUM(playtime) as Sum2, COUNT(*) as Count2 FROM ReviewExtra 
              WHERE appName = '${appName}' 
              AND postdate BETWEEN '01-JAN-${year}' AND '31-DEC-${year}'
              GROUP BY EXTRACT(MONTH FROM postdate)
              ORDER BY Mon ASC
      ),
      x2a AS (SELECT MonthID, NVL(x2.Sum2, 0) AS Sum2, NVL(x2.Count2, 0) AS Count2 FROM Months LEFT OUTER JOIN x2 ON MonthID = Mon ORDER BY MonthID ASC),
      x3 AS (SELECT x1a.*, x2a.Sum2, x2a.Count2 FROM x1a, x2a WHERE x1a.monthid = x2a.monthid)
      SELECT MonthID, ROUND((Sum1 + Sum2) / (Count1 + Count2 + 0.000001),0) AS AvgPlaytime FROM x3`
    );
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      return res.send('Query sent no rows!');
    } else {
      return res.send(result.rows);
    }

  }
}

app.get('/api/v4/:appName/:year', (req, res) => {
  console.log('attempting connection');
  v4(req, res);
});

async function v5(req, res) {
  try {
    connection = await oracledb.getConnection({
        user: process.env.USER,
        password: process.env.PASSWORD,
        connectString: process.env.CONNECT_STRING
    });

    console.log('connected to database');
    const bundleName = req.params.bundleName;
    const year = req.params.year;
    result = await connection.execute(
      `WITH x1 AS (
          SELECT contains.appID as appID FROM Bundle, Contains 
              WHERE bundle.bundlename = '${bundleName}' 
              AND contains.bundleid = bundle.bundleid
      ),
      x2 AS (
          SELECT EXTRACT(MONTH FROM postdate) as Mon, COUNT(*) as Count1 FROM x1, Review
              WHERE Review.appID = x1.appID
              AND recommend = 1
              AND Review.postdate BETWEEN '01-JAN-${year}' AND '31-DEC-${year}'
              GROUP BY EXTRACT(MONTH FROM postdate) 
              ORDER BY Mon ASC
      ),
      x2a AS (SELECT MonthID, NVL(x2.Count1, 0) AS Count1 FROM Months LEFT OUTER JOIN x2 ON MonthID = Mon ORDER BY MonthID ASC),
      x3 AS (
          SELECT EXTRACT(MONTH FROM postdate) as Mon, COUNT(*) as Count2 FROM x1, Review
              WHERE Review.appID = x1.appID
              AND recommend = 0
              AND Review.postdate BETWEEN '01-JAN-${year}' AND '31-DEC-${year}'
              GROUP BY EXTRACT(MONTH FROM postdate) 
              ORDER BY Mon ASC
      ),
      x3a AS (SELECT MonthID, NVL(x3.Count2, 0) AS Count2 FROM Months LEFT OUTER JOIN x3 ON MonthID = Mon ORDER BY MonthID ASC),
      x4 AS (
          SELECT EXTRACT(MONTH FROM postdate) as Mon, COUNT(*) as Count3 FROM ReviewExtra, App, x1
              WHERE App.appID = x1.appID
              AND App.appName = ReviewExtra.appName
              AND recommend = 1
              AND postdate BETWEEN '01-JAN-${year}' AND '31-DEC-${year}'
              GROUP BY EXTRACT(MONTH FROM postdate)
              ORDER BY Mon ASC
      ),
      x4a AS (SELECT MonthID, NVL(x4.Count3, 0) AS Count3 FROM Months LEFT OUTER JOIN x4 ON MonthID = Mon ORDER BY MonthID ASC),
      x5 AS (
          SELECT EXTRACT(MONTH FROM postdate) as Mon, COUNT(*) as Count4 FROM ReviewExtra, App, x1
              WHERE App.appID = x1.appID
              AND App.appName = ReviewExtra.appName
              AND recommend = 0
              AND postdate BETWEEN '01-JAN-${year}' AND '31-DEC-${year}'
              GROUP BY EXTRACT(MONTH FROM postdate)
              ORDER BY Mon ASC
      ),
      x5a AS (SELECT MonthID, NVL(x5.Count4, 0) AS Count4 FROM Months LEFT OUTER JOIN x5 ON MonthID = Mon ORDER BY MonthID ASC),
      x6 AS (
          SELECT x2a.MonthID, COUNT1, COUNT2, COUNT3, COUNT4 FROM x2a, x3a, x4a, x5a
              WHERE x2a.MonthID = x3a.MonthID
              AND x3a.MonthId = x4a.MonthID
              AND x4a.MonthId = x5a.MonthID
      )
      SELECT MonthID, ROUND(((Count1 + Count3) / ((Count1 + Count3) + (Count2 + Count4) + 0.000001) * 100), 2) AS Rating FROM x6`
    );
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      return res.send('Query sent no rows!');
    } else {
      return res.send(result.rows);
    }

  }
}

app.get('/api/v5/:bundleName/:year', (req, res) => {
  console.log('attempting connection');
  v5(req, res);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`))