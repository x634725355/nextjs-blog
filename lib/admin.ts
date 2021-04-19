const MongoClient = require('mongodb').MongoClient;
const test = require('assert');

export function main() {
    // Connection url
    const url: string = 'mongodb://localhost:27017/momo';
    const dbName: string = 'CSC';

    MongoClient.connect(url, function (err, client) {
        // Create a collection we want to drop later
        if (err) throw err;

        console.log('数据库创建或者连接成功');
        // 连接到CSC库
        const dbase = client.db(dbName);
        // 创建一个site表
        dbase.createCollection('site', function (err, res) {
            if (err) throw err;
            console.log('创建集合');
            client.close();
        });

    });
}


