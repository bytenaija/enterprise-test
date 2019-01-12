module.exports = {
    
    MONGO_URL : process.env.NODE_ENV == 'production' ? process.env.MONGO_URL : process.env.NODE_ENV == 'test' ? "mongodb://user:password1@ds155294.mlab.com:55294/lmdb_test":'mongodb://user:password1@ds151554.mlab.com:51554/lmdb'
}