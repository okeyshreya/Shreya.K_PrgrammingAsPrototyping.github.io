w = 400
h = 400

let meme1;
let button;
let myFont;
let slider1;
let slider2;
let slider3;
let slider4;
let Top;
let Bottom;

function imageupdate() {
  let m1 = dropdown.value()
  meme1 = loadImage(m1)
}

function fontupdate() {
  let f1 = radio1.value()
  font1 = loadFont(f1)
}

function setup() {
    let cnv = createCanvas(w,h);
    cnv.parent('column-two'); //sets <div id="column-two"></div> as parent container of the canvas
    
    //Example of an input element (button) --- Replace this with your own inputs/controls
    // Assign all your input elements the parent - 'column-one'
    
    P=createP('Enter Text below :')
    P.parent('column-one');
    P.class('text1');
    Top = createInput('Top text can be edited here')
    Bottom = createInput('Bottom text can be edited here')
    Top.parent('column-one');
    Top.class('text');
    Bottom.parent('column-one');
    Bottom.class('text');  
 

    P1=createP('Choose an image:')
    P1.parent('column-one');
    P1.class('text2');
    dropdown = createSelect();
    dropdown.option('Crying vs Smiling','./images/blackdude.jpg');
    dropdown.option('Drake','./images/drakee.jpg');
    dropdown.option('Running man', './images/run.jpg');
    dropdown.changed(imageupdate);
    
    let m1 = dropdown.value()
    meme1 = loadImage(m1)

    dropdown.parent('column-one');
    dropdown.class('imgdropdown');

     
    P2=createP('Select a Font:')
    P2.parent('column-one');
    P2.class('text3');

    radio1 = createRadio();
    radio1.option('./fonts/Inter-VariableFont_slnt,wght.ttf', 'Inter Variable Font');
    radio1.option('./fonts/Barriecito-Regular.ttf', 'Barriecito Font');
    radio1.option('./fonts/BlackOpsOne-Regular.ttf', 'BlackOpsOne Font');
    radio1.changed(fontupdate);
    
    font1 = loadFont('./fonts/Inter-VariableFont_slnt,wght.ttf')
    radio1.parent('column-one');
    radio1.class('fontradio');


    P3=createP('Choose Colors:')
    P3.parent('column-one')
    P3.class('text4');

    
  
    slider1 = createSlider(0, 500, 50) // min, max, default value
    
    
  
    
    slider2 = createSlider(0, 300, 50)
    
    
  
    
    slider3 = createSlider(0,200,50)  
    

    
    slider4 = createSlider(0,50,36)


    slider1.parent('column-one');
    slider1.class('sliders');
    slider1.id('R');
    
    slider2.parent('column-one');
    slider2.class('sliders');
    slider2.id('G');

    slider3.parent('column-one');
    slider3.class('sliders');
    slider3.id('B');
    P4=createP('Font size :')
    P4.parent('column-one')
    P4.class('text5');
    slider4.parent('column-one');
    slider4.class('sliders');
    slider4.id('Size');

    
  }
  

  
  function draw() {
    background('white');
    image(meme1, 0,0,200,400)

  
    fill(color('white'));
    rect(200,0,200,400);
    strokeWeight(10);
    line(0, 200, 400, 200);
    fill(color('white'));
    rect(200,0,200,400);
    strokeWeight(10);
    line(0, 200, 400, 200);
     
    let v1 = slider1.value();
    let v2 = slider2.value();
    let v3 = slider3.value();
    let v4 = slider4.value();
    
    textAlign(CENTER,CENTER)
    textSize(v4)
    textFont(font1)
    let s = Top.value();
   
    // v1='Red', v2 = 'Green', v3 = 'Blue' 
    let c = color(v1,v2,v3);
    fill(c)
    text(s, 200, 0, 200, 200)
  
    textAlign(CENTER,CENTER)
    let k = Bottom.value();
    text(k, 200, 200, 200, 200)
   
    
  }



  
  
  
  