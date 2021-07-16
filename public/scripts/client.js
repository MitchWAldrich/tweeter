$(document).ready(function() {
  console.log('client.js running');

  loadTweets();

  $('form').on('submit', postTweet);

});

const loadTweets = (function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(tweets) {
      console.log(`Success: ${JSON.stringify(tweets)}`);
      renderTweets(tweets);
    })
    .catch((err) => {
      console.log(`err loading tweets: ${err}`);
    });
});

const postTweet = function(event) {
  event.preventDefault();
  console.log('prevented Default');
  let data = $(this).serialize();
  if (data.length > 145) {
    errorMessage('#too-long');
  } else if (data.length <= 5 || data === null) {
    errorMessage('#no-tweet');
  } else {
    jQuery.post('/tweets', data)
      .then(function() {
        clearAndUpdate();
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

const clearAndUpdate = () => {
  $('form').trigger('reset');
          $('#tweet-text').trigger('input');
          const $tweetsContainer = $('#tweets-container')
          $tweetsContainer.empty();
          loadTweets();
}

const errorMessage = (id) => {
  $(id).slideDown().css('display', 'block');
      setTimeout(() => {
        $(id).slideUp();
      }, 2000)
    };

const createTweetElement = function(tweetObj) {
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
    </article>`);

  return $tweet;
};

const renderTweets = function(tweets) {
  const tweetContainer = $('#tweets-container');
  tweets.reverse().forEach(tweet => {
    tweetContainer.append(createTweetElement(tweet));
  });
};