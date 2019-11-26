$(document).ready(function(){

	"use strict";

	// Nav Sticky

	$(window).scroll(function(){
		if($(window).scrollTop() > 500 && !$('.mobile-toggle').is(":visible")){
			$('.top-bar').addClass('nav-sticky');
		}else{
			$('.top-bar').removeClass('nav-sticky');
		}
	});

	// Offscreen Nav

	$('.offscreen-toggle').click(function(){
		$('.main-container').toggleClass('reveal-nav');
		$('.offscreen-container').toggleClass('reveal-nav');
		$('.offscreen-menu .container').toggleClass('reveal-nav');
	});

	$('.main-container').click(function(){
		if($(this).hasClass('reveal-nav')){
			$('.main-container').toggleClass('reveal-nav');
			$('.offscreen-container').toggleClass('reveal-nav');
			$('.offscreen-menu .container').toggleClass('reveal-nav');
		}
	});

	// Detect logo dimensions and add correct class

	var logoImage = $('.top-bar .logo:first-of-type');

	var theImage = new Image();
	theImage.src = logoImage.attr("src");

	var logoWidth = theImage.width;
	var logoHeight = theImage.height;
	var logoRatio = logoWidth / logoHeight;

	if(logoRatio > 2.8){
		$('.top-bar .logo').addClass('logo-wide');
	}

	if(logoRatio < 2){
		$('.top-bar .logo').addClass('logo-square');
	}

	// Smooth scroll

	$('.inner-link').smoothScroll({offset: -96, speed: 800});

	// Mobile Toggle

	$('.mobile-toggle').click(function(){
		$('nav').toggleClass('open-nav');
	});

	// Fullscreen nav toggle

	$('.fullscreen-nav-toggle').click(function(){
		if(!$('.fullscreen-nav-container').hasClass('show-fullscreen-nav')){
			$('.fullscreen-nav-container').addClass('show-fullscreen-nav');
			setTimeout(function(){
				$('.fullscreen-nav-container').addClass('fade-fullscreen-nav');
			},100);
			$(this).addClass('toggle-icon');
		}else{
			$(this).removeClass('toggle-icon');
				$('.fullscreen-nav-container').removeClass('fade-fullscreen-nav');
			setTimeout(function(){

				$('.fullscreen-nav-container').removeClass('show-fullscreen-nav');
			},500);
		}
	});

	$('.fullscreen-nav-container .menu li a').click(function(){
		$('.fullscreen-nav-toggle').removeClass('toggle-icon');
			$('.fullscreen-nav-container').removeClass('fade-fullscreen-nav');
		setTimeout(function(){
			$('.fullscreen-nav-container').removeClass('show-fullscreen-nav');
		},500);
	});

	// Margin first section for top bar

	if(!$('nav').hasClass('overlay-bar') && !$('nav').hasClass('contained-bar')){
		$('.main-container').first().css('margin-top', $('nav').outerHeight());
	}

	$(window).resize(function(){
		if(!$('nav').hasClass('overlay-bar') && !$('nav').hasClass('contained-bar')){
			$('.main-container').first().css('margin-top', $('nav').outerHeight());
		}
	});

	// Pad first section for overlay bar

	if($('nav').hasClass('overlay-bar') || $('nav').hasClass('contained-bar') ){
		var currentPad = parseInt($('.main-container').find(':first-child').css('padding-top'));
		var newPad = currentPad + $('nav').outerHeight() - 48;
		if(currentPad > 0){
			$('.main-container').children(':first').css('padding-top', newPad);
		}else if($('.main-container').find(':first').hasClass('hero-slider')){
			var height = parseInt($('.hero-slider .slides li:first-child').outerHeight());
			var newHeight = height + $('nav').outerHeight();
			$('.hero-slider .slides li').css('height', newHeight);
		}
	}


	// Fullwidth Subnavs

	// Position Fullwidth Subnavs fullwidth correctly

    $('.subnav-fullwidth').each(function () {
        $(this).css('width', $('.container').width());
        var offset = $(this).closest('.has-dropdown').offset();
        offset = offset.left;
        var containerOffset = $(window).width() - $('.container').outerWidth();
        containerOffset = containerOffset /2;
        offset = offset - containerOffset - 15;
        $(this).css('left', -offset);
    });

    $(window).resize(function () {
        $('.subnav-fullwidth').each(function () {
            $(this).css('width', $('.container').width());
			var offset = $(this).closest('.has-dropdown').offset();
			offset = offset.left;
			var containerOffset = $(window).width() - $('.container').outerWidth();
			containerOffset = containerOffset /2;
			offset = offset - containerOffset - 15;
			$(this).css('left', -offset);
        });
    });


	// Scroll Reveal

	if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
       window.scrollReveal = new scrollReveal();
    }else{
    	$('body').addClass('pointer');
    }

	// Slider Initializations

	$('.hero-slider').flexslider({});
	$('.image-slider').flexslider({ animation: "slide"});
	$('.testimonials-slider').flexslider({ directionNav: false });

	// Slide Sizes

	$('.slider-fullscreen .slides li').each(function(){
		$(this).css('height', $(window).height());
	});

	$('.fullscreen-element').each(function(){
		$(this).css('height', $(window).height());
	});


	// Feature Selector

	$('.selector-tabs li').click(function(){
		$(this).parent('.selector-tabs').children('li').removeClass('active');
		$(this).addClass('active');

		var activeTab = $(this).index() + 1;

		$(this).closest('.feature-selector').find('.selector-content').children('li').removeClass('active');
		$(this).closest('.feature-selector').find('.selector-content').children('li:nth-child('+activeTab+')').addClass('active');
	});

	// Append .background-image-holder <img>'s as CSS backgrounds

	$('.background-image-holder').each(function(){
		var imgSrc= $(this).children('img').attr('src');
		$(this).css('background', 'url("' + imgSrc + '")');
    	$(this).children('img').hide();
        $(this).css('background-position', '50% 0%');
	});

	// Accordion

	$('.accordion li').click(function(){
		$(this).parent('.accordion').children('li').removeClass('active');
		$(this).addClass('active');
	});

	/************** Parallax Scripts **************/

    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    var isChrome = !!window.chrome;
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var prefix;

    if (isFirefox) {
        prefix = '-moz-';
    } else if (isIE) {

    } else if (isChrome || isSafari) {
        prefix = '-webkit-';
    }

    $('.main-container section:first-child').addClass('first-child');

    $('.parallax-background').each(function () {

        if ($(this).closest('section').hasClass('first-child') && !$(this).closest('section').hasClass('slider-fullscreen')) {
            $(this).attr('data-top', prefix + 'transform: translate3d(0px,0px, 0px)');
            $(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,200px, 0px)');

        } else {

            $(this).attr('data-bottom-top', prefix + 'transform: translate3d(0px,-100px, 0px)');
            $(this).attr('data-center', prefix + 'transform: translate3d(0px,0px, 0px)');
            $(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,100px, 0px)');

        }

    });

    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        skrollr.init({
            forceHeight: false
        });

        // Multi Layer Parallax

		$('.hover-background').each(function(){
			$(this).mousemove(function( event ) {
				$(this).find('.background-image-holder').css('transform', 'translate(' + -event.pageX /30 + 'px,' + -event.pageY /45+ 'px)');
				$(this).find('.layer-1').css('transform', 'translate(' + -event.pageX /50 + 'px,' + -event.pageY /50+ 'px)');
				$(this).find('.layer-2').css('transform', 'translate(' + -event.pageX /60 + 'px,' + -event.pageY /60+ 'px)');
			});
		});
    }

    // Map Holder Overlay

	$('.map-holder').click(function(){
		$(this).addClass('on');
	});

	$(window).scroll(function(){
		if($('.map-holder').hasClass('on')){
			$('.map-holder').removeClass('on');
		}
	});

	// Map Details Holder

	$('.details-holder').each(function(){
		$(this).css('height', $(this).width());
	});

	$('.details-holder').mouseenter(function(){
		$(this).closest('.map-overlay').addClass('fade-overlay');
	}).mouseleave(function(){$(this).closest('.map-overlay').removeClass('fade-overlay');});

	// Countdown

	$('.countdown').each(function(){
		$(this).countdown({until: new Date($(this).attr('data-date'))});
	});

    // Twitter Feed
       jQuery('#tweets').each(function(index) {
       }).each(function(index) {

           var TweetConfig = {
               "id": jQuery('#tweets').attr('data-widget-id'),
               "domId": '',
               "maxTweets": 5,
               "enableLinks": true,
               "showUser": false,
               "showTime": false,
               "dateFunction": '',
               "showRetweet": false,
               "customCallback": handleTweets
           };
           function handleTweets(tweets) {
               var x = tweets.length;
               var n = 0;
               var element = document.getElementById('tweets');
               var html = '<ul class="slides">';
               while (n < x) {
                   html += '<li>' + tweets[n] + '</li>';
                   n++;
               }
               html += '</ul>';
               element.innerHTML = html;
               return html;
           }
           twitterFetcher.fetch(TweetConfig);
       });

    // Contact form code

    $('form.email-form').submit(function (e) {
		// return false so form submits through jQuery rather than reloading page.
		if(e.preventDefault) e.preventDefault();
		else e.returnValue = false;

		var thisForm 		= $(this).closest('.email-form'),
			error 			= 0,
			originalError 	= thisForm.attr('original-error'),
			loadingSpinner;

		if (typeof originalError !== typeof undefined && originalError !== false) {
			thisForm.find('.form-error').text(originalError);
		}


		$(thisForm).find('.validate-required').each(function(){
			if($(this).val() === ''){
				$(this).addClass('field-error');
				error = 1;
			}else{
				$(this).removeClass('field-error');
			}
		});

		$(thisForm).find('.validate-email').each(function(){
			if(!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))){
				$(this).addClass('field-error');
				error = 1;
			}else{
				$(this).removeClass('field-error');
			}
		});


        if (error === 1){
            $(this).closest('.email-form').find('.form-error').fadeIn(200);
        }else {
			// Hide the error if one was shown
			$(this).closest('.email-form').find('.form-error').fadeOut(200);
			// Create a new loading spinner while hiding the submit button.
			loadingSpinner = $('<div />').addClass('form-loading').insertAfter($(thisForm).find('input[type="submit"]'));
			$(thisForm).find('input[type="submit"]').hide();

            jQuery.ajax({
                type: "POST",
                url: "mail/mail.php",
                data: thisForm.serialize(),
                success: function (response) {
                	// Swiftmailer always sends back a number representing numner of emails sent.
					// If this is numeric (not Swift Mailer error text) AND greater than 0 then show success message.
					$(thisForm).find('.form-loading').remove();
					$(thisForm).find('input[type="submit"]').show();
					if($.isNumeric(response)){
						if(parseInt(response) > 0){
							thisForm.find('.form-success').fadeIn(1000);
							thisForm.find('.form-error').fadeOut(1000);
							setTimeout(function(){ thisForm.find('.form-success').fadeOut(500); }, 5000);
						}
					}
					// If error text was returned, put the text in the .form-error div and show it.
					else{
						// Keep the current error text in a data attribute on the form
						thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
						// Show the error with the returned error text.
						thisForm.find('.form-error').text(response).fadeIn(1000);
						thisForm.find('.form-success').fadeOut(1000);
					}
                },
                error: function (errorObject, errorText, errorHTTP) {
                	// Keep the current error text in a data attribute on the form
					thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
					// Show the error with the returned error text.
					thisForm.find('.form-error').text(errorHTTP).fadeIn(1000);
					thisForm.find('.form-success').fadeOut(1000);
                	$(thisForm).find('.form-loading').remove();
					$(thisForm).find('input[type="submit"]').show();
                }
            });
        }
		return false;
    });


	// Expanding Lists (updated in Pivot 1.4.0)

	$('.expanding-ul li').click(function(){
		$('.expanding-ul li').removeClass('active');
		$(this).addClass('active');
	});

});

$(window).load(function(){

  "use strict";


	// Align Elements Vertically

	alignVertical();
	alignBottom();

	$(window).resize(function(){
		alignVertical();
		alignBottom();
	});

	// Isotope Projects

	$('.projects-container').isotope({
	  itemSelector: '.project',
	  layoutMode: 'fitRows'
	});

	$('.filters li').click(function() {
	  var current = $(this);

	  current.siblings('li').removeClass('active');
	  current.addClass('active');

	  var filterValue = current.attr('data-filter');
	  var container = current.closest('.projects-wrapper').find('.projects-container');
	  container.isotope({ filter: filterValue });
	});

	// Isotope contained feature boxes

	$('.contained-features-wrapper').isotope({
	  itemSelector: '.no-pad',
	  layoutMode: 'masonry',
	  masonry: {
		  gutter: 0
		}
	});

	// Instagram Feed

	if($('.instafeed').length){
		jQuery.fn.spectragram.accessData = {
			accessToken: '1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b',
			clientID: 'fedaafacf224447e8aef74872d3820a1'
		};

		$('.instafeed').each(function () {
			$(this).children('ul').spectragram('getUserFeed', {
				query: $(this).attr('data-user-name')
			});

		});

	}

    if($('#tweets').length){
    	$('#tweets').flexslider({ directionNav: false, controlNav: false });
    }

    // Remove Loader

    $('.loader').css('opacity', 0);
    setTimeout(function(){$('.loader').hide();}, 600);

	// Mailchimp/Campaign Monitor Mail List Form Scripts
	$('form.mail-list-signup').on('submit', function(){

		var iFrame = $(this).closest('section, header').find('iframe.mail-list-form'),
		thisForm 		= $(this).closest('.mail-list-signup'),
		userEmail 		= $(this).find('.signup-email-field').val(),
		userFullName 	= $(this).find('.signup-name-field').val(),
		userFirstName 	= $(this).find('.signup-first-name-field').val(),
		userLastName 	= $(this).find('.signup-last-name-field').val(),
		error			= 0;

		$(thisForm).find('.validate-required').each(function(){
			if($(this).val() === ''){
				$(this).addClass('field-error');
				error = 1;
			}
			else{
				$(this).removeClass('field-error');
			}
		});

		$(thisForm).find('.validate-email').each(function(){
			if(!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))){
				$(this).addClass('field-error');
				error = 1;
			}
			else{
				$(this).removeClass('field-error');
			}
		});

		if(error === 0){
			iFrame.contents().find('#mce-EMAIL, #fieldEmail').val(userEmail);
			iFrame.contents().find('#mce-LNAME, #fieldLastName').val(userLastName);
			iFrame.contents().find('#mce-FNAME, #fieldFirstName').val(userFirstName);
			iFrame.contents().find('#mce-FNAME, #fieldName').val(userFullName);
			iFrame.contents().find('form').attr('target', '_blank').submit();
		}
		return false;
	});

	// Blog Masonry

	$('.blog-masonry-container').isotope({
	  itemSelector: '.blog-masonry-item',
	  layoutMode: 'masonry'
	});

	$('.blog-filters li').click(function() {
	  var current = $(this);

	  current.siblings('li').removeClass('active');
	  current.addClass('active');

	  var filterValue = current.attr('data-filter');
	  var container = current.closest('.blog-masonry').find('.blog-masonry-container');
	  container.isotope({ filter: filterValue });
	});

    var talks = {
        'keynote': {
            title: 'Keynote',
            descriptionParagraphs: [
                ''
            ],
            speakers: [{
                name: 'Iftach Ian Amit',
                bioParagraphs: [
                    'Iftach (Ian) Amit, has over 20 years of experience in hands-on and strategic roles, working across diverse security fields: business, industry, marketing, technical and research. Ian is the Chief Security Officer at Cimpress, the world leader in mass customization. Previously, Ian held senior leadership roles at Amazon, ZeroFOX and IOActive. His career also includes time at Security-Art, Aladdin, Finjan, and Datavantage, as well as speaking at conferences such as BlackHat, DefCon, various BSides, and RSA. He founded the Tel-Aviv DefCon chapter (DC9723) and also was a founding member of the Penetration Testing Execution Standard (PTES). Ian studied Computer Science and Business Administration at the Herzliya Interdisciplinary Center and lives in Manhattan.'
                ]
            }]
        },
        'pentesting-chatops': {
            title: 'Pentesting ChatOps',
            descriptionParagraphs: [
                'ChatOps, a concept originating from Github, is chatroom-driven DevOps for  distributed teams, using chatbots (like Hubot) to execute custom scripts and plugins.',
                'We have applied the concept of ChatOps to the penetration testing workflow, and found that it fits outstandingly – for everything from routine scanning to spearphishing to pentest gamification.',
                'This talk discusses the tools that we use (RocketChat, Hubot, Gitlab, pentesting tools), and provides battle stories of using Pentesting ChatOps in practice.'
            ],
            speakers: [{
                name: 'Dr. Melanie Rieback',
                bioParagraphs: [
                    'Dr. Melanie Rieback is the CEO/Co-founder of Radically Open Security, the world’s first non-profit computer security consultancy company. She is also a former Assistant Professor of Computer Science at VU who performed RFID security research (RFID Virus and RFID Guardian), that attracted worldwide press coverage, and won several awards (VU Mediakomeet, ISOC Award, NWO I/O award, IEEE Percom Best Paper, USENIX Lisa Best Paper).',
                    'Melanie worked as a Senior Engineering Manager on XenClient at Citrix, where she led their Vancouver office. She was also the head researcher in the CSIRT at ING Bank, where she spearheaded their Analysis Lab and the ING Core Threat Intelligence Project.',
                    'For fun, she co-founded the Dutch Girl Geek Dinner in 2008. Melanie was named 2010 ICT Professional of the Year (Finalist) by WomeninIT, one of the 400 most successful women in the Netherlands by Viva Magazine (Viva400) in 2010 and 2017, one of the fifty most inspiring women in tech (Inspiring Fifty Netherlands) in 2016 and 2017, and the Most Innovative IT Leader by CIO Magazine NL (TIM Award) in 2017.',
                    'Her company, Radically Open Security was also named the 50th Most Innovative SME by the Dutch Chamber of Commerce (MKB Innovatie Top 100) in 2016.'
                ]
            }]
        },
        'scaling-threat-models': {
            title: 'Scaling threat models... by playing cards!? A case study',
            descriptionParagraphs: [
                'You might’ve heard about Threat Modeling - you know, the thing everyone is saying you should be doing, but you aren’t? I’ve actually started company-wide Threat Modeling effort a while ago, and I was surprised by quite a lot of things. So today I want to share with you why I’m very committed to Threat Modeling anyway, how we’ve built the internal Thread Modeling process using OWASP Cornucopia (and/or MSFT Elevation of Privilege), and all the lessons we’ve learned so far.'
            ],
            speakers: [{
                name: 'Mateusz Niezabitowski',
                bioParagraphs: [
                    'Former Java/Fullstack Developer, who decided that making things is fun, but breaking them even more so.  Currently working as Application Security Engineer at Ocado Technology. Mostly interested in WebApp security, cryptography, secure software development life-cycle, and human factors of security.'
                ]
            }]
        },
        'securing-docker': {
            title: 'Securing the Docker Containers at CI/CD pipeline level',
            descriptionParagraphs: [
                'Breaking down the large monolith application into microservices that run in Docker containers is all well and good, but there’s another challenge: keeping those containers secure. In this session we present practical methods to secure Docker containers at the continuous integration/continous deployment pipeline level, and also describe methods that apply equally well on standalone containers.',
                'The talk covers standalone techniques to secure Docker containers and methods to check the security health of a Docker container at the CI/CD pipeline level, every time the microservice is built after a code change.',
                'First we discuss periodically scanning the base Docker images that are used by the microservices. We note the importance of patching system packages as soon as a major vulnerability was found.',
                'Then we introduce a common setup: a platform as a service (PaaS) where the microservices are run in Docker containers and a CI/CD tool. The examples use PaaSTA, Yelp’s open source PaaS (see github repo) and Jenkins, but the approach can be used with any container or CI solution.',
                'When a microservice is built after a change in the code base, the build and deployment platform goes through a series of steps before deciding to push the code to other environments (stage, production). Typically these steps include running the unit and integration suite of tests, and maybe some performance tests. But what if we have an additional step that checks the security of the Docker container?',
                'Here we introduce checks that test the security health of the container including:',
                '- having the latest system and code related packages up to date',
                '- following the principle of the least privilege',
                '- following Docker best practices',
                '- no unencrypted secrets in the codebase',
                'Lastly, we outline the importance of having such tests run every time the microservice is built. We discuss how doing so helps the team that owns the service become more aware of the security of their microservices and empowers them to remediate classes of security problems with minimal fuss.'
            ],
            speakers: [{
                name: 'Alina Radu',
                bioParagraphs: [
                    'Alina is a Security Engineer at Yelp London where she contributes to building secure infrastructure. She is currently leading the data security effort that aims to keep Yelp’s customer data safe from any external and internal malicious activity. Outside work Alina loves travelling, playing tennis and enjoys listening to classical music.'
                ]
            }]
        },
        'cloud-security': {
            title: 'Cloud Security: Monitoring and Alerting',
            descriptionParagraphs: [
                'Migrating to the cloud can offer incredible benefits but raises a lot of questions regarding security: from understanding the shared model, to how to best monitor and respond to security incidents. The solution to this is to know the environment, the services it provides and the tools available.',
                'During this session we will focus on Google Cloud Platform and share the experience gained at King while migrating several loads to its services. We will demonstrate that we have rich sources to monitor, that help us have security visibility, control and automation. We will go over all the log sources and telemetry offered by GCP, covering access to data, user actions and network activity.',
                'To demonstrate the visibility and monitoring capabilities, we will analyse common use cases that create concern in relation to the cloud: uncontrolled public bucket storages and exfiltration. For each case we will see what logs and data we need to detect them, what alerts they leverage and how to investigate the root cause of the events.'
            ],
            speakers: [{
                name: 'Diana Kramer',
                bioParagraphs: [
                    'Diana Kramer is currently working as Senior Security Engineer at King and has a background in network security and security monitoring. She is an engineer that enjoys understanding how things work and applies this to her everyday work. In her free time, she likes to play videogames and mentor fellow gamers into tech careers.'
                ]
            }]
        },
        'half-life': {
            title: 'Half-Life: Lambda Security',
            descriptionParagraphs: [
                'Half-Life is an AWS Lambda auditing tool designed to create asset visibility and provide actionable results. It provides a meaningful overview in terms of statistical analysis, AWS service dependencies and configuration checks from the security perspective.'
            ],
            speakers: [{
                name: 'Artëm Tsvetkov',
                bioParagraphs: [
                    'Security Engineer at Skyscanner.'
                ]
            }]
        },
        'selling-formbook': {
            title: 'Selling Formbook',
            descriptionParagraphs: [
                'Formbook is a Malware developed in C / ASM and created around of 2016. His main task is the theft of personal information from computers accessing the data saved by various web browsers and messaging applications.',
                'Sold in underground forks along with a panel made in PHP, this sample has seen an increase in activity in 2018. Moreover,  this is a very peculiar malware which shows an important technical disparity. This means that part of the sample and the panel have a much higher technical level in comparison with the rest of functionalities.',
                'The presentation will aim to cover two of the most important areas of the investigation; The malware shows in itself, and the actor(s) responsible for the development. Regarding the first part of the presentation, we will expose the basic functionalities of the sample, as well as the interaction with the panel of control, the encryption of the communication, and its distribution taking advantage of several exploits (CVE-2017-0199, CVE- 2017-8570, CVE-2017-11882) has spam mail spans.',
                'The second part of the presentation will show the results of the investigation achieved about the actor responsible for the development, the marketing as a service (Malware as a Service, the use  of the sample that it has given during this last year.'
            ],
            speakers: [{
                name: 'Borja Rodriguez',
                bioParagraphs: [
                    'Borja Rodriguez has been part of Blueliv for the last four years, where he works as a security analyst, mainly doing  Threat Intelligence research (focused on global actors). He previously was part of Blueliv in the Pententing team performing security reviews, focusing on web applications, IoT and mobile applications. ',
                    'He has collaborated in different Blueliv publications, such as those related to ARS, OnlinerSpambot, and now Formbook. In addition, he is one of the main experts of Blueliv focused on the search of information in the Dark Web and Underground forums.'
                ]
            }, {
                name: 'Victor Acin',
                bioParagraphs: [
                    'Victor Acin has been working for Blueliv for five years. He is Team lead within the Threat Intelligence team, performing tasks related to the generation of Threat Intelligence (mainly reverse engineering of malicious samples and research of global actors).',
                    'He is also in charge of the development of internal products, such as the malware analysis sandbox. He has participated in various Blueliv publications, such as: Dridex, Vawtrak, Necurs, ARS, OnlinerSpambot, and now Formbook.',
                    'He previously has worked as an ethical hacker, performing penetration tests against web applications, external and internal infrastructure, and mobile devices. Victor regularly participate  to conferences as speaker such as STHack and Botconf.'
                ]
            }]
        },
        'offensive-wfuzz': {
            title: 'Offensive wfuzz for web bug hunters',
            descriptionParagraphs: [
                'White hat penetration testers have limited time and resources to assess an entire web application, whereas attackers have unlimited time and only need a single vulnerability. On the other hand, as web application bug hunting gained in popularity and maturity, researchers have turned to more creative methods for exploiting web applications.',
                'Adding to the traditional vulnerability landscape there is a hidden attack-surface that needs the use esoteric requests to attack these systems. What this means for someone testing web applications is that flexibility is the key to success.',
                'There will be times when the standard tool kits are not effective for a testing situation. This success often comes with writing ad-hoc scripts, tests and need better ways to perform analysis at scale.',
                'This talk will discuss how web application penetration testers and bug hunters can improve the efficiency and comprehensiveness of their white box testing using Wfuzz suite.'
            ],
            speakers: [{
                name: 'Xavi Mendez',
                bioParagraphs: [
                    'I am Xavi Mendez, principal security engineering at Skyscanner, leading a team that builds security in our DevOps pipeline and infrastructure. Before that, I worked as a security researcher in the Blackberry security research team.'
                ]
            }]
        },
        'best-trojan': {
            title: 'Introduction to Parasitic Computing with BrainSlug',
            descriptionParagraphs: [
                'BrainSlug is the first of its kind; a parasite computation framework that can control remote systems without code deployment.',
                'Traditional administration software use a resident program known as "agent" to perform their job. But we are trying to reduce the "agent" to a minimum, using already-available environment tools such as Bash, PowerShell or Javascript.'
            ],
            speakers: [{
                name: 'Roberto Abdelkader Martínez Pérez',
                bioParagraphs: [
                    'Breaking WiFis since 2006 :) Pragmatic and inventive problem-solver (and sometimes source). A wannabe polymath with a preference for computer languages.'
                ]
            }]
        },
        'android-malware': {
            title: 'Android Malware Adventures: Analyzing Samples and Breaking into C&Cs',
            descriptionParagraphs: [
                'Android malware is evolving every day and they are everywhere, even in Google Play Store. Malware developers have found ways to bypass Google’s Bouncer as well as antivirus solutions and many alternative techniques to operate like Windows malware do. Using benign looking application working as a dropper is just one of them. This talk is about android malware on Google Play Store and targeting Turkey such as Red Alert, Exobot and Anubis etc. The talk will cover:',
                'Techniques to Analyze Samples: Unencrypted samples are often used to retrieve personal informations to sell and do not have obfuscation. Encrypted samples however are used for much sophisticated tasks like stealing banking information. They decrypt themselves by getting the key from a twitter account who owned by the malware developer and operate by communicating with the C&C. Also, most banking samples are using techniques like screen injection and dependency injection which is mostly used by android application developers.',
                'Bypassing Anti-* Techniques: To be able to dynamically analyze the sample, defeating anti-* techniques are often needed. We will introduce some (known) Frida scripts to be able to defeat common anti-* checks malware uses.',
                'Extracting IoCs: Extracting twitter account as well as C&C from encrypted samples are often critical to perform threat intelligence over samples. Extracting IoCs while assets are still active was crucial for our research since we are also aiming to takeover C&Cs. We will introduce (known) automatization technique to extract twitter account, decryption key and C&C address.',
                'Extract Stolen Information from C&Cs: In order to extract information from C&C, one should act swiftly. The speed of extraction process is critical since the actors change C&Cs often. We will give a detailed walkthrough about how we approach C&Cs as a target and extract the informations.',
                'The samples and informations in the talk is the product of our researches over many bankbot — such as Anubis, Red Alert and Exobot — samples as well as other Turkish malware developer actors’ samples. All IoCs in this talk was shared with the relevant third parties and is now inactive.'
            ],
            speakers: [{
                name: 'Kürşat Oğuzhan Akıncı',
                bioParagraphs: [
                    'Kürşat Oğuzhan Akıncı is a Penetration Tester at STM Defence and a Lecturer at TOBB University of Economics and Technology. He is also a team leader of Blackbox Cyber Security which is Turkey’s first cyber security volunteer group, coordinator and mentor of Turkcell CyberCamp and Turkish Airlines CyberTakeOff. In his free time Kürşat is performing security researches in the form of bug bounty in which he has found several vulnerabilities in critical institutions such as NSA as well as helping Mert Can to break into C&Cs.'
                ]
            }, {
                name: 'Mert Can Coşkuner',
                bioParagraphs: [
                    'Mert Can Coşkuner is a Mobile Malware Analyst at STM Defence. He is drafting mobile malware analysis reports for STM Defence. He is also maintaining a Penetration Testing and Malware Analysis blog at medium.com/@mcoskuner. In his free time Mert Can is performing mobile malware research and threat intelligence.'
                ]
            }]
        }
    };

    // Talks Details
    $('.talk-info button').on('click', function(e) {
        showTalkDetails(e.target.dataset.talkId);
    });

    function showTalkDetails(talkId) {
        if (!talks[talkId]) {
            return;
        }

        var $talkDetails = $('#talk-details');
        var $modalTitle = $talkDetails.find('.modal-title');
        var $modalBody = $talkDetails.find('.modal-body');
        var $modalFooter = $talkDetails.find('.modal-footer');

        $modalTitle.html(talks[talkId].title);

        $modalBody.html('');
        talks[talkId].descriptionParagraphs.forEach(function(paragraph) {
            $modalBody.append('<p>' + paragraph + '</p>');
        });

        $modalFooter.html('');

        talks[talkId].speakers.forEach(function(speaker) {
            $modalFooter.append('<p class="speaker-name">' + speaker.name  + '</p>');
            speaker.bioParagraphs.forEach(function(paragraph) {
                $modalFooter.append('<p>' + paragraph + '</p>');
            });
        });

        $('#talk-details').modal('show');
    }
});

function handleTweets(tweets){
          var x = tweets.length;
          var n = 0;
          var element = document.getElementById('tweets');
          var html = '<ul class="slides">';
          while(n < x) {
            html += '<li>' + tweets[n] + '</li>';
            n++;
          }
          html += '</ul>';
          element.innerHTML = html;
    }

function alignVertical(){

		$('.align-vertical').each(function(){
			var that = $(this);
			var height = that.height();
			var parentHeight = that.parent().height();
			var padAmount = (parentHeight / 2) - (height/2);
			that.css('padding-top', padAmount);
		});

}

function alignBottom(){
	$('.align-bottom').each(function(){
		var that = $(this);
		var height = that.height();
		var parentHeight = that.parent().height();
		var padAmount = (parentHeight) - (height) - 32;
		that.css('padding-top', padAmount);
	});
}

// Youtube Background Handling

function onYouTubeIframeAPIReady() {
	$(window).load(function(){
		$('.youtube-bg-iframe').each(function(index){
			$(this).attr('id', 'yt-'+index);
			var player = new YT.Player($(this).attr('id'), {
				events: {
				'onReady': function(){
					player.mute();
					player.playVideo();
				},
				'onStateChange': function(newState){
					player.playVideo();
				}
			}
			});
		});
	});
}
