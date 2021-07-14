$(document).ready(function() {
  console.log('char-counter is ready')
  $('#tweet-text').on('keypress', function() {
    let countdown = (139 - this.value.length);
    if (countdown < 0) {
      $('output').css('color', 'red');
    }
    $('output').html(`${countdown}`);
  })
    // console.log(140 - this.value.length);
});