'use strict';
(function () {
  var NUMBER_DISPLAYED_PINS = 5;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPins = document.querySelector('.map__pins');

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var createPinElement = function (arr) {
    var fragment = document.createDocumentFragment();

    arr.forEach(function (element, i) {
      var pinElement = mapPinTemplate.cloneNode(true);
      var pinImg = pinElement.querySelector('img');
      pinElement.style.left = element.location.x + 'px';
      pinElement.style.top = element.location.y - PIN_HEIGHT + 'px';
      pinElement.style.marginLeft = (-PIN_WIDTH / 2) + 'px';
      pinElement.style.marginTop = (-PIN_HEIGHT) + 'px';
      pinImg.src = element.author.avatar;
      pinImg.alt = element.offer.title;
      if ('offer' in element && i < NUMBER_DISPLAYED_PINS) {
        fragment.appendChild(pinElement);
      }
    });
    mapPins.appendChild(fragment);

  };


  var createPins = function (data) {
    createPinElement(data);
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      window.popup.create(pins[i], data[i]);
    }
  };

  window.pin = {
    activate: function () {
      window.backend.getData(window.filter.successHandler, window.data.errorHandler);
    },

    create: createPins
  };
})();
