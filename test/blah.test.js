describe("blah", function() {
	it("should blah", function(done) {
		var OAuth = require("oauth").OAuth;
		
		var oauth = new OAuth(
			"https://api.twitter.com/oauth/request_token", 
			"https://api.twitter.com/oauth/access_token", 
			"EY6XceQRkI35lInwQ9gP0SA9w",
			"hKam7QLAZPZesaqqDm8E3YVEhjEhhwujMj0xYwrn1NQ9YpYUZE",
			"1.0A",
			null,
			"HMAC-SHA1"
		);
			
		oauth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret, results) {
			console.log(err);
			done(err);
      	});
	});
});

//describe('OAuth1.0',function(){
//  var OAuth = require('oauth');
//
//  it('tests trends Twitter API v1.1',function(done){
//    var oauth = new OAuth.OAuth(
//      'https://api.twitter.com/oauth/request_token',
//      'https://api.twitter.com/oauth/access_token',
//      'EY6XceQRkI35lInwQ9gP0SA9w',
//      'hKam7QLAZPZesaqqDm8E3YVEhjEhhwujMj0xYwrn1NQ9YpYUZE',
//      '1.0A',
//      null,
//      'HMAC-SHA1'
//    );
//    oauth.get(
//      'https://api.twitter.com/1.1/trends/place.json?id=23424977',
//      '14772674-fs5wiCen4dFIFmvtnS8xwwDZSpJWQP2U7RkbrLsFN', //test user token
//      'qKwfVxETf1KgyXiaAPHs1ARX3oXdi31fzUswD8j3fBGT1', //test user secret            
//      function (e, data, res){
//        if (e) console.error(e);        
//        console.log(require('util').inspect(data));
//        done(e);      
//      });    
//  });
//});