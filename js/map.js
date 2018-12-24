'use strict';
(function () {

  var mapFilters = document.querySelector('.map__filters');
  var fieldsets = document.querySelectorAll('fieldset');

  var setVisibleElement = function (collection, disabled) {
    collection.forEach(function (element) {
      element.disabled = disabled;
    });
  };

  setVisibleElement(fieldsets, true);

  mapFilters.classList.add('map__filters--disabled');

  var activateMap = function () {

    if (!window.data.isMapActivated) {
      window.data.isMapActivated = true;
      window.data.map.classList.remove('map--faded');
      window.form.ad.classList.remove('ad-form--disabled');
      setVisibleElement(fieldsets, false);
      setVisibleElement(window.filter.selects, false);
      window.pin.activate();

    }
  };

  window.map = {
    activate: activateMap,
    setVisibleElement: setVisibleElement,
    fieldsets: fieldsets
  };
})();
