'use strict';
(function () {

  var isMapActivated = false;
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

    if (!window.isMapActivated) {
      isMapActivated = true;
      window.data.map.classList.remove('map--faded');
      window.form.ad.classList.remove('ad-form--disabled');
      setVisibleElement(fieldsets, false);
      setVisibleElement(window.filter.selects, false);
      window.pin.activate();

    }
  };

  window.map = {
    isAtivated: isMapActivated,
    activate: activateMap,
    setVisibleElement: setVisibleElement,
    fieldsets: fieldsets
  };
})();
