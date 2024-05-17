### Google Maps Address Completion

Enable a fake input field for address completion using Google Places. GMAC hide the real address input field and run only once. Thereafter, only the real address field will appear.

## Requires

* A Google Maps API account.

## Implementation

### Include Script Links

Include TEGGMAC in your page header.

```HTML
<script src="https://www.server.com/path/TEGGMAC.js" type="text/javascript"></script>
```


### Include Fake Address Blocks

Before the `TEGGMAC` object can be initialized, the form must contain one or more fake address blocks associated with real address fields in the form. If the CMS won't let you insert arbitrary HTML, it will be necessary to do so with some extra JavaScript.

For each block of address fields which require the autocompletion feature, add a block of HTML similar to this just above the street address field:

```HTML
<div class="fakeAddress" style="display: none;">
   <label for="shippingAddressFinder">Address 1 *</label>
   <input autocomplete="off" id="shippingAddressFinder" placeholder="Enter a location" type="text" data-target="#en__field_supporter_address1" />
   <input data-fieldtype="street_number" data-fieldlength="short_name" type="hidden" />
   <input data-fieldtype="route" data-fieldlength="long_name" type="hidden" />
   <input data-fieldtype="locality" data-fieldlength="long_name" type="hidden" data-target="#en__field_supporter_city" />
   <input data-fieldtype="administrative_area_level_1" data-fieldlength="short_name" type="hidden" data-target="#en__field_supporter_region" />
   <input data-fieldtype="postal_code" data-fieldlength="short_name" type="hidden" data-target="#en__field_supporter_postcode" />
   <input data-fieldtype="country" data-fieldlength="short_name" type="hidden" data-target="#en__field_supporter_country" />
</div>

``` 

The class `fakeAddress` on the outermost `div` element is required for the script to recognize the block. See Configuration: fakeAddressSelector below to alter this.

The values for `data-fieldtype` indicate the following:

| Value | Meaning in US Address |
|---|-----------------------|
| country | country               |
| locality | city                  |
| administrative_area_level_1 | state                 |
| postal_code | zip code |

The values for `data-fieldlength` must be one of `long_name` or `short_name`. The recommended selections are set in the example above.

Each `data-target` attribute is a CSS selector to uniquely identify the real form field to receive each part of the address data.

Note that the `id` of the one visible text field and the `for` of the label should be unique and match each other.

In your custom JavaScript for the form, initialize the object with an API Key from [Google Cloud](https://console.cloud.google.com) under Credentials.

```javascript
// initialize Google Address Completion
document.addEventListener('DOMContentLoaded', () => { let myGMAC = new TEGGMAC({APIKey : 'API Key Value from https://console.cloud.google.com'}); });
```

### <a id="Configuration"></a> Configuration

`TEGGMAC` requires an object which configures the address completion. Valid values are:

| Key                                                 | Type | Required | Description | Default |
|-----------------------------------------------------|---|---|---|---|
| **APIKey**                                          | String | **Required**   | Unique API Key value generated for the site's [Google API project](https://console.developers.google.com/apis).                                                                                                                                                                | Empty String |
| countryCodes                                        | Plain Object | Optional       | A list of two letter country codes and preferred values. This is used to translate the two letter code of the `short_name` country value to whatever the form uses. This allows the client to configure their country select field to two or three letter code values at whim. | `{ 'AF': 'AFG', 'AL': 'ALB', 'DZ': 'DZA', ... 'ZM': 'ZMB', 'ZW': 'ZWE',}`                                                                                                     |
| <a id="fakeAddressSelector"></a>fakeAddressSelector | String | Optional       | A CSS **selector** to identify all the fake address blocks                                                                                                                                                                                                                     | `'.fakeAddress'`                                                                                                                                                              |
| realAddressBlockSelector                            | String | Optional       | CSS **selector** to identify the HTML block containing the real address input field. This is used in a `closest()` call.  Default is for Engaging Networks.                                                                                                                    | `'.en__field'` |
| realAddressBlockDisplayClass                        | String | Optional       | CSS **class name** to add when the real address block should be visible. Based on the assumption that the CMS is using class names to swap content (if it even does) this allows the CMS to function as expected.                                                              | `''` |
| realAddressBlockHideClass                           | String | Optional       | CSS **class name** to add when the real address block should be hidden. Default is for Engaging Networks.                                                                                                                                                                      | `'en__hidden'` |
| afterLoad                                           | Function | Optional       | Function to run after all fake input blocks have been initialized. | `() => true;` |


At a minimum, the options object must contain a value for `APIKey`.

## Properties

### options

A plain object containing the options used to initialize the instance of TEGGMAC. See [Configuration](#Configuration) above.

### fakeAddresses

A NodeList containing the address completion elements identified by [`fakeAddressSelector`](#fakeAddressSelector) above. Each entry has a new `addrFinder` property.

#### addrFinder

| Property         | Type | Description                                                                                                        |
|------------------|---|--------------------------------------------------------------------------------------------------------------------|
| realAddrField    | HTML Node | The real input field generated by the CMS.                                                                         |
| realAddrBlock    | HTML Node | Parent element of `realAddrField` used to hide and display the input field.                                        |
| addrFinderField  | HTML Node | The input field used for address completion.                                                                       |,
| fakeCountryField | HTML Node | The ideally hidden field which receives the country value output from Google Maps.                                 |
| realCountryField | HTML Node | The form field generated by the CMS which will get the translated country value.                                   |
| autocomplete | Plain Object | Object returned by google.maps.places.Autocomplete()                                                               |
| addrCompleted | Boolean | True if the Google address completion has run. Hopefully, this means that the real address fields have been populated. |
| fillInAddress | Function | This parses the output from Google Maps and populates the real input fields. |
| geolocate | Function | Sets Google Maps to favor the general location of the user. |
