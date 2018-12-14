'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  window.filterSelects = filterForm.querySelectorAll('select');
  window.setVisibleElement(window.filterSelects, true);
  var filterbyType = filterForm.querySelector('#housing-type');
  var filterbyPrice = filterForm.querySelector('#housing-price');
  var filterItems = filterForm.querySelectorAll('select, fieldset');
  var filterbyRooms = filterForm.querySelector('#housing-rooms');
  var filterbyGuests = filterForm.querySelector('#housing-guests');
  var filterbyFeatures = filterForm.querySelector('#housing-features');
  var filterFeatures = filterbyFeatures.querySelectorAll('.map__checkbox ');

  window.ads = [];

  var updateAdsByType = function (array) {
    var selectedOptionIndex = filterbyType.options.selectedIndex;
    var filterbyTypeOptions = filterbyType.querySelectorAll('option');
    var selectedOptionValue = filterbyTypeOptions[selectedOptionIndex].value;
    if (selectedOptionValue === 'any') {
      return array;
    } else {
      return array.
      filter(function (ad) {
        return ad.offer.type === selectedOptionValue;
      });
    }
  };

  var updateAdsByPrice = function (array) {
    var selectedOptionIndex = filterbyPrice.options.selectedIndex;
    var filterbyPriceOptions = filterbyPrice.querySelectorAll('option');
    var selectedOptionValue = filterbyPriceOptions[selectedOptionIndex].value;

    if (selectedOptionValue === 'low') {
      return array.
      filter(function (ad) {
        return ad.offer.price <= 10000;
      });
    }
    if (selectedOptionValue === 'middle') {
      return array.
      filter(function (ad) {
        return (ad.offer.price <= 50000 && ad.offer.price >= 10000);
      });
    }
    if (selectedOptionValue === 'high') {
      return array.
      filter(function (ad) {
        return ad.offer.price >= 50000;
      });
    }
    return array;
  };

  var updateAdsByRooms = function (array) {
    var selectedOptionIndex = filterbyRooms.options.selectedIndex;
    var filterbyRoomsOptions = filterbyRooms.querySelectorAll('option');
    var selectedOptionValue = filterbyRoomsOptions[selectedOptionIndex].value;

    if (selectedOptionValue === 'any') {
      return array;
    } else {
      return array.
      filter(function (ad) {
        return parseInt(selectedOptionValue, 10) === ad.offer.rooms;
      });
    }
  };

  var updateAdsByGuests = function (array) {
    var selectedOptionIndex = filterbyGuests.options.selectedIndex;
    var filterbyGuestsOptions = filterbyGuests.querySelectorAll('option');
    var selectedOptionValue = filterbyGuestsOptions[selectedOptionIndex].value;

    if (selectedOptionValue === 'any') {
      return array;
    } else {
      return array.
      filter(function (ad) {
        return ad.offer.guests === parseInt(selectedOptionValue, 10);
      });
    }
  };

  var updateAdsByFeatures = function (array) {

    var checkedFeatures = Array.from(filterFeatures).filter(function (input) {
      return input.checked;
    }).map(function (input) {
      return input.value;
    });

    return array.
    filter(function (ad) {
      for (var i = 0; i < checkedFeatures.length; i++) {
        if (ad.offer.features.indexOf(checkedFeatures[i]) === -1) {
          return false;
        }
      }
      return true;
    });

  };

  var tratata = function () {
    var mapPins = document.querySelector('.map__pins');

    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (item) {
      item.remove();
    });

    var arrayFilterByOffer = updateAdsByFeatures(updateAdsByGuests(updateAdsByRooms(updateAdsByPrice(updateAdsByType(window.ads)))));
    window.createPins(arrayFilterByOffer);
  };


  var hut = window.debounce(function () {
    tratata();
  });


  window.successHandler = function (data) {
    window.ads = data;

    window.createPins(data);

    filterItems.forEach(function (element) {

      element.addEventListener('change', hut);

    });

  };

})();
