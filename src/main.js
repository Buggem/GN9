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
    canzy.elt.setAttribute('width' , (brwin.width + cbr.x).toString());
    canzy.elt.setAttribute('height', (brwin.height+ cbr.y).toString());
    canzy.elt.style.width  = ((brwin.width + cbr.x).toString()) + 'px';
    canzy.elt.style.height = ((brwin.height+ cbr.y).toString()) + 'px';
  };
  
  let lines = {};
  
  
  
  
  p.preload = function() {
    setupGameLang();
    lines.menu = p.loadStrings(`${assets}\/menu.txt`).join('\n');
  };
  
  
  p.setup = function() {
    canzy = p.createCanvas(p.windowWidth, p.windowHeight);
    cbr = canzy.elt.getBoundingClientRect();
    canzy.position(0-cbr.x, 0-cbr.y);
    canzyWinResizable();
  };

  p.draw = function() {
    canzyWinResizable();
    p.background(0);
    p.fill(255);
    p.rect(p.mouseX, p.mouseY, 50, 50);
  };
};

window.gn9_p5obj = new p5(gn9_game); // invoke p5
