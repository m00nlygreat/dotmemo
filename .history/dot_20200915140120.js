var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./header.js');
// var async = require('async');
var mysql = require('mysql2');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'superman',
    database: 'dot'
});

db.connect();

var app = http.createServer(function (request, response) {
    // 두개중 하나는 안써도 될 것 같은데..
    var _url = request.url;
    var pathname = url.parse(_url, true).pathname;
    var table = (pathname == '/' ? 'default' : pathname.replace('/', ''));

    var htmlHeader = template.build(table);
    var htmlFooter = `</ul></body></html>`;

    if (pathname == '/write') {

        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        request.on('end', function () {
            var dotDesc = qs.parse(body).dot_description;
            var tableName = qs.parse(body).table;

            if (qs.parse(body).createYN == 1) {
                db.query(
                    `CREATE TABLE ${tableName}(
                    id int(11) NOT NULL AUTO_INCREMENT,
                    dot TEXT NOT NULL,
                    date DATETIME,
                    PRIMARY KEY (id));`,
                    function (err, result) { console.log(err); });
            }

            db.query(`INSERT INTO \`${tableName}\`(dot, date) VALUES ('${dotDesc}', NOW())`, function (err, result) {
                if (err) { console.log(err); }
                response.writeHead(302, { 'Location': `/${(tableName == 'default' ? '' : tableName)}` });
                return response.end();

            });


        })
    }

    if (pathname == '/empty') {
        var queryData = url.parse(_url, true).query;

        var tableName = queryData.id;
        console.log(`${(tableName == 'default' ? 'TRUNCATE' : 'DROP TABLE')} \` ${tableName}\``);

        db.query(`${(tableName == 'default' ? 'TRUNCATE' : 'DROP TABLE')} \`${tableName}\``, function (err, result) {
            if(err){console.log(err);}
            response.writeHead(302, { 'Location': `/` });
            return response.end();
        });



    }

    if (pathname == '/favicon.ico') { return response.writeHead(404); }



    // 메인페이지 또는 별도의 서브 테이블에 접근하는 경우

    if (pathname != '/write') {
        if (pathname != '/empty') {

            var dotListHTML = '';

            db.query(`SELECT * FROM \`${table}\``, function (err, result) {
                if (err) {
                    if (err.errno == 1146) {
                        htmlHeader = htmlHeader.replace(/value=0/, 'value=1');
                    }
                }
                try { result.forEach(item => { dotListHTML += `<li>${item.dot}<a href=/empty?id=${table}>.</a></li>`; }); }
                catch { dotListHTML = `<p>항목이 없습니다.</p>` }

                response.end(htmlHeader + dotListHTML + htmlFooter);
                return response.writeHead(200);
            })

        }
    }


});
const PORT = process.env.PORT


app.listen(80);

/*
CREATE TABLE `default`(
    id int(11) NOT NULL AUTO_INCREMENT,
    dot TEXT NOT NULL,
    date DATETIME,
    PRIMARY KEY (id));
*/