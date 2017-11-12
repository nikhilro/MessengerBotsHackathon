# Facebook Developer Circle Toronto Hackathon Seed Project

Follow these steps to get your team's bot configured and off the ground.

> Each team member must create a personal Facebook account and a Facebook developer account [here] (https://developers.facebook.com/) 

## Before you begin - team tasks

* Create a Facebook page [here] (https://www.facebook.com/pages/create) 
    * Choose Cause or Community as the page type
    * Use this format for the page name: ```Developer Circles Toronto Hack 2017 Team ##```
    * Add a page username using the same format: ```@Developer Circles Toronto Hack 2017 Team ##```
    * Configure your page's button: Add Button > Get in Touch > Send Message 
    * Bookmark your page and/or Pin to Favorites so you can find it later
    * Ensure all your team members are page admins
* Add a two-line comment on the [Hackathon Team Submissions thread] (https://www.facebook.com/groups/DevCToronto/search/?query=Hackathon%20Team%20Submissions) with your team's github repo url and page address

## Server Configuration - Part I
> these steps have no dependencies so complete them first
* Update config/default.json 
    * "fb_validationToken": "make up a short phrase to use when you validate your webhook in a later step",
    * "sh_shopName": "select the value that was assigned to your team",
    * "sh_apiKey": "select the value that was assigned to your team",
    * "sh_apiPassword": "select the value that was assigned to your team",

## Configure your Facebook application - Part I
> The App Dashboard is the admin panel for all your Facebook Platform integrations. Every app you create contains some unique values which are used to secure the communication channels between your bot, the Messenger Platform and the people who message your page. You must copy these values into your bot's config file.
* Create a Facebook application in the [App Dashboard] (https://developers.facebook.com/apps)
    * Copy the App Secret value from the App Dashboard 
* Update config/default.json 
    * "fb_appSecret": "the auto generated value for your app in the App Dashboard"
* Add and configure the Messenger product
    * App Dashboard > {Your App} > Add Product > Messenger > Token Generation > Page > {select your team's page}
    * Copy the generated value
* Update config/default.json 
    * "fb_pageAccessToken":  "the value generated in and copied from the App Dashboard"

## Start your server and ngrok tunnel
> You must run your server so that the Messenger Platform can verify that your webhook is available 
* Run `npm install` from the project root folder to install all dependencies
* Run `npm start` to start the node server
* Run `ngrok http 5000` to get a public URL to your node server. DO NOT CLOSE THIS WINDOW!!!
* Update config/default.json 
    * "host_url": "https://{your unique url}.ngrok.io"
    * If you close/restart the ngrok service, update this field with the new URL and restart the node server.
* Restart the node server to ensure that it reads and uses the new host_url config value

## Configure your Facebook application - Part II

* Configure the Webhooks product
    * App Dashboard > {Your App} > Messenger > Webhooks > Setup Webhooks
        * Callback URL:  https://{your unique url}.ngrok.io/webhook
            * If you close/restart the ngrok service, repeat this step with the new URL.
        * Verify token: use the value you defined for the fb_validationToken field in config/default.json 
        * Subscription fields: select messages and messaging_postbacks as a minimum
    * App Dashboard > {Your App} > Messenger > Webhooks > Select a Page... > {select your team's page} > Subscribe

## Test your bot
* Open your Facebook page 
* Click the Send Message button and tap the Get Started button
* Send a simple text message to your bot
> The message should be echoed back at you
* Send 'help' to your bot
> You should be presented with a message a button
* Tap the 'Get 3 products' button
> You should see a carousel with three cards, one for each product that was returned



# Additional Information

# Facebook Developer Circle Toronto Hackathon Seed Project

### Sponsored by Candyboxx, Dev6, Facebook, Shopify

## Hackathon Description

The purpose of the hackathon is to build an application which allows a consumer to get insightful information about a Toronto based company’s Shopify store using Facebook’s Messenger Bot platform. The challenge will encourage participants to leverage the Shopify API to provide rich and meaningful responses to subjective questions, using 3rd party resources to perform natural language processing, machine learning, and sentiment analysis. The challenge will be open to any stack, but a seed project will be provided in Node JS. We recommend participants to form groups of 3 to 5, but groups will be limited to no greater than 5. 

## Before you begin

* Make sure your group has been registered (no more than 5 people allowed per entry)
* Get the Shopify private app API credentials which have been assigned to you.
* Make sure you have a facebook account.
* Create a facebook developer account and create the messenger app. Use the [walk-through](https://developers.facebook.com/docs/messenger-platform/quickstart) to help you get started
* Create a facebook page and connect the button to the messenger.

This project is an example server for Messenger Platform built in Node.js. With this app, you can send it messages and it will echo them back to you. You can also see examples of the different types of Structured Messages. This project also connects to a Shopify store and retrives product data.


It contains the following functionality:

* Webhook (specifically for Messenger Platform events)
* Send API 
* Web Plugins
* Messenger Platform v1.1 features
* Shopify API Node.js

## Setup

Set the values in `config/default.json` before running the sample. Descriptions of each parameter can be found in `app.js`. Alternatively, you can set the corresponding environment variables as defined in `app.js`.

To obtain the Facebook app secret, page access token, and validation token, follow the [walk-through](https://developers.facebook.com/docs/messenger-platform/quickstart).

To obtain Shopify API key and password, refer [here](https://help.shopify.com/manual/apps/private-apps)

* Setup your facebook developer account and create a facebook messenger app. Use the walk-through to help you. 
* Once the app has been created, in the seed project, fill in the Facebook and Shopify credentials in config/default.json
* In the root directory of the project run `npm install` in the command line to install the dependencies
* Open another comandline window and start ngrok `ngrok http 5000`. This will give you a public URL to your node server.
* Run the node server `npm start`
* Use this URL (ex. https://d5a6c526.ngrok.io/webhook) in the messenger Webhook settings. (If you restart ngrok, you'll get a new URL, so you'll need to redo this step if that happens)
* If the webook has successfully authenticated, setup the messenger with the webhook and subscribe it to your Facebook page
* Fill in any remaining credentials in config/default.json
* Restart the node server
* Open the Facebook page which contains the messenger bot and click the 'Get Started' button. This should open up the a messenger window to the bot. Test it by typing 'help'


## Run

You can start the server by running `npm start`. However, the webhook must be at a public URL that the Facebook servers can reach. Therefore, running the server locally on your machine will not work.

You can run this example on a cloud service provider like Heroku, Google Cloud Platform or AWS. Note that webhooks must have a valid SSL certificate, signed by a certificate authority. Read more about setting up SSL for a [Webhook](https://developers.facebook.com/docs/graph-api/webhooks#setup).

You can use ngrok for development which will generate an external URL for your node server. `ngrok http 5000`

## Webhook

All webhook code is in `app.js`. It is routed to `/webhook`. This project handles callbacks for authentication, messages, delivery confirmation and postbacks. More details are available at the [reference docs](https://developers.facebook.com/docs/messenger-platform/webhook-reference).