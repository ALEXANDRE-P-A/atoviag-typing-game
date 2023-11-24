INSERT INTO 
  users (`username`, `email`, `password`, `age`, `region`, `createdAt`, `updatedAt`)
VALUES
  (?, ?, ?, ?, ?, now(), now())