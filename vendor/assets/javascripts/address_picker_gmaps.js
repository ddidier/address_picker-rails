var AddressPickerRails = AddressPickerRails || {}

/**
 * Google Maps utilities as a singleton.
 */
AddressPickerRails.GMaps = function () {

    // ---------- singleton --------------------------------------------------------------------------------------------

    if (AddressPickerRails.GMaps.caller != AddressPickerRails.GMaps.instance) {
        throw "AddressPickerRails.GMaps is a singleton, access must be done by AddressPickerRails.GMaps.instance()";
    }

    if (arguments.callee.singleton) {
        return arguments.callee.singleton;
    }

    arguments.callee.singleton = this;

    // ---------- private fields ---------------------------------------------------------------------------------------

    var STATE_NOT_LOADED = "not_loaded";
    var STATE_LOADING = "loading";
    var STATE_LOADED = "loaded";

    var state = STATE_NOT_LOADED;
    var callbacks = new Array();

    // ---------- private methods --------------------------------------------------------------------------------------

    /**
     * Load the Google Maps API.
     * @param callback the function to call when the API is loaded.
     */
    var doLoad = function (callback) {
        //console.debug("Loading GMaps API");

        var script = document.createElement("script");
        script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=AddressPickerRails.GMaps.onLoad";
        script.type = "text/javascript";

        callbacks.push(callback);
        state = STATE_LOADING;

        $("head").append(script);
    };

    /**
     * !!! PRIVATE !!!
     * Call all the defined callback functions.
     */
    this.doCallback = function () {
        for (var i in callbacks) {
            callbacks[i]();
        }
    };

    // ---------- public methods ---------------------------------------------------------------------------------------

    /**
     * Test if the Google Maps API is loaded and update the state accordingly.
     */
    this.updateStatus = function () {
        if (state == STATE_LOADED) {
            return true;
        }

        // may be loaded by someone else
        if (typeof google === "undefined") return false;
        if (typeof google.maps === "undefined") return false;
        if (typeof google.maps.Map === "undefined") return false;

        state = STATE_LOADED;
        return true;
    };

    /**
     * Test if the Google Maps API is loaded.
     * @return true if the Google Maps API is loaded, false otherwise.
     */
    this.isLoaded = function () {
        this.updateStatus();
        return (state == STATE_LOADED);
    };

    /**
     * Load the Google Maps API.
     * @param callback the function to call when the API is loaded.
     */
    this.load = function (callback) {
        //console.debug("Loading GMaps");
        this.updateStatus();

        switch (state) {
            case STATE_NOT_LOADED:
                doLoad(callback);
                break;
            case STATE_LOADING:
                //console.debug("GMaps is loading");
                callbacks.push(callback);
                break;
            case STATE_LOADED:
                //console.debug("GMaps is already loaded");
                callback();
                break;
            default:
                throw "Illegal state: " + state;
                break;
        }
    };

};

// ---------- static methods -------------------------------------------------------------------------------------------

/**
 * Returns the AddressPickerRails.GMaps singleton.
 * @return {AddressPickerRails.GMaps}
 */
AddressPickerRails.GMaps.instance = function () {
    return new AddressPickerRails.GMaps();
};

/**
 * Global function used as a callback by Google Maps API when loaded.
 * Call 'AddressPickerRails.GMaps.instance().doCallback()';
 */
AddressPickerRails.GMaps.onLoad = function () {
    AddressPickerRails.GMaps.instance().doCallback();
};
