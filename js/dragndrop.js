'use strict';

(function () {
  window.blockWidth = window.data.map.offsetWidth;
  var coordinateAddress = coordinateAddressX + ', ' + coordinateAddressY;
  var mainPinMap = document.querySelector('.map__pin--main');
  var inputAddress = document.getElementById('address');

  var coordinateAddressX = parseInt(mainPinMap.style.left, 10) + mainPinMap.offsetWidth / 2;
  var coordinateAddressY = parseInt(mainPinMap.style.top, 10) + mainPinMap.offsetHeight / 2;
  inputAddress.value = coordinateAddress;
  var resetCoordsX = mainPinMap.style.left;
  var resetCoordsY = mainPinMap.style.top;


  mainPinMap.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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
      if (newCoordY <= window.data.MAX_Y_COORDINATE - pinHeight && newCoordY >= window.data.MIN_Y_COORDINATE) {
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
      coordinateAddressX = parseInt(mainPinMap.style.left, 10) + Math.floor(mainPinMap.offsetWidth / 2);
      coordinateAddressY = parseInt(mainPinMap.style.top, 10) + Math.floor(mainPinMap.offsetHeight);
      coordinateAddress = coordinateAddressX + ', ' + coordinateAddressY;
      inputAddress.value = coordinateAddress;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.form.reset.addEventListener('click', function () {
        mainPinMap.style.top = resetCoordsY;
        mainPinMap.style.left = resetCoordsX;
      });

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
