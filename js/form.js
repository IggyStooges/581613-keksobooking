'use strict';

(function () {
  var reset = document.querySelector('.ad-form__reset');
  var adForm = document.querySelector('.ad-form');
  var typeSelect = document.querySelector('#type');

  var changePriceByType = function () {
    var selectedOptionIndex = typeSelect.options.selectedIndex;
    var typeOption = typeSelect.querySelectorAll('option');
    var priceInput = document.querySelector('#price');

    var minPrice = {
      BUNGALO: '0',
      FLAT: '1000',
      HOUSE: '5000',
      PALACE: '10000'
    };

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

  typeSelect.addEventListener('mouseup', changePriceByType);

  var resetpagebyreset = function () {
    reset.addEventListener('click', function (evt) {
      changePriceByType();
      evt.preventDefault();
      window.dragndrop.reset();
      reset.removeEventListener('click', resetpagebyreset);
      changePriceByType();
    });
  };

  resetpagebyreset();

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


  var sendSuccess = function () {
    var element = document.querySelector('.success');

    var adFormSuccesTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

    var adFormSuccesWindow = adFormSuccesTemplate.cloneNode(true);
    if (element) {
      adForm.removeChild(element);
    }
    adForm.appendChild(adFormSuccesWindow);

    var main = document.querySelector('main');
    var success = main.querySelector('.success');

    var closeSuccesMessage = function () {
      success.remove();
    };

    var onSuccesMessageEscPress = function (escEvt) {
      if (escEvt.keyCode === window.data.ESC_KEYCODE) {
        closeSuccesMessage();
      }
      window.removeEventListener('keydown', onSuccesMessageEscPress);
    };

    window.addEventListener('keydown', onSuccesMessageEscPress);

    success.addEventListener('click', function () {
      closeSuccesMessage();
      success.removeEventListener('click', closeSuccesMessage);
      window.removeEventListener('keydown', onSuccesMessageEscPress);
    });

  };

  var createSuccessMessage = function () {

    adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      adForm.removeEventListener('submit', createSuccessMessage);
      window.backend.sendData(new FormData(window.form.ad), sendSuccess, window.data.errorHandler);
      window.dragndrop.reset();

    });

  };

  var sendingForm = function () {
    changePriceByType();
    changeTime(timeIn, timeOut);
    changeTime(timeOut, timeIn);
    compareRooms(roomNumber);
    compareRooms(capacity);
    createSuccessMessage();

  };

  sendingForm();

  window.form = {
    reset: reset,
    ad: adForm
  };
})();
