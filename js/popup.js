'use strict';
(function () {
  window.popup = {
    createPopup: function (currentPin, currentIndex) {
      currentPin.addEventListener('click', function () {
        openPopup(currentIndex);
        closePopup();
        currentPin.removeEventListener('click', window.popup.createPopup);
      });
    }
  };
  var openPopup = function (currentIndex) {
    var popup = window.data.map.querySelector('.map__card');

    if (popup) {
      window.data.map.removeChild(popup);
    }

    window.card.createCard(currentIndex);
  };

  var closePopup = function () {
    var popup = window.data.map.querySelector('.popup');
    var closeButton = popup.querySelector('.popup__close');
    popup.classList.remove('hidden');
    closeButton.addEventListener('click', function () {
      popup.classList.add('hidden');
      closeButton.removeEventListener('click', closePopup);
    });
    document.addEventListener('keydown', function (evt) {
      if (popup) {
        if (evt.keyCode === window.data.ESC_KEYCODE) {
          popup.classList.add('hidden');
        }
      }
    });

  };

})();
