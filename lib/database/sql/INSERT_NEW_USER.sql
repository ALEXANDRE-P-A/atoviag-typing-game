INSERT INTO 
  users (`username`, `email`, `password`, `age`, `region`, `createdAt`, `updatedAt`, `last_cookie`, `last_session`)
VALUES
  (?, ?, ?, ?, ?, now(), now(), ?, ?)