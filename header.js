module.exports = {
    build: function (table) {
        return `<!DOCTYPE html>
        <html lang="ko">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="style.css">
            <link rel="manifest" href="manifest.json">
            <link rel="apple-touch-icon" sizes="57x57" href="icon/apple-icon-57x57.png">
            <link rel="apple-touch-icon" sizes="60x60" href="icon/apple-icon-60x60.png">
            <link rel="apple-touch-icon" sizes="72x72" href="icon/apple-icon-72x72.png">
            <link rel="apple-touch-icon" sizes="76x76" href="icon/apple-icon-76x76.png">
            <link rel="apple-touch-icon" sizes="114x114" href="icon/apple-icon-114x114.png">
            <link rel="apple-touch-icon" sizes="120x120" href="icon/apple-icon-120x120.png">
            <link rel="apple-touch-icon" sizes="144x144" href="icon/apple-icon-144x144.png">
            <link rel="apple-touch-icon" sizes="152x152" href="icon/apple-icon-152x152.png">
            <link rel="apple-touch-icon" sizes="180x180" href="icon/apple-icon-180x180.png">
            <link rel="icon" type="image/png" sizes="192x192" href="icon/android-icon-192x192.png">
            <link rel="icon" type="image/png" sizes="32x32" href="icon/favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="96x96" href="icon/favicon-96x96.png">
            <link rel="icon" type="image/png" sizes="16x16" href="icon/favicon-16x16.png">
            <meta name="msapplication-TileColor" content="#ffffff">
            <meta name="msapplication-TileImage" content="icon/ms-icon-144x144.png">
            <meta name="theme-color" content="#ffffff">
            <title>dot.${(table == 'default' ? '' : ' - ' + table)}</title>
        </head>
        
        <body>
            <div class="wrapwrap">
            <div class="flexWrap">
                <header class="topWrapper">
                        <h1>${(table == 'default' ? 'dot' : table)}</h1>
                        <div class="dot offset"><a href=/empty?id=${table}></a></div>
                        <form action="write" method="POST">
                            <div class="formWrapper">
                                <input type="hidden" name="table" value="${table}"></input>
                                <input type="hidden" name="createYN" value=0></input>
                                <input type="text" name="dot_description" autocomplete="off" placeholder="to ${table} board" class="dotdesc" autofocus></input>
                                <input type="submit" class="btn" value="put.">
                            </div>
                        </form>
                </header>
                <article>
                    
                    <ul>`;
    }
}

/*
<li>
    <span class="dot">
        <a href="/empty?id=${table}&row=${item.id}">&nbsp;</a>
        </span>
    <span class="dotContent">${item.dot}
       </span>
</li>
</ul></article></div></body></html>
*/