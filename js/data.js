'use strict';
(function () {

  window.data = {
    CARDS_LENGTH: 8,
    ESC_KEYCODE: 27,
    MAX_Y_COORDINATE: 630,
    MIN_Y_COORDINATE: 130,
    MIN_X_COORDS: 0,
    map: document.querySelector('.map'),

    errorHandler: function (errorMessage) {
      var main = document.querySelector('main');
      var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
      var errorElement = errorTemplate.cloneNode(true);
      var errorButton = errorElement.querySelector('.error__button');

      errorElement.style.textContent = errorMessage;
      main.insertAdjacentElement('afterbegin', errorElement);

      errorButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        main.removeChild(errorElement);
      });

      window.addEventListener('keydown', function (escEvt) {
        if (escEvt.keyCode === window.data.ESC_KEYCODE) {
          main.removeChild(errorElement);
        }
      });

      window.addEventListener('click', function () {
        main.removeChild(errorElement);
      });
    }
  };

})();
