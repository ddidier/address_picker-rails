//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require address_picker
//= require address_picker_gmaps

var AddressPickerRails = AddressPickerRails || {};

//
//
//
// ---------------------------------------------------------------------------------------------------------------------
// AddressPickerRails.Pickers
// ---------------------------------------------------------------------------------------------------------------------
//

/**
 * Static helper methods.
 */
AddressPickerRails.Pickers = function (my) {

    var pickers = {};

    /**
     * Apply the address picker to the fields having the specified CSS class prefix.
     * Load the Google Maps API if needed, then call the onLoad function if provided (for every address picker).
     * @param options the picker options :
     * - 'classPrefix' default to 'address-picker'
     * - 'onLoad' default to 'null'
     */
    my.apply = function (options) {
        var settings = jQuery.extend({
            'classPrefix':'address-picker',
            'onLoad'     :null
        }, options);

        //console.debug("Looking for address pickers with class prefix '%s'", settings.classPrefix);

        jQuery("." + settings.classPrefix + "-input").each(function (index, element) {
            //console.debug("Found address picker with ID '%s'", element.id);
            var picker = new AddressPickerRails.Picker({ idPrefix:element.id })
            picker.apply(settings.onLoad);
            pickers[element.id] = picker;
        });
    };

    /**
     * Wrap 'AddressPickerRails.Pickers.apply' in jQuery(document).ready().
     * @param options the picker options :
     * - 'classPrefix' default to 'address-picker'
     * - 'onLoad' default to 'null'
     */
    my.applyOnReady = function (options) {
        jQuery(document).ready(function () {
            AddressPickerRails.Pickers.apply(options);
        });
    };

    /**
     * Returns the AddressPickerRails.Picker for the specified prefix.
     * @param idPrefix the prefix of the AddressPickerRails.Picker to return.
     * @return the AddressPickerRails.Picker for the specified prefix.
     */
    my.get = function (idPrefix) {
        return pickers[idPrefix];
    };

    return my;

}(AddressPickerRails.Pickers || {});

//
//
//
// ---------------------------------------------------------------------------------------------------------------------
// AddressPickerRails.Picker
// ---------------------------------------------------------------------------------------------------------------------
//

/**
 * An address picker defined by its IDs prefix.
 * The address picker will be applied to the fields identified by:
 * - '<prefix>'           (**required**)
 * - '<prefix>_map'       (optional)
 * - '<prefix>_latitude'  (optional)
 * - '<prefix>_longitude' (optional)
 * - '<prefix>_locality'  (optional)
 * - '<prefix>_country'   (optional)
 * @param options the picker options :
 * - 'idPrefix' default to 'address'
 */
AddressPickerRails.Picker = function (options) {

    // ---------- private fields ---------------------------------------------------------------------------------------

    var settings = jQuery.extend({
        'idPrefix':'address'
    }, options);

    var picker;
    var onLoadCallback;
    var that = this;

    // ---------- private methods --------------------------------------------------------------------------------------

    /**
     * Test if a field with an ID of 'settings.idPrefix' exists.
     * @return true if the field exists, false otherwise.
     */
    var isExisting = function () {
        return jQuery("#" + settings.idPrefix).length > 0;
    };

    /**
     * Apply the address picker to the existing fields identified by the ID prefix.
     */
    var define = function () {
        //console.debug("Defining address picker with ID prefix '%s'", settings.idPrefix);

        var elements = {};
        var element_suffixes = {
            map     : "_map",
            lat     : "_latitude",
            lng     : "_longitude",
            locality: "_locality",
            country : "_country"
        };

        for (var key in element_suffixes)
        {
            var element = $("#" + settings.idPrefix + element_suffixes[key]);

            if (element.length) {
                //console.debug("Found '%s' element with ID '%s'", key, element.id);
                elements[key] = element;
            }
        }

        picker = $("#" + settings.idPrefix).addresspicker({
            elements: elements
        });

        if (elements['map']) {
            picker.addresspicker("marker").setVisible(true);
            picker.addresspicker("updatePosition");
        }
    };

    /**
     * !!! PRIVATE !!!
     * Define the address picker then call the callback function if any.
     * This is intended to be used by the Google Maps API and should not be called directly.
     */
    this.callback = function () {
        AddressPickerRails.OriginalPicker.define();

        if (isExisting()) {
            // execute the callback if provided

            // define the address picker
            define();
            if (onLoadCallback) {
                onLoadCallback(that);
            }
        }
    };

    // ---------- public methods ---------------------------------------------------------------------------------------

    /**
     * Returns the ID prefix.
     * @return the ID prefix.
     */
    this.getIdPrefix = function () {
        return settings.idPrefix;
    };

    /**
     * Returns the JQuery address picker.
     * @return the JQuery address picker.
     */
    this.getPicker = function () {
        return picker;
    };

    /**
     * Apply the address picker to the fields defined by the IDs prefix.
     * Load the Google Maps API if needed, then call the onLoad function if provided.
     * @param onLoad the function to call after the Google Maps API is loaded and the picker is applied (optional). The
     * callback may take the AddressPickerRails.Picker as argument.
     */
    this.apply = function (onLoad) {
        //console.debug("Applying address picker to ID prefix '%s'", settings.idPrefix);

        // set the callback if provided, reset it otherwise
        if (arguments.length == 1 && typeof onLoad === "function") {
            onLoadCallback = onLoad;
        } else {
            onLoadCallback = null;
        }

        AddressPickerRails.GMaps.instance().load(this.callback);
    };

};
