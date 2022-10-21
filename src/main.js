// hide cursor

document.documentElement.style.cursor = 'none';


// make sure cursor is hidden at all times
p5.Element.prototype.gtf = function() {
  this.elt.style.position = 'absolute';
  document.getElementsByTagName("main")[0].appendChild(this.elt)
};
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
  let image2 = function(image, posx, posy, width, height) {
    for(let x = 0; x < image.width; x++) {
      for(let y = 0; y < image.height; y++) {
        p.rectMode(p.CORNER);
        p.noStroke();
        p.fill(...image.get(x, y));
        p.rect((x*(width/image.width))+posx, (y*(height/image.height))+posy, (width/image.width), (height/image.height));
      }
    }
  };
  let sp_img = function(theUri) {
    let img = new Image();
    img.style.imageRendering = 'pixelated';
    img.src = theUri;
    return img;
  };
  window.lines = {};
  window.images = {};
  
  
  
  p.preload = function() {
    setupGameLang();
    lines.menu = p.loadStrings(`${assets}\/menu.txt`).join('\n');
    images.cursor = {
      img: p.loadImage(`${assets}\/cursor_pixel.png`, function() {
        images.cursor.ready = true;
      }),
      ready: false
    };
    images.logo = {
      img: new p5.Element(sp_img(`${assets}\/logo-gn9.png`)),
      ready: true
    };
  };
  
  
  p.setup = function() {
    canzy = p.createCanvas(p.windowWidth, p.windowHeight);
    cbr = canzy.elt.getBoundingClientRect();
    canzy.position(0-cbr.x, 0-cbr.y);
    canzyWinResizable();
    images.logo.img.gtf();
    images.logo.img.elt.width = 600;
    images.logo.img.elt.height = 300;
    //p.pixelDensity(1);
  };

  p.draw = function() {
    canzyWinResizable();
    p.background(255);
    p.fill(255, 0, 0);
    p.imageMode(p.CORNER);
    if(images.cursor.ready) { p.image(images.cursor.img, p.mouseX, p.mouseY, 50, 50); }
    p.imageMode(p.CENTER);
    //p.pixelDensity(6);
    if(images.logo.ready) { images.logo.img.position((p.width/2)-(images.logo.img.elt.width/2), (p.height/5)-(images.logo.img.elt.height/2)); }
    //p.pixelDensity(1);
  };
};

window.gn9_p5obj = new p5(gn9_game); // invoke p5
