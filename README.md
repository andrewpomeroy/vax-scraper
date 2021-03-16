# Techno-dystopian vaccine availability tracker/scraper

1. Set up an account at twilio.com
2. Gather the account SID, and API key from the Twilio developer console
3. Create a new file under the name `.env` (duplicate `.env.sample` to make your life a bit easier), filling in the credentials from the previous step, plus the phone number you want to receive the SMS notification
4. Run `npm install` in your console to grab all the necessary dependencies
5. Run `npm start` in your console to start the scraper, which runs at a 1-minute interval (customizable in `cron.js`) and will shoot off a notification SMS if the website yields a response indicating there might be vaccine slots available!

**Good luck! 🤞🤞**
