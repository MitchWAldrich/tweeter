$(document).ready(function() {
  console.log('char-counter is ready');
  $('#tweet-text').on('input', function() {
    let countdown = (140 - this.value.length);
    if (countdown < 0) {
      $('output').css('color', 'red');
    }
    if (countdown >= 0) {
      $('output').css('color', '#545149');
    }
    $('output').html(`${countdown}`);
  });
});