#= require jquery.jaticker
#= require jquery.lazyload

$(document).ready ->
  $('h1').jaticker
    leaveCursor: true

  $img = $('img')
  lazyload = ->
    $($img.splice(0, 1)).show().lazyload(effect: 'fadeIn')
    unless $img.length == 0
      setTimeout lazyload, 50
  setTimeout lazyload, 0

  $('a[rel="external"]').attr('target', '_blank')
