SELECT
  email,
  createdAt,
  certifyAt
FROM
  users
WHERE
  last_cookie = ?
  AND
  last_session = ?