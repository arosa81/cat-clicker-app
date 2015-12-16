var initialCats = [
  {
    clickCount: 0,
    name: 'Alex',
    imgSrc: '../img/kitten0.jpg',
    imgAttribution: 'someone',
    nickNames: ['Alconee', 'Monkey']
  },
  {
    clickCount: 0,
    name: 'Aiden',
    imgSrc: '../img/kitten1.jpg',
    imgAttribution: 'someone',
    nickNames: ['Dalconee', 'Unguu']
  },
  {
    clickCount: 0,
    name: 'Chloe',
    imgSrc: '../img/kitten2.jpg',
    imgAttribution: 'someone',
    nickNames: ['Cuta', 'Mona']
  },
  {
    clickCount: 0,
    name: 'Henry',
    imgSrc: '../img/kitten3.jpg',
    imgAttribution: 'someone',
    nickNames: ['Engii']
  },
  {
    clickCount: 0,
    name: 'Sebastian',
    imgSrc: '../img/kitten4.jpg',
    imgAttribution: 'someone',
    nickNames: ['Monkey']
  }
];

var Cat = function(catObj) {
  this.clickCount = ko.observable(catObj.clickCount);
  this.name = ko.observable(catObj.name);
  this.imgSrc = ko.observable(catObj.imgSrc);
  this.imgAttribution = ko.observable(catObj.imgAttribution);
  this.nickNames = ko.observableArray(catObj.nickNames);

  this.level = ko.computed(function() {
    if (this.clickCount() < 10) {
      return 'new born';
    } else if (this.clickCount() < 20) {
      return 'infant';
    } else {
      return 'kid';
    }
  }, this);
};

var ViewModel = function() {
  var self = this;
  this.catList = ko.observableArray([]);

  initialCats.forEach(function(catItem) {
    self.catList.push(new Cat(catItem));
  });

  this.currentCat = ko.observable(this.catList()[0]);

  this.incrementCounter = function() {
    this.clickCount(this.clickCount() + 1);
  };
  this.selectCat = function(clickedCat) {
    self.currentCat(clickedCat);
    // view.renderCat();
  };
  var view = new View();
  view.init();
};

var View = function() {
  this.init = function() {
    $('.dropdown-menu').append('<li class="catSelect" data-bind="click: $parent.selectCat, attr: {id: \'catSelect\' + $index()}"><a data-bind="text: name" href="#"></a></li>');
  };

  // this.renderCat= function() {
  //   $('.kittyImages > .col-md-6').html('<button type="button" class="btn btn-primary">Number of clicks: <span class="badge" data-bind="text: this.clickCount"></span></button><h2 data-bind="text: name"></h2><img src="" class="img-responsive img-cat" alt="Kitten" data-bind="click: $parent.incrementCounter, attr: {src: imgSrc}"/>');
  // };
};

ko.applyBindings(new ViewModel());
