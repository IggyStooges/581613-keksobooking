'use strict';

(function () {
  var mainPinMap = document.querySelector('.map__pin--main');
  var inputAddress = document.getElementById('address');

  var resetCoordinateX = mainPinMap.style.left;
  var resetCoordinateY = mainPinMap.style.top;

  var calculateCoordinates = function () {
    var afterDragCoordinateX = mainPinMap.style.left;
    var afterDragCoordinateY = mainPinMap.style.top;

    var coordinateAddressX = parseInt(afterDragCoordinateX, 10) + Math.floor(mainPinMap.offsetWidth / 2);
    var coordinateAddressY = parseInt(afterDragCoordinateY, 10) + Math.floor(mainPinMap.offsetHeight);

    var coordinateAddress = coordinateAddressX + ', ' + coordinateAddressY;

    inputAddress.value = coordinateAddress;
  };

  calculateCoordinates();

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
      if (newCoordX <= window.data.blockWidth - pinWidth && newCoordX >= window.data.MIN_X_COORDS) {
        mainPinMap.style.left = newCoordX + 'px';
      }
      mainPinMap.style.left = mainPinMap.offsetLeft + 'px';

    };

    var onMouseUp = function (upEvt) {
      window.map.activate();
      upEvt.preventDefault();

      calculateCoordinates();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var resetPage = function () {
    window.isMapActivated = false;

    window.data.map.classList.add('map--faded');
    window.form.ad.classList.add('ad-form--disabled');
    document.querySelectorAll('.map__pin').forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });

    if (window.card.popup) {
      window.popup.close();
    }
    window.images.reset();
    window.form.ad.reset();
    window.filter.form.reset();
    mainPinMap.style.left = resetCoordinateX;
    mainPinMap.style.top = resetCoordinateY;
    calculateCoordinates();
    window.map.setVisibleElement(window.map.fieldsets, true);
  };

  window.dragandrop = {
    reset: resetPage
  };

})();
