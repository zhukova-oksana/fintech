{
	const butApplication = document.querySelectorAll('.button-application');
	const overlay = document.querySelector('.overlay');
	const modalRegistration = document.querySelector('.modal--registration');
	const modalSuccess = document.querySelector('.modal-success');
	const modalButton = document.querySelector('.modal-success__button');

	const sampleButton = document.querySelectorAll('.sample__image');
	const modalSample = document.querySelector('.modal--sample');

	const licenseButton = document.querySelectorAll('.license__image');
	const modalLicense = document.querySelector('.modal--license');

	sampleButton.forEach(bt => {
		bt.addEventListener('click', () => {
			overlay.classList.add('visible');		
			modalSample.classList.add('visible');		
		});
	});	

	licenseButton.forEach(bt => {
		bt.addEventListener('click', () => {
		overlay.classList.add('visible');		
			modalLicense.classList.add('visible');		
		});
	});

	butApplication.forEach(bt => {
		bt.addEventListener('click', () => {
			overlay.classList.add('visible');
			modalRegistration.classList.add('visible');
		});
	});

	modalRegistration.addEventListener('click', e => {
		const target = e.target;		
    if (target === modalRegistration || target.closest('.modal__close')) {
      modalRegistration.classList.remove('visible');      
    	overlay.classList.remove('visible');
    }
	});
	
	modalSuccess.addEventListener('click', e => {
		const target = e.target;		
    if (target === modalButton || target.closest('.modal__close')) {
      modalSuccess.classList.remove('visible');      
    	overlay.classList.remove('visible');
    }
	});	

	document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modalRegistration.classList.remove('visible');      
			overlay.classList.remove('visible');
			modalSuccess.classList.remove('visible');
			modalSample.classList.remove('visible');
			modalLicense.classList.remove('visible');
    }
	});

	modalSample.addEventListener('click', e => {
		const target = e.target;		
    if (target === modalSample || target.closest('.modal__close')) {
      modalSample.classList.remove('visible');      
    	overlay.classList.remove('visible');
    }
	});	

	modalLicense.addEventListener('click', e => {
		const target = e.target;		
    if (target === modalLicense || target.closest('.modal__close')) {
      modalLicense.classList.remove('visible');      
    	overlay.classList.remove('visible');
    }
	});	
	
	function tab(el) {
		var menu=el.parentNode;
		var tabs=menu.getElementsByTagName('li');
		for (var i=0; i<tabs.length; i++) {
				var tab=tabs[i];
				var content=document.getElementById(tab.id+'_content');
				// Сделать вкладку активной
				if (tab.id==el.id) {
						tab.className='tab__active';
						if (content) {
								content.className='tab__content visible';
						}
				}
				else {
						tab.className='';
						if (content) {
								content.className='tab__content';
						}
				}
		}
	}

	function tab2(el) {
		var menu=el.parentNode;
		var tabs=menu.getElementsByTagName('li');
		for (var i=0; i<tabs.length; i++) {
				var tab=tabs[i];
				var content=document.getElementById(tab.id+'_content');
				// Сделать вкладку активной
				if (tab.id==el.id) {
						tab.className='tab__active';
						if (content) {
								content.className='tab__content visible';
						}
						window.location.hash = tab.id;
						// history.replaceState(null, null, '#' + tab.id);
				}
				else {
						tab.className='';
						if (content) {
								content.className='tab__content';
						}
				}
		}
	}

    function activateTabFromHash() {
        var hash = window.location.hash.substring(1);
        if (hash) {
            var tabElement = document.getElementById(hash);
            if (tabElement && tabElement.onclick) {
                tabElement.onclick();
            }
        }
    }

    // Вызываем функцию при загрузке страницы
    window.addEventListener('DOMContentLoaded', activateTabFromHash);
    // Также вызываем при изменении хэша (если пользователь меняет его вручную)
    window.addEventListener('hashchange', activateTabFromHash);

	$(function () {
		$('.list-product-nav .list-product-cat').click(function (e) {
			e.preventDefault();
			$('.list-product-nav .list-product-subnav').slideUp(), $(this).next().is(":visible") || $(this).next().slideDown(),
				e.stopPropagation();

			const list = document.querySelectorAll('.list > li');

			list.forEach(li => {
				if (li.classList.contains('active')) {
						li.classList.remove('active');
					}				
				const link = li.children[0];				
				link.addEventListener('click', e => {
					const target = e.target;
					target.parentNode.classList.add('active');
				})
			});
		});
	});

	$('.teachers__slider').slick({
		dots: true,
		arrows: true,
		infinite: false,
		speed: 300,
		slidesToShow: 1,
		initialSlide: 1,
		slidesToScroll: 1,		
		centerPadding: '200px',
		centerMode: true,
		variableWidth: true,
		// adaptiveHeight: true,
		appendArrows: $('.teachers__arrow'),
    prevArrow: '<button id="prev" type="button" class="btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 20L7 12L15 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></button>',
    nextArrow: '<button id="next" type="button" class="btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 20L17 12L9 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></button>',
		responsive: [			
			{
				breakpoint: 950,
				settings: {
					centerMode: false,
					centerPadding: '0px',
					variableWidth: false,
				}
			},
			{
				breakpoint: 769,
				settings: {
					centerMode: false,
					centerPadding: '0px',
					variableWidth: false,
					arrows: false,
				}
			}
		]
	});		
	$('.teachers__slider2').slick({
		dots: true,
		arrows: true,
		infinite: false,
		speed: 300,
		slidesToShow: 2,
		initialSlide: 1,
		slidesToScroll: 1,		
		centerPadding: '200px',
		centerMode: true,
		variableWidth: true,
		// adaptiveHeight: true,
		appendArrows: $('.teachers__arrow2'),
    prevArrow: '<button id="prev" type="button" class="btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 20L7 12L15 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></button>',
    nextArrow: '<button id="next" type="button" class="btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 20L17 12L9 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></button>',
		responsive: [			
			{
				breakpoint: 950,
				settings: {
					centerMode: false,
					centerPadding: '0px',
					variableWidth: false,
				}
			},
			{
				breakpoint: 769,
				settings: {
					centerMode: false,
					centerPadding: '0px',
					variableWidth: false,
					arrows: false,
				}
			}
		]
	});	
	
	window.onscroll = function () { scrollFunction() };

		function scrollFunction() {
			if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
				document.getElementById("header").classList.add('header--scroll');
			} else {
				document.getElementById("header").classList.remove('header--scroll');
			}
	}
	
	$('.header__burger').click(function () {
		$(this).toggleClass('open');						
		const panel = document.querySelector('.header__panel');						
		panel.classList.toggle('header__panel_visible');
	});

	$('.header__menu').click(function () {
		const panel = document.querySelector('.header__panel');						
		panel.classList.toggle('header__panel_visible');				
		const burger = document.querySelector('.header__burger');						
		burger.classList.toggle('open');
	});


	$('.will-do__row').slick({
		// infinite: true,
		dots: true,
		arrows: true,
		infinite: false,
		// start: 'center',
		speed: 300,
		slidesToShow: 3,
		initialSlide: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '0',
		appendArrows: $('.will-do__arrow'),
		prevArrow: '<button id="prev" type="button" class="btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 20L7 12L15 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 20L17 12L9 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></button>',
		responsive: [
			{
				breakpoint: 900,
				settings: {
					// centerMode: false,
					centerPadding: '0px',
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 1,
					arrows: false,
				}
			}
		]
	});

	$('.graduates__slider').slick({
		infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrow: true,
    centerMode: true,
    centerPadding: '24px',
    variableWidth: true,
		appendArrows: $('.graduates__arrow'),
		prevArrow: '<button id="prev" type="button" class="btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 20L7 12L15 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 20L17 12L9 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></button>',
		
	});
	
	const hash = window.location.hash;

	if (hash == '#form') {
		overlay.classList.add('visible');
		modalRegistration.classList.add('visible');
	}
}