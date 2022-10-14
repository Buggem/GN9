window.gn9_game = p => {
  let x = 100;
  let y = 100;

  p.setup = function() {
    p.createCanvas(700, 410);
  };

  p.draw = function() {
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
  };
};

window.gn9_p5obj = new p5(gn9_game); // invoke p5
