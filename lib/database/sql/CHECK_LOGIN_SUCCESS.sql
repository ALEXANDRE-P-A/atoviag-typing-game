SELECT
  count(*) as count
FROM
  login_history
WHERE
  user_id = ?
  AND
  status = ?
