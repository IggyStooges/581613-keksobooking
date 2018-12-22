'use strict';
(function () {

  var openPopup = function (currentIndex) {
    window.card.renderPopup(currentIndex);
    hidePopupBlock();
  };

  var closeButton = window.card.popup.querySelector('.popup__close');

  var createPopup = function (currentPin, currentIndex) {
    var pins = window.data.map.querySelectorAll('.map__pin');

    var createPopupHandler = function () {
      pins.forEach(function (element) {
        element.classList.remove('map__pin--active');
      });

      currentPin.classList.add('map__pin--active');
      window.card.popup.classList.remove('hidden');

      openPopup(currentIndex, window.card.popup);
      document.addEventListener('keydown', closePopupEscHandler);

    };

    closeButton.addEventListener('click', closePopup);
    currentPin.removeEventListener('click', createPopupHandler);
    currentPin.addEventListener('click', createPopupHandler);

  };

  var closePopup = function () {
    window.card.popup.classList.add('hidden');
    document.removeEventListener('keydown', closePopupEscHandler);
  };

  var closePopupEscHandler = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closePopup();
      closeButton.removeEventListener('click', closePopupEscHandler);
    }
  };

  var hideEmptyBlock = function (block) {
    block.classList.add('remove');

    if (block.innerHTML === '') {
      block.classList.add('hidden');
    }
  };

  var hidePopupBlock = function () {
    var popupInnerBlocks = [
      window.card.title,
      window.card.address,
      window.card.price,
      window.card.capacity,
      window.card.time,
      window.card.featuresList,
      window.card.description,
      window.card.photos
    ];
    popupInnerBlocks.forEach(function (element) {
      hideEmptyBlock(element);
    });
  };

  window.popup = {
    create: createPopup,
    close: closePopup
  };


})();
