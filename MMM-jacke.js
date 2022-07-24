Module.register("MMM-jacke",{
	/**
	 * Set default values for the module
	 */
	defaults: {
		result: "Loading...",
		updateInterval: 500,
	},
	/**
	 * Get css classes from seperat file
	 */
	getStyles: function () {
		return ["style.css"];
	},
	/**
	 * Start data fetching by calling class method.
	 */
	start: function() {
		this.getData();
	},
	/**
	 * Request weather data from weatherapi and safe response
	 * in class reference. Dom automatically updates after
	 * receiving a valid response.
	 */
	getData: async function() {
		var self = this;

		var apiBaseUrl = self.config.apiBaseUrl;
		var apiKey = self.config.apiKey;
		var location = "self.config.location";

		let response = await fetch(apiBaseUrl + apiKey + location,
			{
				method: 'GET',
				mode: 'cors',
				headers: {
					'Accept': 'application/json',
					'Access-Control-Allow_Origin':'*',
				}
			}
		);

		let data = await response.json();
		self.config.result = data;
		self.updateDom(1);
	},

	/**
	 * Override the dom generator and append components to body.
	 */
	getDom: function() {
		var self = this;
		var currentWeather = self.config.result;

		// create basis variables
		if (currentWeather !== undefined) {
			var location = currentWeather.location.name;
			var temp = currentWeather.current.temp_c;
			var temp = currentWeather.current.temp_c;
			var windStrength = currentWeather.current.wind_kph;
		}

		// create components
		var root_div = document.createElement("div");
		var text = document.createElement("div");
		var imgWrapper = document.createElement("div");
		var img = document.createElement("img");

		var metadataWrapper = document.createElement("div");
		var metadataTemp = document.createElement("div");
		var metadataLocation = document.createElement("div");
		var metadataWindStrength = document.createElement("div");

		//styling of the components
		metadataWrapper.classList.add('metadata');
		metadataTemp.classList.add('ok');
		img.classList.add('image');
		text.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";

		// set components content
		metadataTemp = temp + " &deg;C"
		metadataLocation = location;
		metadataWindStrength = windStrength + " KM/H";
		metadataWrapper.innerHTML = metadataTemp + ' | ' + metadataLocation + ' | ' + metadataWindStrength;
		text.innerHTML = "Jacke anziehen?";

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

		if(checkThumbsUp) {
			img.src = "./modules/MMM-jacke/thumbs_up.png";
		} else if (checkThumbsMiddle) {
			img.src = "./modules/MMM-jacke/thumbs_middle.png";
		} else {
			img.src = "./modules/MMM-jacke/thumbs_down.png";
		}

		// add components to template
		imgWrapper.appendChild(img);
		root_div.appendChild(text);
		root_div.appendChild(metadataWrapper);
		root_div.appendChild(imgWrapper);

		return root_div;
	}
});
