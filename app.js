let card1, card2Leng, jarakCard1ToTop, batasBawahFeatWork, editLength, lebarFeatWork, jarakFeatWorkToTopPage;

function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function getPixelValue() {
	const windowWidth = window.innerWidth;
	lebarFeatWork = document.querySelector('.element-wrapper').scrollWidth;
	jarakFeatWorkToTopPage = document.querySelector('.horizontal-section').offsetTop;
	batasBawahFeatWork = jarakFeatWorkToTopPage + lebarFeatWork - windowWidth;
	tinggiWrapperFeatWork = lebarFeatWork - window.innerHeight;

	card1 = document.querySelector('.card-1');
	tinggiCard2 = document.querySelector('.card-2').offsetHeight;

	tinggiAboutMe = document.querySelector('.about-me').offsetHeight;

	jarakCard1ToTop = jarakFeatWorkToTopPage + tinggiWrapperFeatWork + tinggiAboutMe;
	batasBawahCard2 = jarakCard1ToTop + tinggiCard2;
}

window.onresize = function () {
	getPixelValue();
	rezise();
};

function rezise() {
	document.querySelector('.horizontal-section').style.height = tinggiWrapperFeatWork + 'px';
	document.querySelector('.scroll-content').style.height = tinggiCard2 + 'px';

	window.onscroll = function () {
		var scrollTop = window.pageYOffset;
		var bottomScrenn = scrollTop + window.innerHeight;
		if (scrollTop >= jarakFeatWorkToTopPage && scrollTop <= batasBawahFeatWork) {
			document.querySelector('.element-wrapper').style.transform = 'translateX(-' + (scrollTop - jarakFeatWorkToTopPage) + 'px)';
		}

		if (bottomScrenn >= jarakCard1ToTop && scrollTop <= batasBawahCard2) {
			card1.style.transform = 'translateY(-' + (bottomScrenn - jarakCard1ToTop) * 0.3 + 'px)';
		}
	};
}

$(window).on('load', function () {
	getPixelValue();
	rezise();
	var aboutSection = document.querySelector('.about-me');
	let spacer = 0;
	let spacerUP = 0;
	let i = 0;
	const cars = [
		"url('assets/bayu-aditya-triwibowo-1.jpg')",
		"url('assets/bayu-aditya-triwibowo-2.jpg')",
		"url('assets/bayu-aditya-triwibowo-3.jpg')",
		"url('assets/bayu-aditya-triwibowo-4.jpg')",
		"url('assets/bayu-aditya-triwibowo-5.jpg')",
		"url('assets/bayu-aditya-triwibowo-6.jpg')",
	];

	aboutSection.addEventListener('mousemove', function (e) {
		if (i > cars.length - 1) {
			i = 0;
		}
		let circle = document.createElement('span');
		let x = e.offsetX;
		let y = e.offsetY;
		let jarak = aboutSection.offsetTop;
		var element = e.target;
		while (element !== aboutSection) {
			x += element.offsetY;
			y += element.offsetX;
			element = element.parentNode;
		}
		circle.style.left = x + 'px';
		circle.style.top = jarak + y + 'px';
		let size = Math.random() * 100;
		circle.style.backgroundImage = cars[i];
		if (
			x >= spacer + convertRemToPixels(33) ||
			x <= spacer - convertRemToPixels(33) ||
			y >= spacerUP + convertRemToPixels(25) ||
			y <= spacerUP - convertRemToPixels(25)
		) {
			spacer = 0;
			spacerUP = 0;
			aboutSection.appendChild(circle);
			spacer += x;
			spacerUP += y;
			i++;
		}
		setTimeout(function () {
			circle.remove();
		}, 1800);
	});
	AOS.init({ duration: 1200 });
});
