'use strict';

var arrObjects = [];
var ARR_OBJECTS_LENGTH = 8;
var arrTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var arrType = ['palace', 'flat', 'house', 'bungalo'];
var arrCheckin = ['12:00', '13:00', '14:00'];
var arrCheckout = ['12:00', '13:00', '14:00'];
var arrFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var arrRandomFeatures = [];
var arrRandomPhotos = [];
var arrPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAX_PRICE = 1000000;
var MIN_PRICE = 1000;
var MAX_ROOMS = 5;
var MIN_ROOMS = 1;
var MAX_Y_COORDINATE = 630;
var MIN_Y_COORDINATE = 130;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var cardElement = cardTemplate.cloneNode(true);
var blockWidth = map.offsetWidth;
var fragment = document.createDocumentFragment();
var mapFiltersContainer = cardElement.querySelector('.map__filters-container');

var getRandomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getArrayRandom = function (arrLength, arrRandom, arr) {
  for (var i = 0; i < arr.Length; i++) {
    arrRandom[i] = arr[getRandomNumber(arr.Length, 0)];
  }
  return arrRandom;
};

var getObject = function (imgNumber) {
  var generatedObject = {
    author: {
      avatar: 'img/avatars/user' + imgNumber + '.png',
    },
    offer: {
      title: arrTitle[getRandomNumber(arrTitle.length, 0)],
      address: getRandomNumber(blockWidth, 0) + ', ' + getRandomNumber(MAX_Y_COORDINATE, MIN_Y_COORDINATE),
      price: getRandomNumber(MAX_PRICE, MIN_PRICE),
      type: arrType[getRandomNumber(arrType.length, 0)],
      rooms: getRandomNumber(MAX_ROOMS, MIN_ROOMS),
      guests: getRandomNumber(MAX_ROOMS * 2, MIN_ROOMS * 2),
      checkin: arrCheckin[getRandomNumber(arrCheckin.length, 0)],
      checkout: arrCheckout[getRandomNumber(arrCheckout.length, 0)],
      features: getArrayRandom(getRandomNumber(arrFeatures.length, 1), arrRandomFeatures, arrFeatures),
      description: '',
      photos: getArrayRandom(arrPhotos.length, arrRandomPhotos, arrPhotos)
    },
    location: {
      x: getRandomNumber(blockWidth, 0),
      y: getRandomNumber(MAX_Y_COORDINATE, MIN_Y_COORDINATE)
    }
  };
  return (generatedObject);
};

var getArrayObject = function (arr, arrLength) {
  for (var i = 0; i < arrLength; i++) {
    var imgNumber = '0' + (i + 1);
    if (imgNumber > 9) {
      imgNumber = (i + 1);
    }
    arr[i] = getObject(imgNumber);
    console.log(arr[i].offer.features);
    console.log(arr[i].offer.photos);
  }
  return arr;
};

map.classList.remove('map--faded');

var createPinElement = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');
    pinElement.setAttribute('style', 'left:' + (arr[i].location.x - PIN_WIDTH / 2) + 'px; top:' + (arr[i].location.y - PIN_HEIGHT) + 'px');
    pinImg.setAttribute('src', arr[i].author.avatar);
    pinImg.setAttribute('alt', arr[i].offer.title);

    fragment.appendChild(pinElement);
  }

  mapPins.appendChild(fragment);

};

var createCard = function (arr) {
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


  popupTitle.textContent = arr[0].offer.title;
  popupTextAddress.textContent = arr[0].offer.address;
  popupTextPrice.textContent = arr[0].offer.price + '₽/ночь';

  if (arr[0].offer.type === 'flat') {
    popupType.textContent = 'Квартира';
  }
  if (arr[0].offer.type === 'bungalo') {
    popupType.textContent = 'Бунгало';
  }
  if (arr[0].offer.type === 'house') {
    popupType.textContent = 'Дом';
  }
  if (arr[0].offer.type === 'palace') {
    popupType.textContent = 'Дворец';
  }

  popupTextCapacity.textContent = arr[0].offer.rooms + ' комнаты для ' + arr[0].offer.guests + ' гостей';
  popupTextTime.textContent = 'Заезд после ' + arr[0].offer.checkin + ', выезд до ' + arr[0].offer.checkout;
  for (var i = 0; i < popupFeaturesList.length; i++) {
    popupFeaturesList[i].textContent = arr[0].offer.features[i];
  }

  popupDescription.textContent = arr[0].offer.description;

  popupPhoto.setAttribute('src', arr[0].offer.photos[0]);

  for (i = 0; i < arr[0].offer.photos.length - 1; i++) {
    var photo = popupPhoto.cloneNode(true);
    photo.setAttribute('src', arr[0].offer.photos[i + 1]);
    fragment.appendChild(photo);

    popupPhotos.appendChild(fragment);
  }

  popupAvatar.setAttribute('src', arr[0].author.avatar);
  map.insertBefore(cardElement, mapFiltersContainer);
};

getArrayObject(arrObjects, ARR_OBJECTS_LENGTH);
createPinElement(arrObjects);
createCard(arrObjects);
console.log(arrObjects);
