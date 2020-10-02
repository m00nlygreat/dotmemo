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
    password: 'm00nlygreat',
    database: 'dot'
});

db.connect();

// app start
var app = http.createServer(function (request, response) {
    // 두개중 하나는 안써도 될 것 같은데..
    var _url = request.url;
    var pathname = url.parse(_url, true).pathname;
    var table = (pathname == '/' ? 'default' : pathname.replace('/', ''));

    var htmlHeader = template.build(table);
    var htmlFooter = `</ul></article></div><script> </script></body></html>`;
    var whiteList = ["/icon/apple-icon-57x57.png",
        "/icon/apple-icon-60x60.png",
        "/icon/apple-icon-72x72.png",
        "/icon/apple-icon-76x76.png",
        "/icon/apple-icon-114x114.png",
        "/icon/apple-icon-120x120.png",
        "/icon/apple-icon-144x144.png",
        "/icon/apple-icon-152x152.png",
        "/icon/apple-icon-180x180.png",
        "/icon/android-icon-192x192.png",
        "/icon/favicon-32x32.png",
        "/icon/favicon-96x96.png",
        "/icon/favicon-16x16.png",
        "/icon/ms-icon-144x144.png",
        "/icon/favicon.ico",
        "manifest.json",
    "/style.css"];

    console.log(pathname);
    
    if (whiteList.includes(pathname)) {
        response.end(fs.readFileSync(__dirname + pathname));
        return response.writeHead(200);
    }

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

        if (queryData.row) {
            db.query(`DELETE FROM \`${tableName}\` WHERE id=${queryData.row}`, function (err, result) {
                if (err) { console.log(err); }
                response.writeHead(302, { 'Location': `/${(tableName == 'default' ? '' : tableName)}` });
                return response.end();
            });
        } else {


            db.query(`${(tableName == 'default' ? 'TRUNCATE' : 'DROP TABLE')} \`${tableName}\``, function (err, result) {
                if (err) { console.log(err); }
                response.writeHead(302, { 'Location': `/` });
                return response.end();
            });
        }



    }



    // 메인페이지 또는 별도의 서브 테이블에 접근하는 경우

    if (pathname != '/write') {
        if (pathname != '/empty') {

            var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
            var regex = new RegExp(expression);


            var dotListHTML = '';

            db.query(`SELECT * FROM \`${table}\``, function (err, result) {
                if (err) {
                    if (err.errno == 1146) {
                        htmlHeader = htmlHeader.replace(/value=0/, 'value=1');
                    }
                }
                try {
                    result.forEach((item) => {
                        if (item.dot.match(regex)) {
                            dotListHTML += `<li><span class="dot"><a href="/empty?id=${table}&row=${item.id}">&nbsp;</a></span><span class="dotContent"><a href="${item.dot}">${item.dot}</a></span></li>`;
                        } else {
                            dotListHTML += `<li><span class="dot"><a href="/empty?id=${table}&row=${item.id}">&nbsp;</a></span><span class="dotContent">${item.dot}</span></li>`;
                        }

                    });
                }
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
CREATE DATABASE `dot`
  CHARACTER SET = 'utf8';

CREATE TABLE `default`(
`id` int(11) NOT NULL AUTO_INCREMENT,
`dot` TEXT NOT NULL,
`date` DATETIME,
PRIMARY KEY (`id`));

C:\Windows\System32\cmd.exe /k " "C:\Program Files\MariaDB 10.5\bin\mysql.exe" "--defaults-file=C:\Program Files\MariaDB 10.5\data\my.ini" -uroot -p"


mysql -hao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com -ubm9rie6dl9gd3hn4 -plp3alh1o25sz79ct nkyplzz18tmurkav

SELECT table_schema "nkyplzz18tmurkav",
SUM(data_length + index_length) / 1024 / 1024 "Size(MB)"
FROM information_schema.TABLES
GROUP BY table_schema;

*/