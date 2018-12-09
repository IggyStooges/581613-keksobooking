'use strict';
(function () {

  var urlData = 'https://js.dump.academy/keksobooking/data';
  var URL = 'https://js.dump.academy/keksobooking';


  var getData = function (onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('статус ответа' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('GET', urlData);

    xhr.send();

  };

  var sendData = function (data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);

    });
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    getData: getData,
    sendData: sendData

  };

})();
