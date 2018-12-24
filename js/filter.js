'use strict';
(function () {
  var PriceValue = {
    LOW: 10000,
    HIGH: 50000
  };
  var PriceGradation = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'hidh',
  };

  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select');
  var filterbyType = filterForm.querySelector('#housing-type');
  var filterbyPrice = filterForm.querySelector('#housing-price');
  var filterItems = filterForm.querySelectorAll('select, fieldset');
  var filterbyRooms = filterForm.querySelector('#housing-rooms');
  var filterbyGuests = filterForm.querySelector('#housing-guests');
  var filterbyFeatures = filterForm.querySelector('#housing-features');
  var filterFeatures = filterbyFeatures.querySelectorAll('.map__checkbox ');

  window.map.setVisibleElement(filterSelects, true);
  window.adverts = [];


  var updateAdvertsByType = function (arrayOfAdverts) {
    var selectedOptionIndex = filterbyType.options.selectedIndex;
    var filterbyTypeOptions = filterbyType.querySelectorAll('option');
    var selectedOptionValue = filterbyTypeOptions[selectedOptionIndex].value;
    if (selectedOptionValue === 'any') {
      return arrayOfAdverts;
    }
    return arrayOfAdverts.filter(function (advert) {
      return advert.offer.type === selectedOptionValue;
    });
  };


  var updateAdvertsByPrice = function (arrayOfAdverts) {
    var selectedOptionIndex = filterbyPrice.options.selectedIndex;
    var filterbyPriceOptions = filterbyPrice.querySelectorAll('option');
    var selectedOptionValue = filterbyPriceOptions[selectedOptionIndex].value;

    if (selectedOptionValue === PriceGradation.LOW) {
      return arrayOfAdverts.filter(function (ad) {
        return ad.offer.price < PriceValue.LOW;
      });
    } else if (selectedOptionValue === PriceGradation.MIDDLE) {
      return arrayOfAdverts.filter(function (ad) {
        return (ad.offer.price <= PriceValue.HIGH && ad.offer.price >= PriceValue.LOW);
      });
    } else if (selectedOptionValue === PriceGradation.HIGH) {
      return arrayOfAdverts.filter(function (ad) {
        return ad.offer.price > PriceValue.HIGH;
      });
    }
    return arrayOfAdverts;
  };


  var updateAdvertsByRooms = function (arrayOfAdverts) {
    var selectedOptionIndex = filterbyRooms.options.selectedIndex;
    var filterbyRoomsOptions = filterbyRooms.querySelectorAll('option');
    var selectedOptionValue = filterbyRoomsOptions[selectedOptionIndex].value;

    if (selectedOptionValue === 'any') {
      return arrayOfAdverts;
    }
    return arrayOfAdverts.filter(function (advert) {
      return parseInt(selectedOptionValue, 10) === advert.offer.rooms;
    });

  };

  var updateAdvertsByGuests = function (arrayOfAdverts) {
    var selectedOptionIndex = filterbyGuests.options.selectedIndex;
    var filterbyGuestsOptions = filterbyGuests.querySelectorAll('option');
    var selectedOptionValue = filterbyGuestsOptions[selectedOptionIndex].value;

    if (selectedOptionValue === 'any') {
      return arrayOfAdverts;
    }
    return arrayOfAdverts.filter(function (ad) {
      return ad.offer.guests === parseInt(selectedOptionValue, 10);
    });
  };

  var updateAdvertsByFeatures = function (arrayOfAdverts) {

    var checkedFeatures = Array.from(filterFeatures).
    filter(function (input) {
      return input.checked;
    }).map(function (input) {
      return input.value;
    });


    return arrayOfAdverts.filter(function (advert) {
      return checkedFeatures.every(function (input) {
        return advert.offer.features.indexOf(input) !== -1;
      });
    });
  };

  var filterFormElementChangeHandler = window.debounce(function () {
    var mapPins = document.querySelector('.map__pins');

    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (item) {
      item.remove();
    });
    var filteredAdvertsByType = updateAdvertsByType(window.adverts);

    var filteredAdvertsByPrice = updateAdvertsByPrice(filteredAdvertsByType);

    var filteredAdvertsByRooms = updateAdvertsByRooms(filteredAdvertsByPrice);

    var filteredAdvertsByGuests = updateAdvertsByGuests(filteredAdvertsByRooms);

    var filteredAdvertsByFeatures = updateAdvertsByFeatures(filteredAdvertsByGuests);

    var advertsFilteredByOffer = filteredAdvertsByFeatures;

    window.pin.create(advertsFilteredByOffer);

    window.popup.close();
  });

  var successHandler = function (data) {
    window.adverts = data;

    window.pin.create(data);

    filterItems.forEach(function (element) {
      element.removeEventListener('change', filterFormElementChangeHandler);

      element.addEventListener('change', filterFormElementChangeHandler);
    });

  };

  window.filter = {
    form: filterForm,
    selects: filterSelects,
    successHandler: successHandler
  };

})();
