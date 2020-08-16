module.exports = {
    build: function (table) {
        return `<!DOCTYPE html>
    <html lang="ko">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>dot${(table == 'default' ? '' : ' - ' + table)}</title>
    </head>
    
    <body>
        <h1 style="display:inline">${(table == 'default' ? 'dot' : table)}.</h1>
        <a href=/empty?id=${table}>empty</a>
        <form action="write" method="POST">
            <input type="hidden" name="table" value="${table}"></input>
            <input type="hidden" name="createYN" value=0></input>
            <input type="text" name="dot_description" placeholder="${table}"></input>
            <input type="submit">
        </form>
        <ul>`;
    }
}

