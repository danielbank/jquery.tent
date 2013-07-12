/**
*	A jQuery extension for supporting simple popups on the iPad based on the work of Keith Wood
* {
*   http://keith-wood.name/maxlength.html
*   Textarea Max Length for jQuery v1.1.0.
*   Written by Keith Wood (kwood{at}iinet.com.au) May 2009.
*   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
*   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
*   Please attribute the author if you use it.
* }
*
* @fileoverview
* @author Daniel Bank <dbank@gonpl.com>
* @version 1.0
* @requires jquery
*/

(function($) { // Hide scope, no $ conflict

/**
* @class
* @classdesc The Singleton manager that manages all interactions for the plugin
*	@constructor 
*/

function Tent() {
	
/**
* Property containing the default values for the Plugin
* 
* @type {json}
*/

	this._defaults = {
		top: 0, // Position of the top side of the popup 
		left: 0 // Position of the left side of the popup
	};
}

$.extend(Tent.prototype, {
	
/**
* Class name added to elements to indicate already configured with tent.
* 
* @type {json}
*/

	markerClassName: 'hasTent',
		
/**
* Name of the data property for instance settings.
* 
* @type {json}
*/

	propertyName: 'tent',
			
/**
* Selector for a created element that serves as the popup background.
* 
* @type {json}
*/

	popUpBackgroundSelector: '#pop-up-background',
				
/**
* HTML for a created element that serves as the popup background.
* 
* @type {json}
*/

	popUpBackgroundHTML: '<div id="pop-up-background"></div>',
/**
* Override the default settings for all max length instances.
*
* @access public
* @param {json} options - the new settings to use as defaults
* @returns {Tent} this object
*/

	setDefaults: function(options) {
		$.extend(this._defaults, options || {});
		return this;
	},
	
/**
* Attach the tent functionality to a div.
*
* @access private
* @param {element} target - the control to affect
* @param {json} options - the custom options for this instance
*/

	_attachPlugin: function(target, options) {
		target = $(target);
		// If the target already has the markerClassName class, break
		if (target.hasClass(this.markerClassName)) {
			return;
		}
		// Add markerClassName to the target element's classes, add an instance of tent with the default values to the target's data, and call _optionPlugin()
		var inst = {options: $.extend({}, this._defaults)};
		target.addClass(this.markerClassName).
			data(this.propertyName, inst);
		this._optionPlugin(target, options);
	},
	
/**
* Retrieve or reconfigure the settings for a control.
*
* @access private
* @param {element} target - the control to affect
* @param {json or string} options - the new options for this instance or an individual property name
* @param {any} value - the individual property value (omit if options is an object or to retrieve the value of a setting)
* @returns {any} if retrieving a value
*/

	_optionPlugin: function(target, options, value) {
		target = $(target);
		// Get the tent instance for the target
		var inst = target.data(this.propertyName);
		if (!options || (typeof options == 'string' && value == null)) {
			// If retrieving option(s), return the option(s)
			var name = options;
			options = (inst || {}).options;
			return (options && name ? options[name] : options);
		}
		
		// If the target already has the markerClassName class, break
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		// The new options for this instance are the input options or an empty object literal otherwise
		options = options || {};
		if (typeof options == 'string') {
			// If updating a single option, just update that one value
			var name = options;
			options = {};
			options[name] = value;
		}
		$.extend(inst.options, options);
	},
	
/**
* Show the target element
*
* @access private
* @param {element} target - the control to show
*/

	_showPlugin: function(target) {
		target = $(target);
		// If the target already has the markerClassName class, break
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		// Get the tent instance for the target
		var inst = target.data(this.propertyName);
		
		// Show the target and add the popup background to the DOM
		target.css("top", inst.options.top + 'px').css("left", inst.options.left + 'px');
		target.removeClass("hidden");
		$("body").append(this.popUpBackgroundHTML);
		var dH = $(document).height();
		$(this.popUpBackgroundSelector).css("height",dH + "px").show();
	},
	
	
/**
* Hide the target element
*
* @access private
* @param {element} target - the control to hide
*/

	_hidePlugin: function(target) {
		target = $(target);
		// If the target already has the markerClassName class, break
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		// Get the tent instance for the target
		var inst = target.data(this.propertyName);
		// Hide the target and remove the popup background from the DOM
		target.addClass("hidden");
		$(this.popUpBackgroundSelector).remove();
	},
		
/**
* Remove the plugin functionality from a control.
*
* @access private
* @param {element} target - the control to affect
*/

	_destroyPlugin: function(target) {
		target = $(target);
		// If the target already has the markerClassName class, break
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		// Get the tent instance for the target
		var inst = target.data(this.propertyName);
		target.removeClass(this.markerClassName + ' ' +
				this._fullClass + ' ' + this._overflowClass).
			removeData(this.propertyName).
			unbind('.' + this.propertyName);
	}
});

// The list of methods that return values and don't permit chaining
var getters = [];
	
/**
* Determine whether a method is a getter and doesn't permit chaining.
*
* @access private
* @param {string, optional} method - the method to run
* @param {[], optional} otherArgs - any other arguments for the method
* @returns {boolean} true if the method is a getter, false if not
*/

function isNotChained(method, otherArgs) {
	if (method == 'option' && (otherArgs.length == 0 ||
			(otherArgs.length == 1 && typeof otherArgs[0] == 'string'))) {
		return true;
	}
	return $.inArray(method, getters) > -1;
}

/**
* Attach the tent functionality to a jQuery selection.
*
* @access private
* @param {string, optional} method - the method to run
* @param {[], optional} otherArgs - any other arguments for the method
* @returns {jQuery or any} jQuery object for chaining further calls or getter value otherwise
*/

$.fn.tent = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (isNotChained(options, otherArgs)) {
		return plugin['_' + options + 'Plugin'].apply(plugin, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
		if (typeof options == 'string') {
			if (!plugin['_' + options + 'Plugin']) {
				throw 'Unknown method: ' + options;
			}
			plugin['_' + options + 'Plugin'].apply(plugin, [this].concat(otherArgs));
		}
		else {
			plugin._attachPlugin(this, options || {});
		}
	});
};

/* Initialise the max length functionality. */
var plugin = $.tent = new Tent(); // Singleton instance

})(jQuery);
