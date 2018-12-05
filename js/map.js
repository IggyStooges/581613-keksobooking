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
var ESC_KEYCODE = 27;
var MIN_COORDS_X = 0;
var MAX_COORDS_Y = 630;
var MIN_COORDS_Y = 130;


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
var popupFeaturesList = cardElement.querySelector('.popup__features');
var popupFeature = popupFeaturesList.querySelector('.popup__feature:first-of-type');
var popupDescription = cardElement.querySelector('.popup__description');
var popupPhotos = cardElement.querySelector('.popup__photos');
var popupPhoto = cardElement.querySelector('.popup__photo');
var popupAvatar = cardElement.querySelector('.popup__avatar');
var fieldsets = document.getElementsByTagName('fieldset');
var mainPinMap = document.querySelector('.map__pin--main');
var mapFilters = document.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var inputAddress = document.getElementById('address');
var reset = document.querySelector('.ad-form__reset');

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

var createPinElement = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');
    pinElement.style.left = arr[i].location.x + 'px';
    pinElement.style.top = arr[i].location.y - PIN_HEIGHT + 'px';
    pinElement.style.marginLeft = '-' + PIN_WIDTH / 2 + 'px';
    pinElement.style.marginTop = PIN_HEIGHT + 'px';
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
  renderFeatures(arrayElement);
  popupDescription.textContent = arrayElement.offer.description;

  renderPictures(arrayElement);
  popupAvatar.src = arrayElement.author.avatar;
  map.insertBefore(cardElement, mapFiltersContainer);

};

var setVisibleElement = function (collection, disabled) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].disabled = disabled;
  }
};

var coordinateAddressX = parseInt(mainPinMap.style.left, 10) + mainPinMap.offsetWidth / 2;
var coordinateAddressY = parseInt(mainPinMap.style.top, 10) + mainPinMap.offsetHeight / 2;

var coordinateAddress = coordinateAddressX + ', ' + coordinateAddressY;
inputAddress.value = coordinateAddress;
setVisibleElement(fieldsets, true);
mapFilters.classList.add('map__filters--disabled');

var openPopup = function (currentIndex) {
  var popup = map.querySelector('.map__card');

  if (popup) {
    map.removeChild(popup);
  }

  createCard(currentIndex);

  return popup;
};

var closePopup = function () {
  var popup = map.querySelector('.popup');
  var closebutton = popup.querySelector('.popup__close');
  if (popup.classList.contains('hidden')) {
    popup.classList.remove('hidden');
  }
  closebutton.addEventListener('click', function () {
    popup.classList.add('hidden');
    closebutton.removeEventListener('click', closePopup);
  });
  document.addEventListener('keydown', function (evt) {
    if (popup) {
      if (evt.keyCode === ESC_KEYCODE) {
        popup.classList.add('hidden');
      }
    }
  });

};

var createPopup = function (currentPin, currentIndex) {
  currentPin.addEventListener('click', function () {
    openPopup(currentIndex);
    closePopup();
    currentPin.removeEventListener('click', createPopup);
  });
};

var createPopupOnPinCLick = function (arr) {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < arr.length; i++) {
    createPopup(pins[i], arr[i]);
  }
};

var activateMap = function () {
  var isActivatedMap = false;
  mainPinMap.addEventListener('mousedown', function () {
    mainPinMap.addEventListener('mousemove', function () {
      mainPinMap.addEventListener('mouseup', function () {

        if (!isActivatedMap) {
          map.classList.remove('map--faded');
          adForm.classList.remove('ad-form--disabled');
          setVisibleElement(fieldsets, false);
          createPinElement(createArrayCard(CARDS_LENGTH));
          createPopupOnPinCLick(createArrayCard(CARDS_LENGTH));
          isActivatedMap = true;
        }
      });
    });
  });
  mainPinMap.removeEventListener('mousemove', activateMap);

};

var changePriceByType = function () {
  var typeSelect = document.querySelector('#type');
  var typeOption = typeSelect.querySelectorAll('option');
  var priceInput = document.querySelector('#price');
  var selectedOptionIndex = typeSelect.options.selectedIndex;
  typeOption[selectedOptionIndex].value = '';

  var minPrice = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  if (typeOption[selectedOptionIndex].text === 'Бунгало') {
    priceInput.min = minPrice.bungalo;
    priceInput.placeholder = minPrice.bungalo;
  }

  if (typeOption[selectedOptionIndex].text === 'Квартира') {
    priceInput.min = minPrice.flat;
    priceInput.placeholder = minPrice.flat;
  }

  if (typeOption[selectedOptionIndex].text === 'Дом') {
    priceInput.min = minPrice.house;
    priceInput.placeholder = minPrice.house;
  }

  if (typeOption[selectedOptionIndex].text === 'Дворец') {
    priceInput.min = minPrice.palace;
    priceInput.placeholder = minPrice.palace;
  }
  typeSelect.addEventListener('change', function () {
    changePriceByType();
  });


  reset.addEventListener('click', function () {
    typeSelect.value = '';
    changePriceByType();
  });
};


var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var changeTime = function (firstSelect, secondSelect) {
  firstSelect.addEventListener('change', function () {
    secondSelect.selectedIndex = firstSelect.selectedIndex;
  });
};


var compareRooms = function (select) {
  select.setCustomValidity('Выберите');
  select.addEventListener('change', function () {
    roomNumber.setCustomValidity('');
    capacity.setCustomValidity('');

    var capacityInt = parseInt(capacity.value, 10);
    var roomInt = parseInt(roomNumber.value, 10);

    if (capacityInt > roomInt && capacityInt > 0) {
      select.setCustomValidity('Выберите соответсвующие значение (количество гостей не может превышать количество комнат)');
    } else if (roomInt === 100 && capacityInt > 0) {
      select.setCustomValidity('100 комнат не для гостей');
    } else if (roomInt !== 100 && capacityInt === 0) {
      select.setCustomValidity('Выберите количество гостей');
    }
  });
};

var createSuccessMessage = function () {

  var adFormSuccesTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var adFormSuccesWindow = adFormSuccesTemplate.cloneNode(true);
    var element = document.querySelector('.success');
    if (element) {
      adForm.removeChild(element);
    }
    adForm.appendChild(adFormSuccesWindow);
    adFormSuccesWindow.addEventListener('click', function () {
      adForm.removeChild(adFormSuccesWindow);
    });
    window.addEventListener('keydown', function (escEvt) {
      if (escEvt.keyCode === ESC_KEYCODE) {
        adForm.removeChild(adFormSuccesWindow);
      }
    });

  });
};

var sendingForm = function () {
  changePriceByType();
  changeTime(timeIn, timeOut);
  changeTime(timeOut, timeIn);
  compareRooms(roomNumber);
  compareRooms(capacity);
  createSuccessMessage();
};
activateMap();

sendingForm();

var resetCoordsX = mainPinMap.style.left;
var resetCoordsY = mainPinMap.style.top;

mainPinMap.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {

    moveEvt.preventDefault();
    var pinHeight = mainPinMap.offsetHeight;
    var pinWidth = mainPinMap.offsetWidth;
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    var newCoordY = mainPinMap.offsetTop - shift.y;
    var newCoordX = mainPinMap.offsetLeft - shift.x;
    if (newCoordY <= MAX_COORDS_Y - pinHeight && newCoordY >= MIN_COORDS_Y) {
      mainPinMap.style.top = newCoordY + 'px';
    }
    mainPinMap.style.top = mainPinMap.offsetTop + 'px';
    if (newCoordX <= blockWidth - pinWidth && newCoordX >= MIN_COORDS_X) {
      mainPinMap.style.left = newCoordX + 'px';
    }
    mainPinMap.style.left = mainPinMap.offsetLeft + 'px';
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    coordinateAddressX = parseInt(mainPinMap.style.left, 10) + Math.floor(mainPinMap.offsetWidth / 2);
    coordinateAddressY = parseInt(mainPinMap.style.top, 10) + Math.floor(mainPinMap.offsetHeight);
    coordinateAddress = coordinateAddressX + ', ' + coordinateAddressY;
    inputAddress.value = coordinateAddress;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    reset.addEventListener('click', function () {
      mainPinMap.style.top = resetCoordsY;
      mainPinMap.style.left = resetCoordsX;
    });
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
