module.exports = {
    MONGO_URL : process.env.NODE_ENV == 'production' ? 'mongodb://user:password@localhost:21017/lmdb' : 'mongodb://user:password1@ds151554.mlab.com:51554/lmdb'
}