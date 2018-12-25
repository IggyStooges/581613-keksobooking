'use strict';

(function () {
  var minPrice = {
    BUNGALO: '0',
    FLAT: '1000',
    HOUSE: '5000',
    PALACE: '10000'
  };

  var resetButton = document.querySelector('.ad-form__reset');
  var adForm = document.querySelector('.ad-form');
  var typeSelect = document.querySelector('#type');

  var typeSelectChangeHandler = function () {
    var selectedOptionIndex = typeSelect.options.selectedIndex;
    var typeOption = typeSelect.querySelectorAll('option');
    var priceInput = document.querySelector('#price');

    if (typeOption[selectedOptionIndex].text === 'Бунгало') {
      priceInput.min = minPrice.BUNGALO;
      priceInput.placeholder = minPrice.BUNGALO;
    }

    if (typeOption[selectedOptionIndex].text === 'Квартира') {
      priceInput.min = minPrice.FLAT;
      priceInput.placeholder = minPrice.FLAT;
    }

    if (typeOption[selectedOptionIndex].text === 'Дом') {
      priceInput.min = minPrice.HOUSE;
      priceInput.placeholder = minPrice.HOUSE;
    }

    if (typeOption[selectedOptionIndex].text === 'Дворец') {
      priceInput.min = minPrice.PALACE;
      priceInput.placeholder = minPrice.PALACE;
    }
  };

  typeSelect.addEventListener('mouseup', typeSelectChangeHandler);

  var resetButtonClickHandler = function (evt) {
    typeSelectChangeHandler();
    evt.preventDefault();
    window.dragandrop.reset();
    typeSelectChangeHandler();
  };
  resetButton.removeEventListener('click', resetButtonClickHandler);

  resetButton.addEventListener('click', resetButtonClickHandler);


  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var changeTime = function (firstSelect, secondSelect) {
    firstSelect.addEventListener('change', function () {
      secondSelect.selectedIndex = firstSelect.selectedIndex;
    });
  };

  var compareRooms = function (select) {
    select.setCustomValidity('Выберите');
    select.addEventListener('change', function () {
      roomNumber.setCustomValidity('');
      capacity.setCustomValidity('');

      var capacityInt = parseInt(capacity.value, 10);
      var roomInt = parseInt(roomNumber.value, 10);

      if (capacityInt > roomInt && capacityInt > 0) {
        select.setCustomValidity('Выберите соответсвующие значение (количество гостей не может превышать количество комнат)');
      } else if (roomInt === 100 && capacityInt > 0) {
        select.setCustomValidity('100 комнат не для гостей');
      } else if (roomInt !== 100 && capacityInt === 0) {
        select.setCustomValidity('Выберите количество гостей');
      }
    });
  };

  var main = document.querySelector('main');

  var sendSuccess = function () {
    var element = document.querySelector('.success');

    var adFormSuccesTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

    var adFormSuccesWindow = adFormSuccesTemplate.cloneNode(true);
    if (element) {
      adForm.removeChild(element);
    }
    main.appendChild(adFormSuccesWindow);
    var success = main.querySelector('.success');

    var closeSuccessMessage = function () {
      success.remove();
    };

    var successMessageEscPressHandler = function (escEvt) {
      if (escEvt.keyCode === window.data.ESC_KEYCODE) {
        closeSuccessMessage();
      }
      window.removeEventListener('keydown', successMessageEscPressHandler);
    };

    window.addEventListener('keydown', successMessageEscPressHandler);

    success.addEventListener('click', function () {
      closeSuccessMessage();
      success.removeEventListener('click', closeSuccessMessage);
      window.removeEventListener('keydown', successMessageEscPressHandler);
    });

  };

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');

    errorElement.style.zIndex = '1500';
    errorElement.style.textContent = errorMessage;
    main.insertAdjacentElement('afterbegin', errorElement);

    var closeErrorMessage = function () {
      errorElement.remove();
    };

    var errorMessageEscPressHandler = function (escEvt) {
      if (escEvt.keyCode === window.data.ESC_KEYCODE) {
        closeErrorMessage();
      }
      window.removeEventListener('keydown', errorMessageEscPressHandler);
    };

    window.addEventListener('keydown', errorMessageEscPressHandler);

    errorButton.addEventListener('click', function () {
      closeErrorMessage();
      errorButton.removeEventListener('click', closeErrorMessage);
      window.removeEventListener('keydown', errorMessageEscPressHandler);
    });


  };

  var adFormSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.sendData(sendSuccess, errorHandler, new FormData(adForm));
    window.dragandrop.reset();
  };

  adForm.removeEventListener('submit', adFormSubmitHandler);

  adForm.addEventListener('submit', adFormSubmitHandler);

  var sendingForm = function () {
    typeSelectChangeHandler();
    changeTime(timeIn, timeOut);
    changeTime(timeOut, timeIn);
    compareRooms(roomNumber);
    compareRooms(capacity);

  };

  sendingForm();

  window.form = {
    reset: resetButton,
    ad: adForm,
    errorHandler: errorHandler
  };
})();
