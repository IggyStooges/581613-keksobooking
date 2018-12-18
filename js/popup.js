'use strict';
(function () {

  var createPopup = function (currentPin, currentIndex) {
    var pins = window.data.map.querySelectorAll('.map__pin');
    var popup = window.data.map.querySelector('.map__card');

    var createPopupHandler = function () {
      pins.forEach(function (element) {
        element.classList.remove('map__pin--active');
      });

      currentPin.classList.add('map__pin--active');

      openPopup(currentIndex, popup);
      closePopup(window.card.cardElement);

    };
    currentPin.removeEventListener('click', createPopupHandler);

    currentPin.addEventListener('click', createPopupHandler);

  };

  var openPopup = function (currentIndex, popUpBlock) {
    if (popUpBlock) {
      window.data.map.removeChild(popUpBlock);
    }

    window.card.createCard(currentIndex);
    hidePopupBlock();
  };

  var closePopup = function (popUpBlock) {
    var closeButton = document.querySelector('.popup__close');

    var closePopupHandler = function () {
      popUpBlock.classList.add('hidden');
      closeButton.removeEventListener('click', closePopupHandler);
      window.removeEventListener('keydown', closePopupEscHandler);
    };

    var closePopupEscHandler = function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closePopupHandler();
        closeButton.removeEventListener('click', closePopupEscHandler);
      }
    };


    if (popUpBlock) {
      popUpBlock.classList.remove('hidden');
      closeButton.addEventListener('click', closePopupHandler);
      window.addEventListener('keydown', closePopupEscHandler);
    }

  };

  var hideEmptyBlock = function (block) {
    block.classList.add('remove');

    if (block.innerHTML === '') {
      block.classList.add('hidden');
    }
  };

  var hidePopupBlock = function () {
    var popupInnerBlocks = [window.card.title, window.card.address, window.card.price, window.card.capacity, window.card.time, window.card.featuresList, window.card.description, window.card.photos];
    for (var i = 0; i < popupInnerBlocks.length; i++) {
      hideEmptyBlock(popupInnerBlocks[i]);
    }
  };

  window.popup = {
    create: createPopup
  };


})();
