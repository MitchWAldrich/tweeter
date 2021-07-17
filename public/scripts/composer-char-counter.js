// implements functionality to the character countdown, tracking the number of characters entered to the textarea
$(document).ready(function() {
  $('#tweet-text').on('input', function() { // creates event listener on keyboard input
    let countdown = (140 - this.value.length); // tracks countdown number beginning at 140, decreasing with each keyboard input
    if (countdown < 0) { // tweet limit of 140, so when it goes below that, render css to turn the counter red
      $('output').css('color', 'red'); 
    }
    if (countdown >= 0) { // when counter goes back over 0 after being red, returns to initial grey
      $('output').css('color', '#545149');
    }
    $('output').html(`${countdown}`); // renders the countdown number as html
  });
});