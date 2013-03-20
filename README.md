# address_picker-rails

An address picker for Rails with autocompletion and map picking.
This library is built upon [jquery-addresspicker](https://github.com/sgruhier/jquery-addresspicker) and adds convenient features such as:

* integration with the assets pipeline
* auto loading of the Google Maps API
* auto discovery of the address picker fields
* JavaScript object wrappers
* (TODO) form builders

## Installation

Add it to your Gemfile:

`gem 'address_picker-rails'`

Run the following command to install it:

`bundle install`

In your JavaScript manifest `application.js` add:

`//= require address_picker-rails`

Since `jquery-addresspicker` uses jQuery-UI themes, you may use [jquery-ui-themes-rails](https://github.com/fatdude/jquery-ui-themes-rails) instead of defining your own theme:

* add to your Gemfile: `gem 'jquery-ui-themes'`
* add to you CSS manifest `application.css`: ` *= require jquery-ui/<theme_name>`

## Usage

You may also take a look at this simple [demo application](https://github.com/ddidier/address_picker-rails-demo) which is also [deployed on Heroku](http://address-picker-rails-demo.herokuapp.com).

### Model

In your migration:

    class CreatePonds < ActiveRecord::Migration
      def change

        create_table :ponds do |t|

          t.string :address
          t.string :address_latitude
          t.string :address_longitude
          t.string :address_locality
          t.string :address_country

          t.timestamps
        end

      end
    end

In your model:

    class Pond < ActiveRecord::Base
      attr_accessible :address, :address_latitude, :address_longitude, :address_locality, :address_country
    end

### View

In the following example the only mandatory field is the address (the first one):

    <div class="field">
      <%= f.label :address %><br />
      <%= f.text_field :address, :class => 'address-picker-input' %>
    </div>

    <div class="field">
      <%= f.label :address_latitude %><br />
      <%= f.text_field :address_latitude, :readonly => true, :class => 'address-picker-latitude' %> </div>

    <div class="field">
      <%= f.label :address_longitude %><br />
      <%= f.text_field :address_longitude, :readonly => true, :class => 'address-picker-longitude' %>
    </div>

    <div class="field">
      <%= f.label :address_locality %><br />
      <%= f.text_field :address_locality, :readonly => true, :class => 'address-picker-locality' %>
    </div>

    <div class="field">
      <%= f.label :address_country %><br />
      <%= f.text_field :address_country, :readonly => true, :class => 'address-picker-country' %>
    </div>

    <div class="field">
      <%= f.label :address_map %><br />

      <!-- *** Pay attention to the IDs *** -->
      <div id="pond_address_map_wrapper" class="address-picker-map-wrapper">
        <div class="address-picker-legend">You can drag and drop the marker to the correct location</div>
        <div id="pond_address_map" class="address-picker-map"></div>
      </div>
    </div>

#### IDs

Pay attention to the IDs of the fields: all related fields must have an ID beginning with the same prefix (here that's `pond_address` since we are using a form builder). The default prefix is `address`.

<table>
  <tr>
    <th>ID</th>
    <th>Required</th>
    <th>Read only</th>
  </tr>
  <tr>
    <td>[prefix]</td>
    <td>X</td>
    <td></td>
  </tr>
  <tr>
    <td>[prefix]_latitude</td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[prefix]_longitude</td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[prefix]_locality</td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[prefix]_country</td>
    <td></td>
    <td>X</td>
  </tr>
  <tr>
    <td>[prefix]_map</td>
    <td></td>
    <td>X</td>
  </tr>
</table>

NB: In the above example, the ID of the map field is `pond_address_map` since it's not set by a builder.

#### CSS

The CSS classes are optional unless you're planning to use the auto-discovery feature (see below).
If you do, the address field must have the `address-picker-input` class.

### Scripts

There are several ways to initialize the address pickers.

#### Auto discovery

The simplest one is to use auto discovery which:

* (optionally) waits for the DOM to be loaded, then
* searches for all fields having the `address-picker-input` CSS class, then
* uses each ID of these fields as a prefix to apply an address picker

So you can just add to your `application.js` or to your view:

    AddressPickerRails.Pickers.applyOnReady();

You can provide a callback which will be called after each address picker has been applied:

    AddressPickerRails.Pickers.applyOnReady({
      'onLoad':function (picker) {
        console.debug("callback for a single pond with ID '%s'", picker.getIdPrefix());
      }
    });

The not deferred version:

    AddressPickerRails.Pickers.apply();

#### Manual

The ID prefix default is `address`:

    new AddressPickerRails.Picker().apply();

You can use a custom ID prefix:

    new AddressPickerRails.Picker({idPrefix:"pond_address"}).apply();

You can provide a callback which will be called after the address picker has been applied:

    var picker = new AddressPickerRails.Picker({idPrefix:"pond_address"});
    picker.apply(function (railsPicker) {
        console.debug("callback for a single pond with ID '%s'", railsPicker.getIdPrefix());
    });

## Requirements

Tested with Rails 3.2 but it should work with Rails 3.1, or anything that uses the asset pipeline.

## Contributing to address_picker-rails

* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet.
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it.
* Fork the project.
* Start a feature/bugfix branch.
* Commit and push until you are happy with your contribution.
* Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
* Please try not to mess with the Rakefile, version, or history. If you want to have your own version, or is otherwise necessary, that is fine, but please isolate to its own commit so I can cherry-pick around it.

## Copyright

Copyright (c) 2012 David DIDIER. See LICENSE.txt for further details.

[Sébastien Gruhier@https://github.com/sgruhier/jquery-addresspicker](https://github.com/sgruhier/jquery-addresspicker)
