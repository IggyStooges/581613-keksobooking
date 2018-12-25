'use strict';
(function () {

  var URL_DATA = 'https://js.dump.academy/keksobooking/data';
  var URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;
  var REQUEST_TIMEOUT = 10000;

  var createHttpRequest = function (onLoad, onError, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('статус ответа' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIMEOUT;

    if (data) {
      xhr.open('POST', URL);
      xhr.send(data);
    } else {
      xhr.open('GET', URL_DATA);

      xhr.send();
    }
  };

  var getData = function (onLoad, onError) {
    createHttpRequest(onLoad, onError);
  };

  var sendData = function (onLoad, onError, data) {
    createHttpRequest(onLoad, onError, data);
  };

  window.backend = {
    getData: getData,
    sendData: sendData
  };

})();
