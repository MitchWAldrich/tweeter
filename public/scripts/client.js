$(document).ready(function() {
  console.log('client.js running');
  
  $('form').on('submit', postTweet);
  
  loadTweets();
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
  let data = $('#tweet-text').val();  
  const $tweetsContainer = $('#tweets-container')
  data = $tweetsContainer.text(data).html();
  if (data.length > 140) {
    errorMessage('#too-long');
  } else if (data.length <= 0 || data === null) {
    errorMessage('#no-tweet');
  } else {
    jQuery.post('/tweets', { text: data })
      .then(function() {
        console.log('posted the tweet')
        $('#tweet-success').slideDown().css('display', 'block');
        setTimeout(() => {
        $('#tweet-success').slideUp();
        }, 2000)
        $('#tweet-text').val('');
        $('#tweet-text').trigger('input');
        $('#tweets-container').empty();
        
        loadTweets();
        // clearAndUpdate();
      })
      .catch((err) => {
        console.error(err);
      });
  }
};


const errorMessage = (id) => {
  loadTweets();
  $(id).slideDown().css('display', 'block');
  setTimeout(() => {
    $(id).slideUp();
  }, 2000)
};

const clearAndUpdate = () => {
  // $('form').trigger('reset');
  //   $('#tweet-text').trigger('input');
  //   $('#tweets-container').empty();
  //   $('#tweets').replaceWith(loadTweets());
}

const createTweetElement = function(tweetObj) {
  const { user, content, created_at } = tweetObj;
  const { name, avatars, handle } = user;
  const { text } = content;

  const $tweet = 
    $(`<article class=tweet>
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