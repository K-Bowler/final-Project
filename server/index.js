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
      e."userId",
      "entryUrl",
      (count(ld.*) filter (where "isLiked" = true))::integer likes,
      (count(ld.*) filter (where "isDisliked" = true))::integer dislikes,
      (count(ld.*) filter (where ld."userId" = 1 and "isLiked" = true))::integer "userLiked",
      (count(ld.*) filter (where ld."userId" = 1 and "isDisliked" = true))::integer "userDisliked"
    from "entries" e
    left join "likesDislikes" ld using ("entryId")
    group by "entryId";
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

app.post('/api/likesDislikes/:entryId', (req, res, next) => {
  const entryId = req.params.entryId;
  const userId = 1;
  let isLiked = req.body.isLiked;
  let isDisliked = req.body.isDisliked;

  const selectSql = `
    select
      "isLiked",
      "isDisliked"
    from
      "likesDislikes"
    where
      "userId" = $1 and "entryId" = $2
  `;
  const selectParams = [userId, entryId];

  db.query(selectSql, selectParams)
    .then(selectResult => {
      const [existingLikeInfo] = selectResult.rows;

      if (existingLikeInfo) {
        if (isLiked) {
          isLiked = isLiked !== existingLikeInfo.isLiked;
          isDisliked = false;
        } else if (isDisliked) {
          isLiked = false;
          isDisliked = isDisliked !== existingLikeInfo.isDisliked;
        }
      }

      const insertSql = `
        insert into "likesDislikes" ("entryId", "userId", "isLiked", "isDisliked")
          values ($1, $2, $3, $4)
          on conflict ("userId", "entryId")
          do update set "isLiked" = $3, "isDisliked" = $4
        returning *
      `;
      const insertParams = [entryId, userId, isLiked, isDisliked];

      return db.query(insertSql, insertParams)
        .then(result => {
          const newEntry = result.rows[0];
          res.status(201).json(newEntry);
        });
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
