'use strict';
(function () {
  var map = document.querySelector('.map');

  window.data = {
    CARDS_LENGTH: 8,
    ESC_KEYCODE: 27,
    MAX_Y_COORDINATE: 630,
    MIN_Y_COORDINATE: 130,
    MIN_X_COORDS: 0,
    map: map,
    blockWidth: map.offsetWidth,


    errorHandler: function (errorMessage) {
      var main = document.querySelector('main');
      var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
      var errorElement = errorTemplate.cloneNode(true);
      var errorButton = errorElement.querySelector('.error__button');

      errorElement.style.textContent = errorMessage;
      main.insertAdjacentElement('afterbegin', errorElement);

      var closeErrorMessage = function () {
        errorElement.remove();
      };

      var onErrorMessageEscPress = function (escEvt) {
        if (escEvt.keyCode === window.data.ESC_KEYCODE) {
          closeErrorMessage();
        }
        window.removeEventListener('keydown', onErrorMessageEscPress);
      };

      window.addEventListener('keydown', onErrorMessageEscPress);

      errorElement.addEventListener('click', function () {
        closeErrorMessage();
        errorElement.removeEventListener('click', closeErrorMessage);
        window.removeEventListener('keydown', onErrorMessageEscPress);
      });

      errorButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        main.removeChild(errorElement);
      });

      window.addEventListener('keydown', function (escEvt) {
        if (escEvt.keyCode === window.data.ESC_KEYCODE) {
          main.removeChild(errorElement);
        }
      });

      errorElement.addEventListener('click', function () {
        main.removeChild(errorElement);
      });
    }
  };

})();
