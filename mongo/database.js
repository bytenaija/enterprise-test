db.auth('root', 'password')

db = db.getSiblingDB('lmdb_test')

db.createUser({
  user: 'user',
  pwd: 'password',
  roles: [
    {
      role: 'root',
      db: 'lmdb_test',
    },
  ],
});



db = db.getSiblingDB('lmdb')
db.createUser({
  user: 'user',
  pwd: 'password',
  roles: [
    {
      role: 'root',
      db: 'lmdb',
    },
  ],
});