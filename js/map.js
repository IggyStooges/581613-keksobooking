'use strict';
(function () {

  window.isMapActivated = false;
  var mapFilters = document.querySelector('.map__filters');
  var fieldsets = document.getElementsByTagName('fieldset');

  var setVisibleElement = function (collection, disabled) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = disabled;
    }
  };

  setVisibleElement(fieldsets, true);
  mapFilters.classList.add('map__filters--disabled');

  window.activateMap = function () {

    if (!window.isMapActivated) {
      window.isMapActivated = true;
      window.data.map.classList.remove('map--faded');
      window.form.ad.classList.remove('ad-form--disabled');
      setVisibleElement(fieldsets, false);
      window.pin.pins();
    }
  };
})();
