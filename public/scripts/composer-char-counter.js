$(document).ready(function() {
  console.log('char-counter is ready')
  $('#tweet-text').on('input', function() {
    let countdown = (140 - this.value.length);
    console.log('char', this.value.length)
    if (countdown < 0) {
      $('output').css('color', 'red');
    }
    $('output').html(`${countdown}`);
  })
    // console.log(140 - this.value.length);
});