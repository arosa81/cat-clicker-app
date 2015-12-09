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

var model = {
  initialClicks: 0,
  numCats: 5,
  cats: [],
  clickers: [],
  catNames: ["Alex", "Aiden", "Chloe", "Henry", "Sebastian"],
  catImages: ["./img/kitten1.jpg", "./img/kitten2.jpg", "./img/kitten3.jpg", "./img/kitten1.jpg", "./img/kitten2.jpg"],
  init: function() {
    for (var i = 0; i < this.numCats; i++) {
      this.cats[i] = new Cat(this.catNames[i], this.catImages[i]);
      this.clickers[i] = new ClickCounter(this.initialClicks);
    }
  }
};

var viewModel = {
  init: function() {
    model.init();
    var totalCats = this.getCats().length;
    for (var i = 0; i < totalCats; i++) {
      view.init(i);
    }
    // this.addCat();
    // this.addClick();
  },
  getCats: function() {
    return model.cats;
  }
};

var view = {
  init: function(i) {
    $('.dropdown-menu').append('<li><a id="catSelect' + i + '"href="#">' + viewModel.getCats()[i].name + '</a></li>');
  },
  renderCat: function(i) {
    $('.kittyImages > .col-md-6').html('<button type="button" name="score' + i +
    '" class="btn btn-primary">Number of clicks: <span class="badge"><div class="totalClicks' + i + '">' +
    controller.getClickCount(i) + '</div></span></button><img src="./img/kitten' + i +
    '.jpg" class="img-responsive img-cat" alt="Kitten" id="kittyImg' + i + '"/>' +
    '<h3 class="caption">' + controller.getCatName(i) + '</h3>');
  },
  renderClick: function(i) {
    $('.totalClicks' + i).text(controller.getClickCount(i));
  }
};

controller.init();
