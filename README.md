# MMM-Jacke
Check temperature and display if a jacket is needed or not

This Magic Mirror² Module allows the user to connect to their weatherapi.com account to get weather data which can be interpreted by the module and display a thumbs-up, -middle, or -down depending on current temperature and wind speed.

# 1. Set up

1. clone this directory into ~/MagicMirror/modules
2. Create an Account at weatherapi.com
3. Open your config.js and paste the following code into your modules section:
        		
            {
			module: "MMM-jacke",
			position: "top_left",
			config: {
				apiBaseUrl: "https://api.weatherapi.com/v1/current.json",
				apiKey: "[YOUR_API_KEY]",
        location: "[YOUR_PREFERED_LOCATION]"
			}
		}, 
4. Copy and paste your own API Key and your prefered location 
5. Enjoy!

# 2. Configuration
If you feel like the thumb isn't displaying your preferences for when to wear a jacket or not, you can go into the MMM-jacke.js and edit the temperatures and windspeed accordingly.

1. Open you MMM-jacke.js
2. Scroll to the if-else section

    		// check if conditions met
		var checkThumbsUp = (
			(temp <= 18 && windStrength <= 60) ||
			(temp >= 19 && windStrength >= 18) ||
			(temp >= 32 && windStrength >= 50) ||
      		(temp <= 25 && windStrength >= 35)
		);

		var checkThumbsMiddle = (
			(temp >= 18) &&(temp <= 24) &&
			(windStrength >= 1) && (windStrength <= 15)
		);
3. Change these values to your liking. (NOTE: These temperatures are in CELCIUS not Fahrenheit, the Windspeed in km/h, not in mph)
