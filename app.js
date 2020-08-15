var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// var async = require('async');
var mysql = require('mysql2');

var db = mysql.createConnection({
    host: 'ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'bm9rie6dl9gd3hn4',
    password: 'lp3alh1o25sz79ct',
    database: 'nkyplzz18tmurkav'
});

db.connect();

var app = http.createServer(function (request, response) {
    // 두개중 하나는 안써도 될 것 같은데..
    var _url = request.url;
    var pathname = url.parse(_url, true).pathname;

    var htmlHeader = fs.readFileSync('main.html', 'utf8');
    var htmlFooter = `</ul></body></html>`;

    // 메인페이지에 접근하는 경우
    if (pathname == '/') {

        var dotListHTML = '';

        db.query('SELECT * FROM `default`', function (err, result) {
            result.forEach(item => {
                dotListHTML += `<li>${item.dot}</li>`;
            });
            var HTML = htmlHeader + dotListHTML + htmlFooter;
            response.end(HTML);
            return response.writeHead(200);
        })



    }

    if (pathname == '/write') {

        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        request.on('end', function () {


            var dotDesc = qs.parse(body).dot_description;
            // connection.query(`INSERT INTO \`default\`(dot, date) VALUES ('${dotDesc}', NOW())`);

            db.query(`INSERT INTO \`default\`(dot, date) VALUES ('${dotDesc}', NOW())`, function(err, result){
                response.writeHead(302, { 'Location': '/' });
                response.end();
            });

        })

        return;

    }

    if (_url == '/favicon.ico') { return response.writeHead(404); }

    // 아무 것에도 해당하지 않는 경우, 파일을 response
    // { response.end(fs.readFileSync(__dirname + url)); return response; writeHead(200); }

});
const PORT = process.env.PORT


app.listen(PORT);