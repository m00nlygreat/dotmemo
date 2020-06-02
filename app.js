var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var app = http.createServer(function(request, response) {
            var _url = request.url;
            var pathname = url.parse(_url, true).pathname;

            var htmlHeader = fs.readFileSync('main.html', 'utf8');
            var htmlFooter = `</ul></body></html>`;

            // 메인페이지에 접근하는 경우
            if (_url == '/') {
                var dotList = fs.readdirSync('./dots');
                var dotListHTML = '';
                dotList.forEach(dotID => {
                            dotListHTML += `<li>${fs.readFileSync(`./dots/${dotID}`, 'utf8')}</li>`
                  });

                var HTML = htmlHeader + dotListHTML + htmlFooter;

                response.end(HTML);
                return response.writeHead(200);
                }

            if (pathname == '/write') {

                var body = '';
                request.on('data', function (data) {
                    body = body + data;
                });
                request.on('end', function () {
                    var ts = new Date();
                    var dotID = ts.toLocaleString()
                    var dotDesc = qs.parse(body).dot_description;

                    fs.writeFile(`./dots/${dotID}`,dotDesc, 'utf8', function(err){
                        console.log(err);
                        response.writeHead(302, { 'Location' : '/' });
                        response.end();
                    })
                    })

                return;

            }

                if (_url == '/favicon.ico') {return response.writeHead(404);}

            // 아무 것에도 해당하지 않는 경우, 파일을 response
            {response.end(fs.readFileSync(__dirname + url));return response;writeHead(200);}

});
const PORT = process.env.PORT


app.listen(PORT);