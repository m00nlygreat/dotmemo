module.exports = {
    build: function (table) {
        return `<!DOCTYPE html>
    <html lang="ko">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel= "stylesheet" type="text/css" href="/style.css">
        <title>dot${(table == 'default' ? '' : ' - ' + table)}</title>
    </head>
    
    <body>
        <h1 style="display:inline;">${(table == 'default' ? 'dot' : table)}<a href=/empty?id=${table}>.</a></h1>
        <form action="write" method="POST" style="margin-top:1em;">
            <input type="hidden" name="table" value="${table}"></input>
            <input type="hidden" name="createYN" value=0></input>
            <input type="text" name="dot_description" placeholder="to ${table} board" autofocus></input>
            <input type="submit">
        </form>
        <ul>`;
    }
}

