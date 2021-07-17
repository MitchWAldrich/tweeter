// When page has loaded, begin client operations
$(document).ready(function() {
  $('form').on('submit', postTweet); // when user clicks "Tweet", posts their text from the textarea
  
  loadTweets(); // render tweets from server on page load
});

// the loadTweets function renders tweets on page load, as well as repopulates tweets after error messaging and new tweet posts
const loadTweets = (function() {
  $.ajax('/tweets', { method: 'GET' }) // GET request made to the server of saved tweets
    .then(function(tweets) { // then loads the tweets array
      renderTweets(tweets);  // and renders all saved tweets
    })
    .catch((err) => { // catches any error while making the GET request
    });
});

// postTweet function submits tweet text from the textarea and renders it at the top of the list of tweets
const postTweet = function(event) {
  event.preventDefault(); //stops page reload when "TWEET" is clicked
  let data = $('#tweet-text').val();
  const $tweetsContainer = $('#tweets-container');
  data = $tweetsContainer.text(data).html(); // prepares tweet data for page rendering
  if (data.length > 140) { // if the tweet is longer than 140 characters, it can't be submitted
    errorMessage('#too-long'); // displays error message that the tweet is too long
  } else if (data.length <= 0 || data === null) { // if the tweet is empty or null, no new tweet is rendered
    errorMessage('#no-tweet'); // displays error message that no tweet was entered
  } else { // Else tweet is posted
    jQuery.post('/tweets', { text: data }) // jQuery post request submits text from the form to the /tweets server
      .then(function() { 
        clearAndUpdate(); // then clears the text area, resets the counter, and renders the new tweet at the top of the previous tweets
      })
      .catch((err) => { // catches any errors in the post request
      });
  }
};

// errorMessage function initiates error display if tweet is empty or above 140 characters
const errorMessage = (id) => { // errorMessage takes in an id variable matching the html tag for the error
  loadTweets(); // re-load existing tweets on error rendering
  $(id).slideDown().css('display', 'block'); // error message appears and slides into view
  setTimeout(() => { // setTimeout slides the error message away 2 seconds later
    $(id).slideUp();
  }, 2000);
};

// clearAndUpdate manages functionality after the post request is made
const clearAndUpdate = () => {
  $('#tweet-success').slideDown().css('display', 'block'); // success message slides down when tweet is posted
  setTimeout(() => { // setTimeout clears the success message 2 seconds after it displays
    $('#tweet-success').slideUp();
  }, 2000);
  $('#tweet-text').val(''); // clears the text form on submission
  $('#tweet-text').trigger('input'); // resets the character counter on submission
  $('#tweets-container').empty(); // clears new text from tweet-container
  loadTweets(); // reloads tweets with the new tweet at the top
};

// createTweetElement assembles necessary input from a tweet object to render the html of a new tweet
const createTweetElement = function(tweetObj) {
  const { user, content, created_at } = tweetObj; // destructures the tweetObj for specific variable data
  const { name, avatars, handle } = user;
  const { text } = content;

  const $tweet = //jquery variable containing the dynamic tweet creation html, including timeago updating the time since the tweet was created
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

// renderTweets loops through an array of tweet objects appending each to the tweet-container
const renderTweets = function(tweets) {
  const tweetContainer = $('#tweets-container');
  tweets.reverse().forEach(tweet => { // reverses the tweet order to display the most recent at the top of the page
    tweetContainer.append(createTweetElement(tweet)); // append all tweets to the tweet container
  });
};