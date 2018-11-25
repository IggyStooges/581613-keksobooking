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

var cards = [];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var cardElement = cardTemplate.cloneNode(true);
var blockWidth = map.offsetWidth;
var fragment = document.createDocumentFragment();
var mapFiltersContainer = cardElement.querySelector('.map__filters-container');
var popupTitle = cardElement.querySelector('.popup__title');
var popupTextAddress = cardElement.querySelector('.popup__text--address');
var popupTextPrice = cardElement.querySelector('.popup__text--price');
var popupType = cardElement.querySelector('.popup__type');
var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
var popupTextTime = cardElement.querySelector('.popup__text--time');
var popupFeaturesList = cardElement.querySelectorAll('.popup__feature');
var popupDescription = cardElement.querySelector('.popup__description');
var popupPhotos = cardElement.querySelector('.popup__photos');
var popupPhoto = cardElement.querySelector('.popup__photo');
var popupAvatar = cardElement.querySelector('.popup__avatar');

var generateDeclensionRooms = function (arr, currentIndex) {
  var roomsFor = ' комнаты для ';

  if (arr[currentIndex].offer.rooms % 10 === 1) {
    roomsFor = ' комната для ';
  }
  if (arr[currentIndex].offer.rooms % 10 === 5) {
    roomsFor = ' комнат для ';
  }
  return roomsFor;
};

var generateDeclensionGuests = function (arr, currentIndex) {
  var forGuests = ' гостей';

  if (arr[currentIndex].offer.guests % 10 === 1) {
    forGuests = ' гостя';
  }
  return forGuests;
};

var generateHouseType = function (arr, currentIndex) {

  if (arr[currentIndex].offer.type === 'flat') {
    popupType.textContent = 'Квартира';
  }
  if (arr[currentIndex].offer.type === 'bungalo') {
    popupType.textContent = 'Бунгало';
  }
  if (arr[currentIndex].offer.type === 'house') {
    popupType.textContent = 'Дом';
  }
  if (arr[currentIndex].offer.type === 'palace') {
    popupType.textContent = 'Дворец';
  }
};

var renderPictures = function (arr, currentIndex) {

  popupPhoto.src = arr[currentIndex].offer.photos[currentIndex];

  for (var i = 0; i < arr[currentIndex].offer.photos.length - 1; i++) {
    var photo = popupPhoto.cloneNode(true);
    photo.src = arr[currentIndex].offer.photos[i + 1];
    fragment.appendChild(photo);

    popupPhotos.appendChild(fragment);
  }
};

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var getRandomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
};

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

var getAdverCardData = function (imgNumber) {
  var generatedObject = {
    author: {
      avatar: 'img/avatars/user' + imgNumber + '.png',
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

var getArrayCard = function (arrLength) {
  for (var i = 0; i < arrLength; i++) {
    var imgNumber = '0' + (i + 1);
    if (imgNumber > 9) {
      imgNumber = (i + 1);
    }
    cards[i] = getAdverCardData(imgNumber);
  }
  return cards;
};

map.classList.remove('map--faded');

var createPinElement = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');
    pinElement.style = 'left:' + arr[i].location.x + 'px; top:' + (arr[i].location.y - PIN_HEIGHT) + 'px; margin-left: -' + PIN_WIDTH / 2 + 'px; margin-top: -' + PIN_HEIGHT + 'px;';
    pinImg.src = arr[i].author.avatar;
    pinImg.alt = arr[i].offer.title;

    fragment.appendChild(pinElement);
  }

  mapPins.appendChild(fragment);

};

var createCard = function (arr, currentIndex) {
  popupTitle.textContent = arr[currentIndex].offer.title;
  popupTextAddress.textContent = arr[currentIndex].offer.address;
  popupTextPrice.textContent = arr[currentIndex].offer.price + '₽/ночь';

  generateHouseType(arr, currentIndex);
  popupTextCapacity.textContent = arr[currentIndex].offer.rooms + generateDeclensionRooms(arr, currentIndex) + arr[currentIndex].offer.guests + generateDeclensionGuests(arr, currentIndex);

  popupTextTime.textContent = 'Заезд после ' + arr[currentIndex].offer.checkin + ', выезд до ' + arr[currentIndex].offer.checkout;
  for (var i = 0; i < popupFeaturesList.length; i++) {
    popupFeaturesList[i].textContent = arr[currentIndex].offer.features[i];
  }

  popupDescription.textContent = arr[currentIndex].offer.description;

  renderPictures(arr, currentIndex);
  popupAvatar.src = arr[currentIndex].author.avatar;
  map.insertBefore(cardElement, mapFiltersContainer);
};

getArrayCard(CARDS_LENGTH);
createPinElement(cards);
createCard(cards, 0);
