UPDATE
  users
SET
  certifyAt = now()
WHERE
  last_cookie = ?
  AND
  last_session = ?