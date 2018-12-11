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
      errorElement.style.zIndex = '100';
      errorElement.style.marginTop = '0';
      errorElement.style.marginLeft = 'auto';
      errorElement.style.textAlign = 'center';
      errorElement.style.backgroundColor = 'blanche­dalmond';

      errorElement.style.position = 'absolute';
      errorElement.style.left = 0;
      errorElement.style.right = 0;
      errorElement.style.fontSize = '30px';

      errorElement.style.textContent = errorMessage;
      main.insertAdjacentElement('afterbegin', errorElement);
      errorButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        main.removeChild(errorElement);
      });
    }
  };

})();
