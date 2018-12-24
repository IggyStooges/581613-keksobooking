'use strict';
(function () {
  var ApartmentType = {
    FLAT: 'квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);

  var mapFiltersContainer = cardElement.querySelector('.map__filters-container');

  var popupTitle = cardElement.querySelector('.popup__title');
  var popupTextAddress = cardElement.querySelector('.popup__text--address');
  var popupTextPrice = cardElement.querySelector('.popup__text--price');
  var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
  var popupTextTime = cardElement.querySelector('.popup__text--time');
  var popupFeaturesList = cardElement.querySelector('.popup__features');
  var popupFeature = popupFeaturesList.querySelector('.popup__feature:first-of-type');
  var popupDescription = cardElement.querySelector('.popup__description');
  var popupPhotos = cardElement.querySelector('.popup__photos');
  var popupPhoto = cardElement.querySelector('.popup__photo');
  var popupAvatar = cardElement.querySelector('.popup__avatar');

  var renderPictures = function (arrayElement) {
    var offerPhoto = arrayElement.offer.photos[0];

    popupPhoto.src = offerPhoto;
    popupPhotos.innerHTML = '';

    for (var i = 0; i < arrayElement.offer.photos.length; i++) {

      var newElement = popupPhoto.cloneNode(true);
      newElement.src = arrayElement.offer.photos[i];
      popupPhotos.appendChild(newElement);
    }
  };

  var renderFeatures = function (arrayElement) {
    popupFeaturesList.innerHTML = '';
    var offerFeatures = arrayElement.offer.features;
    for (var i = 0; i < offerFeatures.length; i++) {
      var newElement = popupFeature.cloneNode(true);
      newElement.className = 'popup__feature popup__feature' + '--' + offerFeatures[i];
      popupFeaturesList.appendChild(newElement);
    }

  };


  var generateDeclensionRooms = function (arrayElement) {
    var roomsFor = ' комнаты для ';

    if (arrayElement.offer.rooms % 10 === 1) {
      roomsFor = ' комната для ';
    }
    if (arrayElement.offer.rooms % 10 === 5) {
      roomsFor = ' комнат для ';
    }
    return roomsFor;
  };

  var generateDeclensionGuests = function (arrayElement) {
    var forGuests = ' гостей';

    if (arrayElement.offer.guests % 10 === 1) {
      forGuests = ' гостя';
    }
    return forGuests;
  };

  var generateHouseType = function (arrayElement) {
    var offerType = arrayElement.offer.type;
    var popupType = cardElement.querySelector('.popup__type');

    if (offerType === 'flat') {
      popupType.textContent = ApartmentType.FLAT;
    }
    if (offerType === 'bungalo') {
      popupType.textContent = ApartmentType.BUNGALO;
    }
    if (offerType === 'house') {
      popupType.textContent = ApartmentType.HOUSE;
    }
    if (offerType === 'palace') {
      popupType.textContent = ApartmentType.PALACE;
    }

  };

  var createCard = function (arrayElement) {
    var checkin = arrayElement.offer.checkin;
    var checkout = arrayElement.offer.checkout;
    var rooms = arrayElement.offer.rooms;
    var guests = arrayElement.offer.guests;

    popupTitle.textContent = arrayElement.offer.title;
    popupTextAddress.textContent = arrayElement.offer.address;
    popupTextPrice.textContent = arrayElement.offer.price + '₽/ночь';

    generateHouseType(arrayElement);
    popupTextCapacity.textContent = rooms + generateDeclensionRooms(arrayElement) + guests + generateDeclensionGuests(arrayElement);

    popupTextTime.textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
    renderFeatures(arrayElement);
    popupDescription.textContent = arrayElement.offer.description;

    renderPictures(arrayElement);
    popupAvatar.src = arrayElement.author.avatar;
    window.data.map.insertBefore(cardElement, mapFiltersContainer);

  };


  window.card = {
    renderPopup: createCard,
    popup: cardElement,
    title: popupTitle,
    address: popupTextAddress,
    price: popupTextPrice,
    capacity: popupTextCapacity,
    time: popupTextTime,
    featuresList: popupFeaturesList,
    description: popupDescription,
    photos: popupPhotos
  };

})();
