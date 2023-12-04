UPDATE
  users
SET
  certifyAt = now(),
  last_cookie = null,
  last_session = null
WHERE
  last_cookie = ?
  AND
  last_session = ?