// 'use strict';
// (function () {
//   var IMAGES_TYPE = ['gif', 'jpg', 'jpeg', 'png'];

//   var avatarUploadField = document.querySelector('.ad-form-header__upload');
//   var avatarChooser = avatarUploadField.querySelector('.ad-form-header__input');
//   var uploadPhotoField = document.querySelector('.ad-form__upload');
//   var photoHousingChooser = uploadPhotoField.querySelector('.ad-form__input');
//   var avatarPreviewField = document.querySelector('.ad-form-header__preview');
//   var avatarPreview = avatarPreviewField.querySelector('img');

//   avatarChooser.addEventListener('change', function () {
//     var avatar = avatarChooser.files[0];
//     var avatarFileName = avatar.name.toLowerCase();

//     var matches = IMAGES_TYPE.some(function (it) {
//       return avatarFileName.endsWith(it);
//     });

//     if (matches) {
//       var reader = new FileReader();

//       reader.addEventListener('load', function () {
//         avatarPreview.src = reader.result;
//       });
//       reader.readAsDataURL(avatar);
//     }
//   });
// })();
