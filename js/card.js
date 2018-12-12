'use strict';
(function () {
  var MAX_PRICE = 1000000;
  var MIN_PRICE = 1000;
  var MAX_ROOMS = 5;
  var MIN_ROOMS = 1;
  var ApartmentType = {
    FLAT: 'квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  window.cardElement = cardTemplate.cloneNode(true);
  var mapFiltersContainer = window.cardElement.querySelector('.map__filters-container');

  window.popup = window.cardElement.querySelector('.popup');
  window.popupTitle = window.cardElement.querySelector('.popup__title');
  window.popupTextAddress = window.cardElement.querySelector('.popup__text--address');
  window.popupTextPrice = window.cardElement.querySelector('.popup__text--price');
  window.popupTextCapacity = window.cardElement.querySelector('.popup__text--capacity');
  window.popupTextTime = window.cardElement.querySelector('.popup__text--time');
  window.popupFeaturesList = window.cardElement.querySelector('.popup__features');
  var popupFeature = window.popupFeaturesList.querySelector('.popup__feature:first-of-type');
  window.popupDescription = window.cardElement.querySelector('.popup__description');
  window.popupPhotos = window.cardElement.querySelector('.popup__photos');
  window.popupPhoto = window.cardElement.querySelector('.popup__photo');
  window.popupAvatar = window.cardElement.querySelector('.popup__avatar');

  var generateArrayAddressesImages = function (numberOfImages) {
    var arrayAddressesImages = [];
    for (var i = 1; i <= numberOfImages; i++) {
      var filename = i < 9 ? '0' + i : i;
      var pathname = 'img/avatars/user' + filename + '.png';
      arrayAddressesImages.push(pathname);
    }
    return arrayAddressesImages;
  };

  var arrayOfAddressesImages = generateArrayAddressesImages(window.data.CARDS_LENGTH);

  var getArrayRandom = function (arrLength, arr) {
    var arrRandom = [];
    for (var i = 0; i < arrLength; i++) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arrRandom = arr.slice(0, arrLength);
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arrRandom;
  };

  var arrayOfAddressesImagesRandom = getArrayRandom(arrayOfAddressesImages.length, arrayOfAddressesImages);


  var getRandomNumber = function (max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  var renderPictures = function (arrayElement) {
    var offerPhoto = arrayElement.offer.photos[0];

    window.popupPhoto.src = offerPhoto;
    window.popupPhotos.innerHTML = '';

    for (var i = 0; i < arrayElement.offer.photos.length; i++) {

      var newElement = window.popupPhoto.cloneNode(true);
      newElement.src = arrayElement.offer.photos[i];
      window.popupPhotos.appendChild(newElement);
    }
  };


  var getAdverCardData = function (indexOfImage) {
    var generatedObject = {
      author: {
        avatar: arrayOfAddressesImagesRandom[indexOfImage]
      },
      offer: {
        title: titles[getRandomNumber(titles.length, 0)],
        address: getRandomNumber(window.blockWidth, 0) + ', ' + getRandomNumber(window.data.MAX_Y_COORDINATE, window.data.MIN_Y_COORDINATE),
        price: getRandomNumber(MAX_PRICE, MIN_PRICE),
        type: types[getRandomNumber(types.length, 0)],
        rooms: getRandomNumber(MAX_ROOMS, MIN_ROOMS),
        guests: getRandomNumber(MAX_ROOMS * 2, MIN_ROOMS),
        checkin: checkins[getRandomNumber(checkins.length, 0)],
        checkout: checkouts[getRandomNumber(checkouts.length, 0)],
        features: getArrayRandom(getRandomNumber(features.length, 1), features),
        description: '',
        photos: getArrayRandom(photos.length, photos)
      },
      location: {
        x: getRandomNumber(window.blockWidth, 0),
        y: getRandomNumber(window.data.MAX_Y_COORDINATE, window.data.MIN_Y_COORDINATE)
      }
    };
    return (generatedObject);
  };


  var renderFeatures = function (arrayElement) {
    window.popupFeaturesList.innerHTML = '';
    var offerFeatures = arrayElement.offer.features;
    for (var i = 0; i < offerFeatures.length; i++) {
      var newElement = popupFeature.cloneNode(true);
      newElement.className = 'popup__feature popup__feature' + '--' + offerFeatures[i];
      window.popupFeaturesList.appendChild(newElement);
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
    var popupType = window.cardElement.querySelector('.popup__type');

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


  window.card = {
    createArrayCard: function (arrLength) {
      var cards = [];

      for (var i = 0; i < arrLength; i++) {
        cards.push(getAdverCardData(i));
      }
      return cards;
    },

    createCard: function (arrayElement) {
      var checkin = arrayElement.offer.checkin;
      var checkout = arrayElement.offer.checkout;
      var rooms = arrayElement.offer.rooms;
      var guests = arrayElement.offer.guests;

      window.popupTitle.textContent = arrayElement.offer.title;
      window.popupTextAddress.textContent = arrayElement.offer.address;
      window.popupTextPrice.textContent = arrayElement.offer.price + '₽/ночь';

      generateHouseType(arrayElement);
      window.popupTextCapacity.textContent = rooms + generateDeclensionRooms(arrayElement) + guests + generateDeclensionGuests(arrayElement);

      window.popupTextTime.textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
      renderFeatures(arrayElement);
      window.popupDescription.textContent = arrayElement.offer.description;

      renderPictures(arrayElement);
      window.popupAvatar.src = arrayElement.author.avatar;
      window.data.map.insertBefore(window.cardElement, mapFiltersContainer);

    }

  };


})();
