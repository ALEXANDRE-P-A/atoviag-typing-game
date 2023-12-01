DELETE FROM
  login_history
WHERE
  user_id = ?
  AND
  login <=
  (
    SELECT
      login
    FROM
    (
      SELECT
        login
      FROM
        login_history
      WHERE
        user_id = ?
      ORDER BY DESC
      LIMIT 1 OFFSET ?
    ) as tmp
  )