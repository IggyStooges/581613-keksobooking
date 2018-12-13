'use strict';

(function () {
  window.blockWidth = window.data.map.offsetWidth;
  var mainPinMap = document.querySelector('.map__pin--main');
  var inputAddress = document.getElementById('address');

  var resetCoordsinateX = mainPinMap.style.left;
  var resetCoordsinateY = mainPinMap.style.top;

  var calculateCoordinates = function () {
    var coordinateAddressX = parseInt(mainPinMap.style.left, 10) + Math.floor(mainPinMap.offsetWidth / 2);
    var coordinateAddressY = parseInt(mainPinMap.style.top, 10) + Math.floor(mainPinMap.offsetHeight);
    var coordinateAddress = coordinateAddressX + ', ' + coordinateAddressY;
    inputAddress.value = coordinateAddress;
  };

  mainPinMap.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();
      var pinHeight = mainPinMap.offsetHeight;
      var pinWidth = mainPinMap.offsetWidth;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var newCoordY = mainPinMap.offsetTop - shift.y;
      var newCoordX = mainPinMap.offsetLeft - shift.x;
      if (newCoordY <= window.data.MAX_Y_COORDINATE - pinHeight && newCoordY >= window.data.MIN_Y_COORDINATE - pinHeight) {
        mainPinMap.style.top = newCoordY + 'px';
      }
      mainPinMap.style.top = mainPinMap.offsetTop + 'px';
      if (newCoordX <= window.blockWidth - pinWidth && newCoordX >= window.data.MIN_X_COORDS) {
        mainPinMap.style.left = newCoordX + 'px';
      }
      mainPinMap.style.left = mainPinMap.offsetLeft + 'px';

    };

    var onMouseUp = function (upEvt) {
      window.activateMap();
      upEvt.preventDefault();
      calculateCoordinates();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });


  window.resetPage = function () {
    window.isMapActivated = false;

    window.data.map.classList.add('map--faded');
    window.form.ad.classList.add('ad-form--disabled');
    document.querySelectorAll('.map__pin').forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    window.form.ad.reset();
    mainPinMap.style.left = resetCoordsinateX;
    mainPinMap.style.top = resetCoordsinateY;
    calculateCoordinates();
    window.setVisibleElement(window.fieldsets, true);
  };

})();
