/*global require, module, console, window*/
'use strict';

var $ = require('./libs/jquery/dist/jquery.min.js');

$(function() {
    // PAralaxx scroll
    var hero = $('#hero-container');
    console.log(hero);
    var hero_logo = $('.hero-logo');

    var navbarTop = $('#white-nav').offset().top;

    $(window).on('scroll', function (e) {
    	var scrollTop = Math.max(0, $(window).scrollTop());
		var backgroundPositionTop = Math.round(scrollTop * 0.5);
		var scale = Math.max(0, 1 - scrollTop / 6000);
		hero.css({
			transform: 'translate3d(0, ' + backgroundPositionTop + 'px, 0)',
			perspective: '1000px',
			backfaceVisibility: 'hidden'
			});	

		var opacity = 1 - (backgroundPositionTop / 400);
		opacity.toFixed(2);
		if (opacity > 1) {
			opacity = 1;
		}

		hero_logo.css({
			transform: 'translate3d(-50%, ' + (backgroundPositionTop * -0.17512) + 'px, 0) scale(' +scale + ', ' + scale + ')',
			perspective: '1000px',
			backfaceVisibility: 'hidden',
			opacity: opacity
		});

		if( $(window).scrollTop() > navbarTop-20 ) {
			$('#white-nav').css({position: 'fixed', top: '20px'});
		} else {
			$('#white-nav').css({position: 'absolute', top: '-40px'});
		}

		var navBarMid = (navbarTop+$('.navbar-bg').height()/2);
		if( $(window).scrollTop() >  navBarMid){
			$('#white-nav').css({display: 'none'});
		} else {
			$('#white-nav').css({display: 'block'});
		}
		var blackOpacity = Math.max(0, Math.min(1, (scrollTop-(navbarTop-20))/20));
		$('#black-nav').css({opacity: blackOpacity});
		var bgOpacity = Math.max(0, Math.min(0.95, (scrollTop-(navbarTop+($('.navbar-bg').height()/2)))/20));
		$('.navbar-bg').css({opacity: bgOpacity});
	});
	$('a[href*=#]:not([href=#])').click(function() {
		var home = ($(this).attr("href")=='#hero-container');
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	        || location.hostname == this.hostname) {
	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	           if (target.length) {
	           	var targetOffset = (home) ? 0 : (target.offset().top-50);
	             $('html,body').animate({
	                 scrollTop: targetOffset
	            }, 1000);
	            return false;
	        }
	    }
	});
});