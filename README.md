jquery.tent
===========

A simple jQuery plugin for creating simple pop-ups simply.

Usage
===========
Set defaults:
$.tent.setDefaults(left: 0, top: 0});

Initialization:
$("#pop-up").tent();

Change options:
$("#pop-up").tent('option', {left: 0, top: 0});

Show the popup:
$("#pop-up").tent('show');

Hide the popup:
$("#pop-up").tent('hide');

Options
===========
left: where to display the left edge of the popup element (pixel)

top: where to display the top edge of the popup element (pixel)

Credits
===========
Thanks to Keith Wood for an awesome jQuery Plugin Tutorial which I shamelessly hacked apart to make this
http://keith-wood.name/pluginFramework.html