Steem-hook provides a tiny, easy to use web service for posting to the STEEM blockchain via services like [IFTTT](https://ifttt.com). 

    https://mysite.com/posting/myuser/awesome-tag/My_Awesome_Title?body=And%20now%20for%20something%20compleatly%20different%21

You can use a GET or POST request. For a GET request the post body will be read from the `content` query string parameter in the URL as shown above. For a POST provide some content in the request body as JSON and be sure to provide a `Content-Type` header set to `application/json`.

```json
{
	"content" : "And now for something compleatly different\r\n"
}
```


The only WIF required is posting. If you run steem-hook from your own server you don't have to share this credential with a third party.

Since steem-hook intends to remain small and focused it is well suited for deployment to Heroku's free tier and similar platforms. 

`heroku config:set POSTING_KEY={YOUR_OWN_POSTING_WIF}`

If you set the `NODE_ENV` environment variable to `development` it will post content to testnet.steem.vc instead of Steemit. For example

`heroku config:set NODE_ENV=development`
