window.gn9_supportedLang = [ 'en' ];





window.gn9_game = p => {
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
  
  let lines = {};
  
  
  
  
  p.preload = function() {
    setupGameLang();
    lines.menu = loadStrings(`${assets}\/menu.txt`).join('\n');
  };
  
  
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p._renderer.elt.setAttribute("style", "image-rendering: pixelated; border-spacing: 0; border-collapse: collapse; " + p._renderer.elt.getAttribute("style"));
  };

  p.draw = function() {
    p.background(0);
    p.fill(255);
    p.rect(p.mouseX, p.mouseY, 50, 50);
  };
};

window.gn9_p5obj = new p5(gn9_game); // invoke p5
