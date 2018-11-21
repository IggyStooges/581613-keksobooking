'use strict';

var arrObjects = [];
var arrTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var arrType = ['palace', 'flat', 'house', 'bungalo'];
var arrCheckin = ['12:00', '13:00', '14:00'];
var arrCheckout = ['12:00', '13:00', '14:00'];
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

var getArrRandomNumber = function (arr) {
  return arr[Math.floor((Math.random() * arr.length))];
};

var getArrayObject = function (arrLength) {
  for (var i = 0; i < arrLength; i++) {
    var locationX = getRandomNumber(blockWidth, 0);
    var locationY = getRandomNumber(MAX_Y_COORDINATE, MIN_Y_COORDINATE);
    arrObjects[i] = {
      author: {
        avatar: 'img/avatars/user' + 0 + (i + 1) + '.png',
      },
      offer: {
        title: arrTitle[i],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(MAX_PRICE, MIN_PRICE),
        type: arrType[getArrRandomNumber(arrType)],
        rooms: getRandomNumber(MAX_ROOMS, MIN_ROOMS),
        guests: getRandomNumber(MAX_ROOMS * 2, MIN_ROOMS * 2),
        checkin: getArrRandomNumber(arrCheckin),
        checkout: getArrRandomNumber(arrCheckout),
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        description: '',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
  return (arrObjects);
};

map.classList.remove('map--faded');

var createPinElement = function () {
  for (var j = 0; j < arrObjects.length; j++) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');
    pinElement.setAttribute('style', 'left:' + arrObjects[j].location.x + 'px; top:' + arrObjects[j].location.y + 'px');
    pinImg.setAttribute('src', arrObjects[j].author.avatar);
    pinImg.setAttribute('alt', arrObjects[j].offer.title);

    fragment.appendChild(pinElement);
  }

  mapPins.appendChild(fragment);

  map.insertBefore(cardElement, mapFiltersContainer);

};

var createCard = function () {
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


  popupTitle.textContent = arrObjects[0].offer.title;
  popupTextAddress.textContent = arrObjects[0].offer.address;
  popupTextPrice.textContent = arrObjects[0].offer.price + '₽/ночь';

  if (arrObjects[0].offer.type === 'flat') {
    popupType.textContent = 'Квартира';
  }
  if (arrObjects[0].offer.type === 'bungalo') {
    popupType.textContent = 'Бунгало';
  }
  if (arrObjects[0].offer.type === 'house') {
    popupType.textContent = 'Дом';
  }
  if (arrObjects[0].offer.type === 'palace') {
    popupType.textContent = 'Дворец';
  }

  popupTextCapacity.textContent = arrObjects[0].offer.rooms + ' комнаты для ' + arrObjects[0].offer.guests + ' гостей';
  popupTextTime.textContent = 'Заезд после ' + arrObjects[0].offer.checkin + ', выезд до ' + arrObjects[0].offer.checkout;
  for (var k = 0; k < popupFeaturesList.length; k++) {
    popupFeaturesList[k].textContent = arrObjects[0].offer.features[k];
  }

  popupDescription.textContent = arrObjects[0].offer.description;

  popupPhoto.setAttribute('src', arrObjects[0].offer.photos[0]);

  for (var l = 0; l < arrObjects[0].offer.photos.length - 1; l++) {
    var photo = popupPhoto.cloneNode(true);
    photo.setAttribute('src', arrObjects[0].offer.photos[l + 1]);
    fragment.appendChild(photo);

    popupPhotos.appendChild(fragment);
  }


  popupAvatar.setAttribute('src', arrObjects[0].author.avatar);

};

getArrayObject(8);
createPinElement();
createCard();
