'use strict';
(function () {

  window.popup = {
    createPopup: function (currentPin, currentIndex) {
      var pins = window.data.map.querySelectorAll('.map__pin');

      currentPin.addEventListener('click', function () {
        pins.forEach(function (element) {
          element.classList.remove('.map__pin--active');
        });

        currentPin.classList.add('.map__pin--active');

        openPopup(currentIndex);
        closePopup();
        currentPin.removeEventListener('click', window.popup.createPopup);
      });
    }
  };

  var openPopup = function (currentIndex) {
    var popup = document.querySelector('.map__card');
    if (popup) {
      window.data.map.removeChild(popup);
    }
    window.card.createCard(currentIndex);
    hidePopupBlock();
  };

  var closePopup = function () {
    var popup = window.data.map.querySelector('.popup');
    var closeButton = document.querySelector('.popup__close');
    popup.classList.remove('hidden');
    closeButton.addEventListener('click', function () {
      popup.classList.add('hidden');
      closeButton.removeEventListener('click', closePopup);
    });
    document.addEventListener('keydown', function (evt) {
      if (window.popup) {
        if (evt.keyCode === window.data.ESC_KEYCODE) {
          popup.classList.add('hidden');
        }
      }
    });

  };

  var hideEmptyBlock = function (block) {
    block.classList.add('remove');

    if (block.innerHTML === '') {
      block.classList.add('hidden');
    }
  };

  var hidePopupBlock = function () {
    var popupInnerBlocks = [window.popupTitle, window.popupTextAddress, window.popupTextPrice, window.popupTextCapacity, window.popupTextTime, window.popupFeaturesList, window.popupDescription, window.popupPhotos];
    for (var i = 0; i < popupInnerBlocks.length; i++) {
      hideEmptyBlock(popupInnerBlocks[i]);
    }
  };

})();
