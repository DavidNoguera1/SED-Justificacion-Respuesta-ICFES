function processHtmlImages(html) {
  if (!html) return '';
  return html.replace(/src=["']([^"']+\.png)["']/gi, function(match, src) {
    if (src.startsWith('http') || src.startsWith('/') || src.startsWith('../')) {
      return match;
    }
    return 'src="' + IMG_BASE_PATH + src + '"';
  });
}

function extractImages(html) {
  if (!html) return [];
  var imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  var images = [];
  var match;
  while ((match = imgRegex.exec(html)) !== null) {
    var src = match[1];
    if (!src.startsWith('http') && !src.startsWith('/') && !src.startsWith('../')) {
      src = IMG_BASE_PATH + src;
    }
    images.push(src);
  }
  return images;
}