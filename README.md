### Google Maps Address Completion

Enable a fake input field for address completion using Google Places.

## Requires

* A Google Maps API accounnt.

## Implementation

### Include Script Links

Include jQuery and TEGGMAC in your page header.

```
 <script src="https://www.server.com/path/jquery.min.js" type="text/javascript"></script>
 <script src="https://www.server.com/path/TEGGMAC.js" type="text/javascript"></script>
```


### Include Fake Address Blocks

Before the `TEGGMAC` object can be initialized, the form must contain one or more fake address blocks associated with real address fields in the form. If the CMS won't let you insert arbitrary HTML, it will be necessary to do so with some extra JavaScript.

For each block of address fields which require the autocompletion feature, add a block of HTML similar to this just above the street address field:

```
<div class="fakeAddress" style="display: none;">
   <labelfor="shippingAddressFinder">SHIPPING ADDRESS *</label>
   <input autocomplete="off" id="shippingAddressFinder" placeholder="Enter a location" type="text" data-target="#shipadd1" />
   <input data-fieldtype="street_number" type="hidden" />
   <input data-fieldtype="route" type="hidden" />
   <input data-fieldtype="country" type="hidden" data-target="#shipcountry" />
   <input data-fieldtype="locality" type="hidden" data-target="#shipcity" />
   <input data-fieldtype="administrative_area_level_1" type="hidden" data-target="#shipregion" />
   <input data-fieldtype="postal_code" type="hidden" data-target="#shippostcode" />
</div>
``` 

The class `fakeAddress` on the outermost `div` element is required for the script to recognize the block. See Configuration: fakeAddressSelector below to alter this.

Each `data-target` attribute is a CSS selector to uniquely identify the real form field to receive the address data. Note that the `id` of the one visible text field and the `for` of the label should be unique and match each other.

In your custom JavaScript for the form, initialize the object.

```javascript
// initialize Google Address Completion
jQuery(document).ready(function() {
	var MyVarName = new TEGGMAC({APIKey : 'myVeryLongAPIKeyGeneratedByGoogle'});
}); // end jQuery(document).ready

```

### Configuration

`TEGGMAC` requires an object which configures the address completion. Valid values are:

| Key                 | Required     | Description                                                                                                                                                                                                                                                                    | Default                                                                                                                                                                       |
|---------------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **APIKey**          | **Required** | Unique API Key value generated for the site's [Google API project](https://console.developers.google.com/apis).                                                                                                                                                                | Empty String                                                                                                                                                                  |
| componentForm       | Optional     | A list of field types to specify what kind of data Google Maps returns for each address field. [See Google Places documentation](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform).                                        | `{ street_number  :'short_name', route  :'long_name', locality  :'long_name', administrative_area_level_1: 'short_name', postal_code  :'short_name', country  :'short_name'}` |
| countryCodes        | Optional     | A list of two letter country codes and preferred values. This is used to translate the two letter code of the `short_name` country value to whatever the form uses. This allows the client to configure their country select field to two or three letter code values at whim. | `{ 'AF': 'AFG', 'AL': 'ALB', 'DZ': 'DZA', ... 'ZM': 'ZMB', 'ZW': 'ZWE',}`                                                                                                     |
| fakeAddressSelector | Optional     | A CSS selector to identify all the fake address blocks                                                                                                                                                                                                                         | `'.fakeAddress'`                                                                                                                                                              |


At a minimum, the options object must contain a value for `APIKey`.
