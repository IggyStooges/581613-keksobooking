'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPins = document.querySelector('.map__pins');

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.createPinElement = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      var pinElement = mapPinTemplate.cloneNode(true);
      var pinImg = pinElement.querySelector('img');
      pinElement.style.left = arr[i].location.x + 'px';
      pinElement.style.top = arr[i].location.y - PIN_HEIGHT + 'px';
      pinElement.style.marginLeft = '-' + PIN_WIDTH / 2 + 'px';
      pinElement.style.marginTop = PIN_HEIGHT + 'px';
      pinImg.src = arr[i].author.avatar;
      pinImg.alt = arr[i].offer.title;
      fragment.appendChild(pinElement);
    }

    mapPins.appendChild(fragment);

  };


  var offers = [];
  var createPins = function (data) {
    offers = data;
    window.createPinElement(offers);
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < offers.length; i++) {
      window.popup.createPopup(pins[i], offers[i]);
    }
    return pins;
  };

  window.pin = {
    pins: function () {
      window.backend.getData(createPins);
    }
  };
})();
