var q = require("q");
var db = require("../common/database");

var conn = db.getConnnection();

function getAllPosts(){
    var defer = q.defer();
    var query = conn.query('SELECT * FROM posts', function(err, posts) {
       if(err){
           defer.reject(err);
       } else {
            defer.resolve(posts);
       }
    });
    return defer.promise;
}

module.exports = {
    getAllPosts: getAllPosts
}