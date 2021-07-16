/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function () {
  console.log('client.js running')

  const createTweetElement = function (tweetObj) {
    const { user, content, created_at } = tweetObj;
    const { name, avatars, handle } = user;
    const { text } = content;

    const $tweet = $(`<article class=tweet>
    <header>
    <div class=user>
    <img class="avatar" src="${avatars}">
    <h4>${name}</h4>
    </div>
    <h4 id="handle">${handle}</h4>
    </header>
    <h5>${text}</h5>
    <footer>
    <p>${timeago.format(created_at)}</p>
    <div id="icons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </div>
    </footer>
    </article>`)

    return $tweet;
  }

  const renderTweets = function (tweets) {
    const tweetContainer = $('#tweets-container')
    tweets.reverse().forEach(tweet => {
      tweetContainer.append(createTweetElement(tweet))
    });
  }

  // renderTweets(data);
  // $('#tweets-container').text();

  $('form').submit(function (event) {
    event.preventDefault();
    console.log('prevented Default')
    let data = $(this).serialize();
    if (data.length > 147) {
      alert('Your tweet is too long!')
    } else if (data.length < 7 || data === null) {
      alert('There is no tweet to post!')
    } else {
      console.log('data', data)
      console.log('length', data.length)
      jQuery.post('/tweets', data)
        .then(function () {
          $('form').trigger('reset');
          $('#tweet-text').trigger('keypress')
          loadTweets();
        })
        .catch((err) => {
          console.error(err)
        })
        .always(() => {
          console.log(`Printing this too?`)
        })
    }
  })

  const loadTweets = (function () {
    // const $button = $('button')
    // $button.on('click', function () {
    //   console.log('button clicked, performing ajax call...')
      $.ajax('/tweets', { method: 'GET' })
        .then(function (tweets) {
          console.log(`Success: ${JSON.stringify(tweets)}`);
          renderTweets(tweets)
        })
        .catch((err) => {
          console.log(`err loading tweets: ${err}`)
        })
        .always(() => {
          console.log(`Always print this. But why?`)
        })
  })
  loadTweets()

});

