'use strict';
(function () {

  var isMapActivated = false;
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

    if (!isMapActivated) {
      isMapActivated = true;
      window.data.map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      setVisibleElement(fieldsets, false);
      window.createPinElement(window.card.createArrayCard(window.data.CARDS_LENGTH));
      window.createPopupOnPinCLick(window.card.createArrayCard(window.data.CARDS_LENGTH));
    }
  };

})();
