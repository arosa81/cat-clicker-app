var initialClicks = 0;
var numCats = 5;
var cats = [];
var clickers = [];
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

function initiateApp() {
  for (var i = 0; i < numCats; i++) {
    cats[i] = new Cat(catNames[i], catImages[i]);
    clickers[i] = new ClickCounter(0);
    $('.dropdown-menu').append('<li><a id="catSelect' + i + '"href="#">' + cats[i].name + '</a></li>');
  }
}

function displayCat() {
  $('ul.dropdown-menu').click(function(event) {
    var target = $(event.target);
    for (var i = 0; i < cats.length; i++) {
      if (target.context.id === ('catSelect' + i)) {
        $('.kittyImages > .col-md-6').html('<button type="button" name="score' + i +
        '" class="btn btn-primary">Number of clicks: <span class="badge"><div class="totalClicks' + i + '">' +
        clickers[i].clicks + '</div></span></button><img src="./img/kitten' + i +
        '.jpg" class="img-responsive img-cat" alt="Kitten" id="kittyImg' + i + '"/>' +
        '<h3 class="caption">' + cats[i].name + '</h3>');
      }
      // console.log("TOTAL CLICKS: " + $('.totalClicks' + i).text());
    }
  });
}

//rack up the points on image clicks
function counter() {
  $(document).on('click', 'img', function(event) {
    var target = $(event.target);
    for (var i = 0; i < clickers.length; i++) {
      if (target.context.id === ('kittyImg' + i)) {
        clickers[i].addClickCount();
        $('.totalClicks' + i).text(clickers[i].clicks);
      }
    }
  });
}

initiateApp();
displayCat();
counter();
