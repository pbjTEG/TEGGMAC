/* TEG Google Maps Address Completion
 *
 * Enable address completion via Google Maps / Places API.
 *
 * Copyright © 2021, PMG / The Production Management Group, Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * The Engage Group <engage@engageyourcause.com>
 * Paul B. Joiner <paulj@engageyourcause.com>
 *
 * @formatter:off
 *
 * Address completion is configured by HTML blocks in the form. They should be something like this:

	<div class="en__field fakeAddress" style="display: none;">
		<label class="en__field__label" for="billingAddressFinder">STREET ADDRESS *</label>
		<input autocomplete="off" id="billingAddressFinder" placeholder="Enter a location" type="text" data-target="#en__field_supporter_address1" />
		<input data-fieldtype="street_number" type="hidden" />
		<input data-fieldtype="route" type="hidden" />
		<input data-fieldtype="country" type="hidden" data-target="#en__field_supporter_country" />
		<input data-fieldtype="city" type="hidden" data-target="#en__field_supporter_city" />
		<input data-fieldtype="region" type="hidden" data-target="#en__field_supporter_region" />
		<input data-fieldtype="postcode" type="hidden" data-target="#en__field_supporter_postcode" />
	</div>

 * The block may have only one visible text input. All other fields must be type="hidden". The hidden
 * fields indicate which real form fields will receive the data from Google Places if an address is
 * found.
 *
 * Each input supplies a CSS selector in attribute data-target to uniquely identify the real form
 * field to which the address data should be copied. The exceptions "street_number" and "route" are
 * concatenated before copying to the real field indicated by the one visible text field.
 *
 * This customization allows autocompletion on multiple addresses (such as billing and shipping) in
 * the same donation form. The id of the text field and for attribute of the label must be unique for
 * each fake field block inserted into the form.

 * @formatter:on
 */

// noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable,JSUnresolvedFunction
class TEGGMAC {
	// public properties
	options = {
		// translate country codes returned by Google
		countryCodes                : {
			'AF': 'AFG',
			'AL': 'ALB',
			'DZ': 'DZA',
			'AS': 'ASM',
			'AD': 'AND',
			'AO': 'AGO',
			'AI': 'AIA',
			'AQ': 'ATA',
			'AG': 'ATG',
			'AR': 'ARG',
			'AM': 'ARM',
			'AW': 'ABW',
			'AU': 'AUS',
			'AT': 'AUT',
			'AZ': 'AZE',
			'BS': 'BHS',
			'BH': 'BHR',
			'BD': 'BGD',
			'BB': 'BRB',
			'BY': 'BLR',
			'BE': 'BEL',
			'BZ': 'BLZ',
			'BJ': 'BEN',
			'BM': 'BMU',
			'BT': 'BTN',
			'BO': 'BOL',
			'BQ': 'BES',
			'BA': 'BIH',
			'BW': 'BWA',
			'BV': 'BVT',
			'BR': 'BRA',
			'IO': 'IOT',
			'BN': 'BRN',
			'BG': 'BGR',
			'BF': 'BFA',
			'BI': 'BDI',
			'KH': 'KHM',
			'CM': 'CMR',
			'CA': 'CAN',
			'CV': 'CPV',
			'KY': 'CYM',
			'CF': 'CAF',
			'TD': 'TCD',
			'CL': 'CHL',
			'CN': 'CHN',
			'CX': 'CXR',
			'CC': 'CCK',
			'CO': 'COL',
			'KM': 'COM',
			'CG': 'COG',
			'CD': 'COD',
			'CK': 'COK',
			'CR': 'CRI',
			'HR': 'HRV',
			'CU': 'CUB',
			'CW': 'CUW',
			'CY': 'CYP',
			'CZ': 'CZE',
			'CI': 'CIV',
			'DK': 'DNK',
			'DJ': 'DJI',
			'DM': 'DMA',
			'DO': 'DOM',
			'EC': 'ECU',
			'EG': 'EGY',
			'SV': 'SLV',
			'GQ': 'GNQ',
			'ER': 'ERI',
			'EE': 'EST',
			'ET': 'ETH',
			'FK': 'FLK',
			'FO': 'FRO',
			'FJ': 'FJI',
			'FI': 'FIN',
			'FR': 'FRA',
			'GF': 'GUF',
			'PF': 'PYF',
			'TF': 'ATF',
			'GA': 'GAB',
			'GM': 'GMB',
			'GE': 'GEO',
			'DE': 'DEU',
			'GH': 'GHA',
			'GI': 'GIB',
			'GR': 'GRC',
			'GL': 'GRL',
			'GD': 'GRD',
			'GP': 'GLP',
			'GU': 'GUM',
			'GT': 'GTM',
			'GG': 'GGY',
			'GN': 'GIN',
			'GW': 'GNB',
			'GY': 'GUY',
			'HT': 'HTI',
			'HM': 'HMD',
			'VA': 'VAT',
			'HN': 'HND',
			'HK': 'HKG',
			'HU': 'HUN',
			'IS': 'ISL',
			'IN': 'IND',
			'ID': 'IDN',
			'IR': 'IRN',
			'IQ': 'IRQ',
			'IE': 'IRL',
			'IM': 'IMN',
			'IL': 'ISR',
			'IT': 'ITA',
			'JM': 'JAM',
			'JP': 'JPN',
			'JE': 'JEY',
			'JO': 'JOR',
			'KZ': 'KAZ',
			'KE': 'KEN',
			'KI': 'KIR',
			'KP': 'PRK',
			'KR': 'KOR',
			'KW': 'KWT',
			'KG': 'KGZ',
			'LA': 'LAO',
			'LV': 'LVA',
			'LB': 'LBN',
			'LS': 'LSO',
			'LR': 'LBR',
			'LY': 'LBY',
			'LI': 'LIE',
			'LT': 'LTU',
			'LU': 'LUX',
			'MO': 'MAC',
			'MK': 'MKD',
			'MG': 'MDG',
			'MW': 'MWI',
			'MY': 'MYS',
			'MV': 'MDV',
			'ML': 'MLI',
			'MT': 'MLT',
			'MH': 'MHL',
			'MQ': 'MTQ',
			'MR': 'MRT',
			'MU': 'MUS',
			'YT': 'MYT',
			'MX': 'MEX',
			'FM': 'FSM',
			'MD': 'MDA',
			'MC': 'MCO',
			'MN': 'MNG',
			'ME': 'MNE',
			'MS': 'MSR',
			'MA': 'MAR',
			'MZ': 'MOZ',
			'MM': 'MMR',
			'NA': 'NAM',
			'NR': 'NRU',
			'NP': 'NPL',
			'NL': 'NLD',
			'NC': 'NCL',
			'NZ': 'NZL',
			'NI': 'NIC',
			'NE': 'NER',
			'NG': 'NGA',
			'NU': 'NIU',
			'NF': 'NFK',
			'MP': 'MNP',
			'NO': 'NOR',
			'OM': 'OMN',
			'PK': 'PAK',
			'PW': 'PLW',
			'PS': 'PSE',
			'PA': 'PAN',
			'PG': 'PNG',
			'PY': 'PRY',
			'PE': 'PER',
			'PH': 'PHL',
			'PN': 'PCN',
			'PL': 'POL',
			'PT': 'PRT',
			'PR': 'PRI',
			'QA': 'QAT',
			'RO': 'ROU',
			'RU': 'RUS',
			'RW': 'RWA',
			'RE': 'REU',
			'BL': 'BLM',
			'SH': 'SHN',
			'KN': 'KNA',
			'LC': 'LCA',
			'MF': 'MAF',
			'PM': 'SPM',
			'VC': 'VCT',
			'WS': 'WSM',
			'SM': 'SMR',
			'ST': 'STP',
			'SA': 'SAU',
			'SN': 'SEN',
			'RS': 'SRB',
			'SC': 'SYC',
			'SL': 'SLE',
			'SG': 'SGP',
			'SX': 'SXM',
			'SK': 'SVK',
			'SI': 'SVN',
			'SB': 'SLB',
			'SO': 'SOM',
			'ZA': 'ZAF',
			'GS': 'SGS',
			'SS': 'SSD',
			'ES': 'ESP',
			'LK': 'LKA',
			'SD': 'SDN',
			'SR': 'SUR',
			'SJ': 'SJM',
			'SZ': 'SWZ',
			'SE': 'SWE',
			'CH': 'CHE',
			'SY': 'SYR',
			'TW': 'TWN',
			'TJ': 'TJK',
			'TZ': 'TZA',
			'TH': 'THA',
			'TL': 'TLS',
			'TG': 'TGO',
			'TK': 'TKL',
			'TO': 'TON',
			'TT': 'TTO',
			'TN': 'TUN',
			'TR': 'TUR',
			'TM': 'TKM',
			'TC': 'TCA',
			'TV': 'TUV',
			'UG': 'UGA',
			'UA': 'UKR',
			'AE': 'ARE',
			'GB': 'GBR',
			'US': 'USA',
			'UM': 'UMI',
			'UY': 'URY',
			'UZ': 'UZB',
			'VU': 'VUT',
			'VE': 'VEN',
			'VN': 'VNM',
			'VG': 'VGB',
			'VI': 'VIR',
			'WF': 'WLF',
			'EH': 'ESH',
			'YE': 'YEM',
			'ZM': 'ZMB',
			'ZW': 'ZWE',
		},
		// API key for your Google Maps project
		APIKey                      : '',
		// CSS selector to find the fake address block(s)
		fakeAddressSelector         : '.fakeAddress',
		// CSS selector to find the real address field block
		realAddressBlockSelector    : '.en__field',
		// CSS class to add to the real address block when it should appear
		realAddressBlockDisplayClass: '',
		// CSS class to add to the real address block when it should not appear
		realAddressBlockHideClass   : 'en__hidden',
		// custom code to run after this object is initialized
		afterLoad                   : function () { return true },
	}; // end configuration options
	fakeAddresses; // array of fake address blocks

	constructor(Options) {
		let teggmac = this;

		// override settings with options sent via "new" statement
		teggmac.options = {...teggmac.options, ...Options};

		// allow form specific overrides to site-wide configuration
		if (typeof GMACCustom !== 'undefined') {
			teggmac.options = {...teggmac.options, ...GMACCustom};
		}

		// find the fake address blocks
		teggmac.fakeAddresses = document.querySelectorAll(teggmac.options.fakeAddressSelector);

		// if there's at least one fake address block in the file
		if (teggmac.fakeAddresses !== null) {
			// attach to window for the call to Google Maps API
			window.__TEG__GMAC = teggmac;

			// load Google Maps
			let headElement   = document.getElementsByTagName('head')[0],
			    scriptElement = document.createElement('script');
			scriptElement.async = true;
			scriptElement.defer = true;
			scriptElement.src = 'https://maps.googleapis.com/maps/api/js?key=' +
			                    teggmac.options.APIKey +
			                    '&libraries=places&callback=window.__TEG__GMAC.enableGMAC';
			headElement.appendChild(scriptElement);
		} // end if the fake address field is available
	} // end constructor()

	enableGMAC() {
		let teggmac = this;

		teggmac.fakeAddresses
		       .forEach(function(thisBlock) {
			       let fakeAddress = thisBlock.querySelector('input[type="text"]'),
			           realAddress = document.querySelector(fakeAddress.getAttribute('data-target')),
			           fakeCountry = thisBlock.querySelector('[data-fieldtype="country"]'),
			           realCountry = document.querySelector(fakeCountry.getAttribute('data-target'))
			       ;
			       fakeAddress.addEventListener('blur', function() {

				       if (!thisBlock.addrFinder.addrCompleted) {
					       thisBlock.style.display = 'none';
					       thisBlock.addrFinder.realAddrField.value =
						       thisBlock.addrFinder.addrFinderField.value;
					       if (teggmac.options.realAddressBlockHideClass !== '') thisBlock.addrFinder.realAddrBlock.classList.remove(teggmac.options.realAddressBlockHideClass);
					       if (teggmac.options.realAddressBlockDisplayClass !== '') thisBlock.addrFinder.realAddrBlock.classList.add(teggmac.options.realAddressBlockDisplayClass);
				       } // end if completed address found
			       });
			       fakeAddress.addEventListener('keyup', function(event) {
				       // noinspection EqualityComparisonWithCoercionJS
				       return !(event.keyCode == 13);
			       });

			       // if the target address block already has an address, don't do it
			       if (realAddress !== null &&
			           realAddress.value !== '')
			       {
				       return;
			       }

			       // enable geolocation
			       thisBlock.addrFinder = {
				       realAddrField    : realAddress,
				       realAddrBlock    : realAddress.closest(teggmac.options.realAddressBlockSelector),
				       addrFinderField  : fakeAddress,
				       fakeCountryField : fakeCountry,
				       realCountryField : realCountry,
				       autocomplete     : {},
				       addrCompleted    : false,
				       fillInAddress    : function() {
					       // Get the place details from the autocomplete object.
					       let place = thisBlock.addrFinder.autocomplete.getPlace();

					       // Get each component of the address from the place details
					       // and fill the corresponding field on the form.
					       for (let i = 0; i < place.address_components.length; i++) {
						       const addressType = place.address_components[i].types[0],
						             thisField   = thisBlock.querySelector('[data-fieldtype="' + addressType + '"]');

						       // if the address field type exists, save the value to the form
						       if (thisField !== null) {
							       const thisValue  = place.address_components[i][thisField.getAttribute('data-fieldlength')],
							             thisTarget = document.querySelector(thisField.getAttribute('data-target'));

							       // if the fake field has a valid target, save to that field
							       if (thisTarget !== null) thisTarget.value = thisValue;
							       thisField.value = thisValue;
						       }
					       } // end loop through address components
					       thisBlock.style.display = 'none';
					       thisBlock.addrFinder.realAddrField.value =
						       thisBlock.querySelector('[data-fieldtype="street_number"]').value +
						       ' ' +
						       thisBlock.querySelector('[data-fieldtype="route"]').value;
					       if (teggmac.options.realAddressBlockHideClass !== '') thisBlock.addrFinder.realAddrBlock.classList.remove(teggmac.options.realAddressBlockHideClass);
							 if (teggmac.options.realAddressBlockDisplayClass !== '') thisBlock.addrFinder.realAddrBlock.classList.add(teggmac.options.realAddressBlockDisplayClass);

					       /* Country select must be populated with the country code.
					        * Google returns two letter rather than three letter
					        * country codes. The form might be configured with either.
					        * If the returned value doesn't work then it must be
					        * translated. If that doesn't work either, the user will
					        * be forced to enter it manually.
					        */

					       // if the client is using the field at all
					       if (thisBlock.addrFinder.realCountryField !== null) {

						       // try to set the code
						       thisBlock.addrFinder.realCountryField.value =
							       thisBlock.addrFinder.fakeCountryField.value;

						       // if that didn't work, try the translated code
						       if (thisBlock.addrFinder.realCountryField.selectedIndex === -1) {
							       thisBlock.addrFinder.realCountryField.value =
								       teggmac.options.countryCodes[thisBlock.addrFinder.fakeCountryField.value];
						       }

						       // if that didn't work, select the first option
						       if (thisBlock.addrFinder.realCountryField.selectedIndex === -1) {
							       thisBlock.addrFinder.realCountryField.selectedIndex = 0;
						       }
					       } // end if country field is used

					       thisBlock.addrFinder.addrCompleted = true;
				       }, // end fillInAddress()
				       // Bias the autocomplete object to the user's geographical location,
				       // as supplied by the browser's 'navigator.geolocation' object.
				       geolocate : function() {
					       if (navigator.geolocation) {
						       navigator.geolocation.getCurrentPosition(function(position) {
							       const geolocation = {
								             lat : position.coords.latitude,
								             lng : position.coords.longitude
							             },
							             circle      = new google.maps.Circle({
								                                                  center : geolocation,
								                                                  radius : position.coords.accuracy
							                                                  });
							       thisBlock.addrFinder.autocomplete.setBounds(circle.getBounds());
						       });
					       }
				       } // end geolocate()
			       }; // end addrFinder{}

			       // When the user selects an address from the dropdown, populate the address
			       // fields in the form.
			       thisBlock.addrFinder.autocomplete = new google.maps.places.Autocomplete(
				       /** @type {!HTMLInputElement} */
				       (thisBlock.addrFinder.addrFinderField),
				       {types : ['geocode']}
			       );
			       // noinspection JSDeprecatedSymbols
			       thisBlock.addrFinder.autocomplete.addListener('place_changed', thisBlock.addrFinder.fillInAddress);

			       /* Hide the real address field and show the fake one
			        * if the real one is blank and visible. If the real
			        * address field isn't visible, some other mechanism
			        * will have to swap these objects.
			        */
			       if (thisBlock.addrFinder.realAddrField.value === '')
			       {
				       // hide real address field
				       if (teggmac.options.realAddressBlockHideClass !== '') thisBlock.addrFinder.realAddrBlock.classList.add(teggmac.options.realAddressBlockHideClass);
				       thisBlock.style.display = 'block';
			       }
		       }); // end fakeAddresses.each()
		teggmac.options.afterLoad.call(teggmac)
	}; // end enableGoogleMaps()
} // end TEGGMAC()
