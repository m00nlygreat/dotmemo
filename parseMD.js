function parseMD(md){
  
    //ul
    md = md.replace(/^\s*\n\*/gm, '<ul class="md">\n*');
    md = md.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
    md = md.replace(/^\*(.+)/gm, '<li class="md">$1</li>');
    
    //ol
    md = md.replace(/^\s*\n\d\./gm, '<ol class="md">\n1.');
    md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
    md = md.replace(/^\d\.(.+)/gm, '<li class="md">$1</li>');
    
    //blockquote
    md = md.replace(/^\>(.+)/gm, '<blockquote class="md">$1</blockquote>');
    
    //h
    md = md.replace(/[\#]{6}(.+)/g, '<h6 class="md">$1</h6>');
    md = md.replace(/[\#]{5}(.+)/g, '<h5 class="md">$1</h5>');
    md = md.replace(/[\#]{4}(.+)/g, '<h4 class="md">$1</h4>');
    md = md.replace(/[\#]{3}(.+)/g, '<h3 class="md">$1</h3>');
    md = md.replace(/[\#]{2}(.+)/g, '<h2 class="md">$1</h2>');
    md = md.replace(/[\#]{1}(.+)/g, '<h1 class="md">$1</h1>');
    
    //alt h
    md = md.replace(/^(.+)\n\=+/gm, '<h1 class="md">$1</h1>');
    md = md.replace(/^(.+)\n\-+/gm, '<h2 class="md">$1</h2>');
    
    //images
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" class="md"/>');
    
    //links
    md = md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4" class="md">$1</a>');
    
    //font styles
    md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b class="md">$1</b>');
    md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i class="md">$1</i>');
    md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del class="md">$1</del>');
    
    //pre
    md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2 md">');
    md = md.replace(/^\`\`\`\s*\n/gm, '</pre>\n\n');
    
    //code
    md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code class="md">$1</code>');
    
    //p
    md = md.replace(/^\s*(\n)?(.+)/gm, function(m){
      return  /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p class="md">'+m+'</p>';
    });
    
    //strip p from pre
    md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, '$1$2');
    
    return md;
    
  }

  module.exports = parseMD;