'use strict';

(function () {
  window.form = {
    reset: document.querySelector('.ad-form__reset'),
    adForm: document.querySelector('.ad-form')
  };

  var changePriceByType = function () {
    var minPrice = {
      BUNGALO: '0',
      FLAT: '1000',
      HOUSE: '5000',
      PALACE: '10000'
    };

    var typeSelect = document.querySelector('#type');
    var typeOption = typeSelect.querySelectorAll('option');
    var priceInput = document.querySelector('#price');
    var selectedOptionIndex = typeSelect.options.selectedIndex;
    typeOption[selectedOptionIndex].value = '';


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
    typeSelect.addEventListener('change', function () {
      changePriceByType();
    });


    window.form.reset.addEventListener('click', function () {
      typeSelect.value = '';
      changePriceByType();
    });
  };


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

  var createSuccessMessage = function () {

    var adFormSuccesTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

    window.form.adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var adFormSuccesWindow = adFormSuccesTemplate.cloneNode(true);
      var element = document.querySelector('.success');
      if (element) {
        window.adForm.removeChild(element);
      }
      window.adForm.appendChild(adFormSuccesWindow);
      window.adFormSuccesWindow.addEventListener('click', function () {
        window.adForm.removeChild(adFormSuccesWindow);
      });
      window.addEventListener('keydown', function (escEvt) {
        if (escEvt.keyCode === window.ESC_KEYCODE) {
          window.adForm.removeChild(adFormSuccesWindow);
        }
      });

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
})();
