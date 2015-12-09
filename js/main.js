var Cat = function(name, catImage) {
  this.name = name;
  this.catImage = catImage;
};

Cat.prototype.getCatName = function() {
  return this.name;
};

Cat.prototype.getCatImage = function() {
  return this.catImage;
};
Cat.prototype.setCatName = function(catName) {
  this.name = catName;
};

Cat.prototype.setCatURL = function(catURL) {
  this.catImage = catURL;
};

var ClickCounter = function(clicks) {
  this.clicks = clicks;
};

ClickCounter.prototype.setClickCount = function(clickCount) {
  this.clicks = clickCount;
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
  catImages: ["./img/kitten0.jpg", "./img/kitten1.jpg", "./img/kitten2.jpg", "./img/kitten3.jpg", "./img/kitten4.jpg"],
  init: function() {
    for (var i = 0; i < this.numCats; i++) {
      this.cats[i] = new Cat(this.catNames[i], this.catImages[i]);
      this.clickers[i] = new ClickCounter(this.initialClicks);
    }
  }
};

var controller = {
  init: function() {
    model.init();
    view.init();
    for (var i = 0; i < model.cats.length; i++) {
      view.addCatList(i);
    }
    view.renderAdminButton();
    this.addCatToView();
    this.addClick();
    this.addFormtoView();
    this.formCancel();
    this.setCatNameAndURL();
  },
  getCatName: function(i) {
    return model.cats[i].getCatName();
  },
  getCatURL: function(i) {
    return model.cats[i].getCatImage();
  },
  getClickCount: function(i) {
    return model.clickers[i].clicks;
  },
  addCatToView: function() {
    $('ul.dropdown-menu').click(function(event) {
      var target = $(event.target);
      target = $(target.context).attr('id').trim().slice(-1);
      view.renderCat(parseInt(target));
      view.renderAdminForm(parseInt(target));
      $('form').hide();
      $('.adminBtn > label').removeClass('active');
    });
  },
  addClick: function() {
    $(document).on('click', 'img', function(event) {
      var strIndex = $(event.target).attr('id').trim().slice(-1);
      model.clickers[parseInt(strIndex)].addClickCount();
      view.renderClick(parseInt(strIndex));
    });
  },
  addFormtoView: function() {
    $(document).on('click', '.adminBtn', function(event) {
      // var currentClass = $('.adminBtn > label').attr('class');
      if ($('.adminBtn > label').hasClass('active')) {
        $('form').show();
      }
      else {
        $('form').hide();
      }
    });
  },
  formCancel: function() {
    $(document).on('click', '.adminFormCancel', function(event) {
      $('.adminBtn > label').removeClass('active');
      $('form').hide();
    });
  },
  setCatNameAndURL: function() {
    $(document).on('click', '.adminFormSubmit', function(event) {
      if ($('#inputCatName').val()) {
        var strIndex = $('img').attr('id').trim().slice(-1);
        model.cats[parseInt(strIndex)].setCatName($('#inputCatName').val());
        model.cats[parseInt(strIndex)].setCatURL($('#inputCatURL').val());
        view.updateCatList(parseInt(strIndex));
        view.updateCatImage(parseInt(strIndex));
        view.updateCatName(parseInt(strIndex));
      }
      else {
        console.log("NULL");
      }
    });
  },
  setClickCount: function(clickCount) {

  }
};

var view = {
  init: function() {
    $('<div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button"  data-toggle="dropdown" id="catDropdownMenu">Select a Cat<span class="caret"></span></button><ul class="dropdown-menu" aria-labelledby="catDropdownMenu"></ul></div>').appendTo('.buttonContainer').css('display', 'inline-block');
  },
  addCatList: function(i) {
    $('<li><a id="catSelect' + i + '"href="#">' + controller.getCatName(i) + '</a></li>').appendTo('.dropdown-menu');
  },
  updateCatList: function(i) {
    $('#catSelect' + i).html(controller.getCatName(i));
  },
  renderCat: function(i) {
    var htmlString = '';
    htmlString = '<div class="col-md-6 catImgSection"><button type="button" name="score' + i +
    '" class="btn btn-primary">Number of clicks: <span class="badge"><div class="totalClicks' + i + '">' +
    controller.getClickCount(i) + '</div></span></button><img src="' + controller.getCatURL(i) +
    '" class="img-responsive img-cat" alt="Kitten" id="kittyImg' + i + '"/>' +
    '<h3 class="caption">' + controller.getCatName(i) + '</h3></div>';
    $('.kittyImages').html(htmlString);
  },
  updateCatName: function(i) {
    $('h3').text(controller.getCatName(i));
  },
  updateCatImage: function(i) {
    $('.catImgSection > img').attr('src', controller.getCatURL(i));
  },
  renderClick: function(i) {
    $('.totalClicks' + i).text(controller.getClickCount(i));
  },
  renderAdminButton: function() {
    var adminBtnStyles = {
      display: 'inline-block',
      float: 'right'
    };
    $('.buttonContainer').append('<div data-toggle="buttons" class="adminBtn"><label class="btn btn-primary btn-info"><input type="checkbox" autocomplete="off"> Admin </label></div>');
    $('.adminBtn').css(adminBtnStyles);
  },
  renderAdminForm: function(i) {
    var htmlString = '';
    htmlString = '<form class="form-horizontal col-md-6"><div class="form-group"><label for="inputCatName">Cat name</label><input type="text" class="form-control" id="inputCatName" placeholder="' + controller.getCatName(i) + '"></div><div class="form-group"><label for="inputCatURL">Cat image URL</label><input type="text" class="form-control" id="inputCatURL" placeholder="' + controller.getCatURL(i) + '"></div></div><button type="cancel" class="btn btn-default adminFormCancel">Cancel</button><button type="submit" class="btn btn-primary adminFormSubmit">Submit</button></form>';
    $('.kittyImages').append(htmlString);
    $('#inputCatName').val($('#inputCatName').attr('placeholder'));
    $('#inputCatURL').val($('#inputCatURL').attr('placeholder'));
  }
};

controller.init();
