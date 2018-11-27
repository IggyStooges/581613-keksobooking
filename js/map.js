'use strict';

var MAX_PRICE = 1000000;
var MIN_PRICE = 1000;
var MAX_ROOMS = 5;
var MIN_ROOMS = 1;
var MAX_Y_COORDINATE = 630;
var MIN_Y_COORDINATE = 130;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var CARDS_LENGTH = 8;

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ApartmentType = {
  FLAT: 'квартира',
  BUNGALO: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец'
};
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var cardElement = cardTemplate.cloneNode(true);
var blockWidth = map.offsetWidth;
var mapFiltersContainer = cardElement.querySelector('.map__filters-container');
var popupTitle = cardElement.querySelector('.popup__title');
var popupTextAddress = cardElement.querySelector('.popup__text--address');
var popupTextPrice = cardElement.querySelector('.popup__text--price');
var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
var popupTextTime = cardElement.querySelector('.popup__text--time');
var popupFeaturesList = cardElement.querySelectorAll('.popup__feature');
var popupDescription = cardElement.querySelector('.popup__description');
var popupPhotos = cardElement.querySelector('.popup__photos');
var popupPhoto = cardElement.querySelector('.popup__photo');
var popupAvatar = cardElement.querySelector('.popup__avatar');

var getRandomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateArrayAddressesImages = function (numberOfImages) {
  var arrayAddressesImages = [];
  for (var i = 1; i <= numberOfImages; i++) {
    var filename = i < 9 ? '0' + i : i;
    var pathname = 'img/avatars/user' + filename + '.png';
    arrayAddressesImages.push(pathname);
  }
  return arrayAddressesImages;
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

var renderPictures = function (arrayElement) {
  var fragment = document.createDocumentFragment();

  var offerPhoto = arrayElement.offer.photos[0];

  popupPhoto.src = offerPhoto;

  for (var i = 0; i < arrayElement.offer.photos.length - 1; i++) {
    var photo = popupPhoto.cloneNode(true);
    photo.src = arrayElement.offer.photos[i + 1];
    fragment.appendChild(photo);

    popupPhotos.appendChild(fragment);
  }
};

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

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

var arrayOfAddressesImages = generateArrayAddressesImages(CARDS_LENGTH);

var arrayOfAddressesImagesRandom = getArrayRandom(arrayOfAddressesImages.length, arrayOfAddressesImages);

var getAdverCardData = function (indexOfImage) {
  var generatedObject = {
    author: {
      avatar: arrayOfAddressesImagesRandom[indexOfImage]
    },
    offer: {
      title: titles[getRandomNumber(titles.length, 0)],
      address: getRandomNumber(blockWidth, 0) + ', ' + getRandomNumber(MAX_Y_COORDINATE, MIN_Y_COORDINATE),
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
      x: getRandomNumber(blockWidth, 0),
      y: getRandomNumber(MAX_Y_COORDINATE, MIN_Y_COORDINATE)
    }
  };
  return (generatedObject);
};

var createArrayCard = function (arrLength) {
  var cards = [];
  for (var i = 0; i < arrLength; i++) {
    cards.push(getAdverCardData(i));
  }
  return cards;
};

map.classList.remove('map--faded');

var createPinElement = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');
    pinElement.style.left = arr[i].location.x + 'px';
    pinElement.style.top = arr[i].location.y - PIN_HEIGHT + 'px';
    pinElement.style.marginLeft = '-' + PIN_WIDTH / 2 + 'px';
    pinElement.style.marginTop = PIN_HEIGHT + 'px;';
    pinImg.src = arr[i].author.avatar;
    pinImg.alt = arr[i].offer.title;

    fragment.appendChild(pinElement);
  }

  mapPins.appendChild(fragment);

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
  for (var i = 0; i < popupFeaturesList.length; i++) {
    popupFeaturesList[i].textContent = arrayElement.offer.features[i];
  }

  popupDescription.textContent = arrayElement.offer.description;

  renderPictures(arrayElement);
  popupAvatar.src = arrayElement.author.avatar;
  map.insertBefore(cardElement, mapFiltersContainer);
};

createPinElement(createArrayCard(CARDS_LENGTH));
createCard(createArrayCard(CARDS_LENGTH)[0]);
