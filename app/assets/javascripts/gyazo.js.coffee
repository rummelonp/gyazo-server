$(document).ready ->
  $('h1').jaticker
    leaveCursor: true
    inputSpeed: 100

  $('img').MyThumbnail
    thumbWidth: 150
    thumbHeight: 150
    imageDivClass: 'picture'

  $('a').attr('target', '_blank')
