'use strict';
(function () {
  var IMAGES_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
  var ImagesSize = {
    WIDTH: '70px',
    HEIGHT: '70px'
  };
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

  var avatarUploadField = document.querySelector('.ad-form-header__upload');
  var avatarChooser = avatarUploadField.querySelector('.ad-form-header__input');
  var uploadPhotosField = document.querySelector('.ad-form__upload');
  var photosChooser = uploadPhotosField.querySelector('.ad-form__input');
  var photosPreview = document.querySelector('.ad-form__photo');
  var avatarPreviewField = document.querySelector('.ad-form-header__preview');
  var avatarPreview = avatarPreviewField.querySelector('img');
  var photosPreviewContainer = document.querySelector('.ad-form__photo-container');

  avatarChooser.addEventListener('change', function () {
    var avatar = avatarChooser.files[0];
    var avatarFileName = avatar.name.toLowerCase();

    var isMatches = IMAGES_TYPE.some(function (it) {
      return avatarFileName.endsWith(it);
    });

    if (isMatches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(avatar);
    }
  });

  photosChooser.addEventListener('change', function () {
    var photo = photosChooser.files[0];
    var photoFileName = photo.name.toLowerCase();

    var isMatches = IMAGES_TYPE.some(function (it) {
      return photoFileName.endsWith(it);
    });

    if (isMatches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photosPreviewElement = photosPreview.cloneNode(false);

        var img = document.createElement('img');
        img.src = reader.result;
        img.style.width = ImagesSize.WIDTH;
        img.style.height = ImagesSize.HEIGHT;
        photosPreviewElement.appendChild(img);
        photosPreviewContainer.appendChild(photosPreviewElement);
        photosPreview.remove();
      });

      reader.readAsDataURL(photo);
    }
  });

  var resetImages = function () {
    var userImagesPreview = photosPreviewContainer.querySelectorAll('.ad-form__photo:not(:first-child)');

    avatarPreview.src = DEFAULT_AVATAR_SRC;

    userImagesPreview.forEach(function (element) {
      element.remove();
    });
    photosPreviewContainer.appendChild(photosPreview);

  };

  var handleDrop = function (e) {
    e.preventDefault();
    var dt = e.dataTransfer;
    var files = dt.files;

    var avatar = dt.files[0];
    var avatarFileName = avatar.name.toLowerCase();

    console.log(dt);
    console.log(files);

    var isMatches = IMAGES_TYPE.some(function (it) {
      return avatarFileName.endsWith(it);
    });

    if (isMatches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(avatar);
    }
  };

  var cons = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log('safadsadasd');
  };

  var dropArea = document.querySelector('.ad-form-header__drop-zone');

  dropArea.addEventListener('dragenter', cons, false);
  dropArea.addEventListener('dragleave', cons, false);
  dropArea.addEventListener('dragover', cons, false);
  dropArea.addEventListener('drop', handleDrop, false);

  window.images = {
    reset: resetImages
  };
})();
