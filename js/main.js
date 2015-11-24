var initialClicks = 0;
var numCats = 5;
var cats = [];
var catNames = ["Alex", "Aiden", "Chloe", "Henry", "Sebastian"];
var catImages = ["./img/kitten1.jpg", "./img/kitten2.jpg", "./img/kitten3.jpg", "./img/kitten1.jpg", "./img/kitten2.jpg"];

var Cat = function(name, catImage) {
  this.name = name;
  this.catImage = catImage;
};

var ClickCounter = function(clicks) {
  this.clicks = clicks;
};

ClickCounter.prototype.addClickCount = function() {
  this.clicks++;
};

var clicker1 = new ClickCounter(0);
var clicker2 = new ClickCounter(0);
$('.totalClicks1,.totalClicks2').text(initialClicks);

for (var i = 0; i < numCats; i++) {
  cats[i] = new Cat(catNames[i], catImages[i]);
  $('.dropdown-menu').append('<li><a id="catSelect' + i + '"href="#">' + cats[i].name + '</a></li>');
}

$('ul.dropdown-menu').click(function(event) {
  var target = $(event.target);
  console.log(target.context.id);
  for (var i = 0; i < cats.length; i++) {
    if (target.context.id === ('catSelect' + i)) {
      console.log("DDDDDDDDD");
      $('.kittyImages > .col-md-6').html('<button type="button" name="score' + i +
      '" class="btn btn-primary">Number of clicks: <span class="badge"><div class="totalClicks' + i + '"></div></span></button><img src="./img/kitten' + i +
      '.jpg" class="img-responsive" alt="Kitten" id="kittyImg' + i + '"/>' +
      '<h3 class="caption">' + cats[i].name + '</h3>');
    }
  }
});

//rack up the points on image clicks
$('img').click(function(event) {
  var target = $(event.target);
  if (target.is('#kittyImg1')) {
    clicker1.addClickCount();
    $('.totalClicks1').text(clicker1.clicks);
  }
  else {
    clicker2.addClickCount();
    $('.totalClicks2').text(clicker2.clicks);
  }
});
