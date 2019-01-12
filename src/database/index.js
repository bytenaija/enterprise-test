module.exports = {
    MONGO_URL : process.env.NODE_ENV == 'production' ? process.env.MONGO_URL : 'mongodb://user:password1@ds151554.mlab.com:51554/lmdb'
}