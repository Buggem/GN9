// hide cursor

document.documentElement.style.cursor = 'none';


// make sure cursor is hidden at all times

document.documentElement.style.width  = '100%';
document.documentElement.style.height = '100%';







window.getWindowBoundingRect = function() {
  var oldStyleThung = {
    width:  document.documentElement.style.width,
    height: document.documentElement.style.height
  };
  document.documentElement.style.width  = '100%';
  document.documentElement.style.height = '100%';
  var trueDimensions = document.documentElement.getBoundingClientRect();
  document.documentElement.style.width  = oldStyleThung.width;
  document.documentElement.style.height = oldStyleThung.height;
  return trueDimensions;
}


window.gn9_supportedLang = [ 'en' ];





window.gn9_game = p => {
  let cbr;
  let canzy;
  let assets = 'src\/assets\/lang\/';
  let getNavLang = function() {
    return (navigator.language || navigator.browserLanguage).split('-')[0];
  };
  let setupGameLang = function() {
    let yourLang = getNavLang();
    if(window.gn9_supportedLang.includes(yourLang)) {
      assets = `${assets}${yourLang}`;
    } else {
      assets = `${assets}en`;
    }
  };
  let canzyWinResizable = function() {
    let brwin = window.getWindowBoundingRect();
    p.resizeCanvas((brwin.width + cbr.x), (brwin.height+ cbr.y));
  };
  let image2 = function(image, x, y, width, height) {
    for(let x = 0; x < image.width; x++) {
      for(let y = 0; y < image.height; y++) {
        p.rectMode(CORNER);
        p.noStroke();
        p.fill(...image.get(x, y));
        p.rect(x*(width/image.width), y*(height/image.height), (width/image.width), (height/image.height));
      }
    }
  };
  let lines = {};
  let images = {};
  
  
  
  p.preload = function() {
    setupGameLang();
    lines.menu = p.loadStrings(`${assets}\/menu.txt`).join('\n');
    images.cursor = p.loadImage(`${assets}\/cursor_pixel.png`);
    images.logo = p.loadImage(`${assets}\/logo-gn9.png`);
  };
  
  
  p.setup = function() {
    canzy = p.createCanvas(p.windowWidth, p.windowHeight);
    cbr = canzy.elt.getBoundingClientRect();
    canzy.position(0-cbr.x, 0-cbr.y);
    canzyWinResizable();
  };

  p.draw = function() {
    canzyWinResizable();
    p.background(255);
    p.fill(255, 0, 0);
    p.imageMode(p.CORNER);
    p.image(images.cursor, p.mouseX, p.mouseY, 50, 50);
    p.imageMode(p.CENTER);
    p.image2(images.logo, (p.width/2)-images.logo.width/2, (p.height/5)-images.logo.height/2, images.logo.width*5.23521, images.logo.height*5.23521);
    
  };
};

window.gn9_p5obj = new p5(gn9_game); // invoke p5
