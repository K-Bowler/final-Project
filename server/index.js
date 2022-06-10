require('dotenv/config');
const path = require('path');
const shuffle = require('./shuffle');
const express = require('express');
const db = require('./db');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.json());
app.use(express.static(publicPath));

app.get('/api/entries', (req, res, next) => {
  const sql = `
    select "entryId",
           "userId",
           "entryUrl"
      from "entries"
  `;
  db.query(sql)
    .then(result => {
      const entries = shuffle(result.rows);
      res.json(entries);
    })
    .catch(err => next(err));
});

app.get('/api/entries/:entryId', (req, res, next) => {
  const entryId = Number(req.params.entryId);
  if (!entryId) {
    throw new ClientError(400, 'entryId must be a positive integer');
  }
  const sql = `
  select "entryId",
         "userId",
         "entryUrl"
      from "entries"
      where "entryId" = $1
  `;
  const params = [entryId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find entry with entryId ${entryId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/entries', (req, res, next) => {
  const userId = 1;
  const entryUrl = req.body.entryUrl;

  if (!entryUrl) {
    res.status(400).json({
      error: 'Missing \'entryUrl\' information.'
    });
  }

  const sql = `
  insert into "entries" ("entryUrl", "userId")
    values ($1, $2)
    returning *
  `;
  const params = [entryUrl, userId];
  db.query(sql, params)
    .then(result => {
      const newEntry = result.rows[0];
      res.status(201).json(newEntry);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
