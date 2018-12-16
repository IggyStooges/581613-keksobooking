'use strict';
(function () {
  var IMAGES_TYPE = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarUploadField = document.querySelector('.ad-form-header__upload');
  var avatarChooser = avatarUploadField.querySelector('.ad-form-header__input');
  var uploadPhotosField = document.querySelector('.ad-form__upload');
  var photosChooser = uploadPhotosField.querySelector('.ad-form__input');
  var photosPreview = document.querySelector('.ad-form__photo');
  var avatarPreviewField = document.querySelector('.ad-form-header__preview');
  var avatarPreview = avatarPreviewField.querySelector('img');

  avatarChooser.addEventListener('change', function () {
    var avatar = avatarChooser.files[0];
    var avatarFileName = avatar.name.toLowerCase();

    var matches = IMAGES_TYPE.some(function (it) {
      return avatarFileName.endsWith(it);
    });

    if (matches) {
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

    var matches = IMAGES_TYPE.some(function (it) {
      return photoFileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        img.src = reader.result;
        img.style.width = '70px';
        img.style.height = '70px';
        photosPreview.appendChild(img);
      });

      reader.readAsDataURL(photo);
    }
  });

})();
