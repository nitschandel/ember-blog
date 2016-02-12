/*global Showdown:false*/
/*global Handlebars:false*/
import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(markdown) {
	var showdown = new Showdown.converter();
	return new Ember.Handlebars.SafeString(showdown.makeHtml(markdown));
});