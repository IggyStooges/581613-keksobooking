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
  var avatarDropArea = document.querySelector('.ad-form-header__drop-zone');
  var photosDropArea = document.querySelector('.ad-form__drop-zone');
  var avatarFieldset = document.querySelector('.ad-form-header');
  var photosFieldset = photosPreviewContainer.parentNode;


  var dropAreaDragHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };

  var uploadImages = function (chooser, dropArea, chooseHandler, dropHandler) {
    chooser.addEventListener('change', chooseHandler);
    dropArea.addEventListener('dragenter', dropAreaDragHandler, false);
    dropArea.addEventListener('dragleave', dropAreaDragHandler, false);
    dropArea.addEventListener('dragover', dropAreaDragHandler, false);
    dropArea.addEventListener('drop', dropHandler, false);
  };

  var uploadAvatarImage = function (photosList) {
    if (!avatarFieldset.disabled) {
      var avatar = photosList[0];
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
    }
  };

  var avatarChooserHandler = function () {
    var images = avatarChooser.files;
    uploadAvatarImage(images);
  };

  var avatarDropHandler = function (evt) {
    evt.preventDefault();
    var images = evt.dataTransfer.files;
    uploadAvatarImage(images);
  };

  uploadImages(avatarChooser, avatarDropArea, avatarChooserHandler, avatarDropHandler);

  var uploadPhotosImage = function (photosList) {
    if (!photosFieldset.disabled) {
      var photo = photosList[0];
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
    }
  };

  var photosChooserHandler = function () {
    var images = photosChooser.files;
    uploadPhotosImage(images);
  };

  var photosDropHandler = function (evt) {
    evt.preventDefault();
    var images = evt.dataTransfer.files;
    uploadPhotosImage(images);
  };

  uploadImages(photosChooser, photosDropArea, photosChooserHandler, photosDropHandler);

  var resetImages = function () {
    var userImagesPreview = photosPreviewContainer.querySelectorAll('.ad-form__photo:not(:first-child)');

    avatarPreview.src = DEFAULT_AVATAR_SRC;

    userImagesPreview.forEach(function (element) {
      element.remove();
    });
    photosPreviewContainer.appendChild(photosPreview);
  };


  window.images = {
    reset: resetImages
  };
})();
