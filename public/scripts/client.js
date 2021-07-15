/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
// let tweetExample = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {
  console.log('client.js running')
  
  const renderTweets = function(tweets) {
    const tweetContainer = $('#tweets-container')
    tweets.forEach(tweet => {
      tweetContainer.append(createTweetElement(tweet))
    });
  }

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
  </article>`)

    return $tweet;
  }

  renderTweets(data);

  $('form').submit(function(event) {

    event.preventDefault();
  })

//   const tweetData = {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//         "handle": "@SirIsaac"
//       },
//     "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//     "created_at": 1461116232227
//  }

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); 

});

