/* Moving parts*/
var $circles = $('.circle'),
    $dots = $('.dot'),
    $dotBlue = $('.dotBlue'),
    $dotRed = $('.dotRed'),
    $dotYellow = $('.dotYellow'),
    $dotGreen = $('.dotGreen'),
    $gBlue = $('#blueG'),
    $gRed = $('#redG'),
    $gRedb = $('#redGb'),
    $gYellow = $('#yellowG'),
    $gGreen = $('#greenG'),
    $gLine = $('#gLine'),
    $gLineAnim = $('#gLineAnim'),
    $gLineMask = $('#gLineMask'),
    $gMask = $('#gMask'),
    $bcg = $('.logoBcg'),
    pathRed = [{x: 0, y: -1},{x: 31, y: -51},{x: 74, y: -1}],
    pathYellow = [{x: -41, y: 46},{x: -76, y: 0},{x: -35, y: -46},{x: 14, y: 1}],
    pathGreen = [{x: -67, y: 82},{x: -145, y: 0},{x: -100, y: -46},{x: -43, y: 3}],
    tl = new TimelineMax({onUpdate: updateSlider, repeat: 3, yoyo: true, repeatDelay: 2});

/* Init */
function init(){
  TweenLite.set([$gLine,$circles], {autoAlpha: 0});
  TweenLite.set($gBlue, {drawSVG:"61% 78%"}); /* start at 71% 78% */
  TweenLite.set($gGreen, {drawSVG:"36% 61%"});
  TweenLite.set($gYellow, {drawSVG:"17% 36%"});
  TweenLite.set($gRed, {drawSVG:"0% 26%"});
  TweenLite.set($gRedb, {drawSVG:"78% 100%", transformOrigin: 'center center'});
  TweenLite.set($gLineAnim, {autoAlpha: 0});
}
init();

/* Dots rotation */
function getDotsRotateTl(){
  var dotsRotateTl = new TimelineMax();
  
  dotsRotateTl
    .to($dotRed, 0.9, {bezier:{curviness: 1.5, values: pathRed, ease:Power2.easeInOut}}, 0)
    .to($dotYellow, 1.2, {bezier:{curviness: 1, values: pathYellow, ease:Power2.easeInOut}}, 0)
    .to($dotGreen, 1.5, {bezier:{curviness: 1, values: pathGreen, ease:Power2.easeInOut}}, 0);
  
  return dotsRotateTl;
} 

/* Draw G */
function getDrawGTl(){
  var drawGTl = new TimelineMax();
  
  drawGTl
    .to($dotBlue, 0.6, {x: 47, ease:Power2.easeIn})
    .set($gLineAnim, {autoAlpha: 1, immediateRender: false})
    .set($dotBlue, {autoAlpha: 0, immediateRender: false}, '+=0.1')
    .from($gLineAnim, 0.8, {x: -120, ease:Power2.easeOut}, '-=0.2')
    /* draw red part */
    .add('startDrawingG', 1)
    .set($gRed, {autoAlpha: 1, immediateRender: false}, 'startDrawingG')
    .fromTo($gRed, 0.5, {drawSVG:"71% 88%"}, {drawSVG:"0% 26%", ease:Power1.easeOut}, '-=0.2')
    .set($dotRed, {autoAlpha: 0, immediateRender: false}, 'startDrawingG')
    /* draw yellow part */
    .set($gYellow, {autoAlpha: 1, immediateRender: false}, 'startDrawingG+=0.1')
    .fromTo($gYellow, 0.6, {drawSVG:"71% 88%"}, {drawSVG:"17% 36%", ease:Power2.easeOut}, '-=0.45')
    .set($dotYellow, {autoAlpha: 0, immediateRender: false}, 'startDrawingG+=0.1')
    /* draw green part */
    .set($gGreen, {autoAlpha: 1, immediateRender: false}, 'startDrawingG+=0.1')
    .fromTo($gGreen, 0.55, {drawSVG:"71% 88%"}, {drawSVG:"36% 61%", ease:Power2.easeOut}, '-=0.6')
    .set($dotGreen, {autoAlpha: 0, immediateRender: false}, 'startDrawingG+=0.4')
    /* draw blue part */
    .set($gLineAnim, {autoAlpha: 0, immediateRender: false}, 'startDrawingG+=0.3')
    .set($gLine, {autoAlpha: 1, immediateRender: false}, 'startDrawingG+=0.3')
    .set($gBlue, {autoAlpha: 1, immediateRender: false}, 'startDrawingG+=0.3')
    .fromTo($gBlue, 0.55, {drawSVG:"71% 88%"}, {drawSVG:"61% 78%", ease:Power2.easeOut}, '-=0.55')
    /* draw ending red part */
    .set($gRedb, {autoAlpha: 1, immediateRender: false}, 'startDrawingG+=0.25')
    .fromTo($gRedb, 0.7, {rotation: '-10', drawSVG:"100% 100%"}, {rotation: '0',drawSVG:"80% 100%", ease:Power2.easeOut}, '-=0.22');
  
  return drawGTl;
}


  
/* Main timeline */
tl.add(getDotsRotateTl())
  .add(getDrawGTl(), '-=1.6');

tl.timeScale(1.8);

$("#slider").slider({
  range: false,
  min: 0,
  max: 100,
  step:.1,
  slide: function ( event, ui ) {
    tl.pause();
    //adjust the timeline’s progress() based on slider value
    tl.progress( ui.value/100 );
    }
});

function updateSlider() {
  $("#slider").slider("value", tl.progress() *100);
}