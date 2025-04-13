let scrollTop, card1, jarakCard1ToTop, batasBawahFeatWork, lebarFeatWork, jarakFeatWorkToTopPage, tinggiWrapperFeatWork;

function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function changeHello() {
	const listWord = ["Hallo!", "您好", "Salve!", "안녕", "Bonjour!", "สวัสดี", "Hallo!", "您好", "Salve!", "안녕", "Bonjour!"];
	const helloTag = document.querySelector(".hello-tag");
	let i = Math.round(scrollTop / 100);
	if (i > listWord.length - 1) {
		i = 0;
	}
	if (scrollTop <= window.innerHeight && helloTag) {
		helloTag.innerHTML = listWord[i];
	}
}

function horizontalScroll() {
	const windowWidth = window.innerWidth;
	lebarFeatWork = document.querySelector(".element-wrapper").scrollWidth;
	jarakFeatWorkToTopPage = document.querySelector(".horizontal-section").offsetTop;
	batasBawahFeatWork = jarakFeatWorkToTopPage + lebarFeatWork - windowWidth;
	tinggiWrapperFeatWork = lebarFeatWork - window.innerHeight;

	document.querySelector(".horizontal-section").style.height = tinggiWrapperFeatWork + "px";

	if (scrollTop >= jarakFeatWorkToTopPage && scrollTop <= batasBawahFeatWork) {
		document.querySelector(".element-wrapper").style.transform = "translateX(-" + (scrollTop - jarakFeatWorkToTopPage) + "px)";
	} else if (scrollTop < jarakFeatWorkToTopPage) {
		document.querySelector(".element-wrapper").style.transform = "translateX(0px)";
	} else if (scrollTop > batasBawahFeatWork) {
		document.querySelector(".element-wrapper").style.transform = "translateX(-" + (batasBawahFeatWork - jarakFeatWorkToTopPage) + "px)";
	}
}

function parallaxCard() {
	card1 = document.querySelector(".card-1");
	const tinggiCard2 = document.querySelector(".card-2").offsetHeight;
	const tinggiAboutMe = document.querySelector(".about-me").offsetHeight;
	jarakCard1ToTop = jarakFeatWorkToTopPage + tinggiWrapperFeatWork + tinggiAboutMe;

	document.querySelector(".scroll-content").style.height = tinggiCard2 + "px";

	var bottomScrenn = scrollTop + window.innerHeight;

	if (bottomScrenn >= jarakCard1ToTop) {
		card1.style.transform = "translateY(-" + (bottomScrenn - jarakCard1ToTop) * 0.3 + "px)";
	}
}

function hoverImage() {
	var aboutSection = document.querySelector(".about-me");
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

	aboutSection.addEventListener("mousemove", function (e) {
		if (i > cars.length - 1) {
			i = 0;
		}
		let circle = document.createElement("span");
		let x = e.offsetX;
		let y = e.offsetY;
		let jarak = aboutSection.offsetTop;
		var element = e.target;
		while (element !== aboutSection) {
			x += element.offsetY;
			y += element.offsetX;
			element = element.parentNode;
		}
		circle.style.left = x + "px";
		circle.style.top = jarak + y + "px";
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
}

function potraitCheck() {
	var desktop = document.querySelector(".wrapper");
	var phone = document.querySelector(".phone");
	if (window.innerWidth < window.innerHeight) {
		desktop.style.display = "none";
		phone.style.display = "flex";
	} else {
		desktop.style.display = "block";
		phone.style.display = "none";
	}
}

window.onresize = function () {
	potraitCheck();
	horizontalScroll();
	parallaxCard();
};

window.onscroll = function () {
	scrollTop = window.pageYOffset;
	changeHello();
	horizontalScroll();
	parallaxCard();
};

function initPage() {
	potraitCheck();
	scrollTop = window.pageYOffset;
	horizontalScroll();
	parallaxCard();
	hoverImage();
	changeHello();
}

window.onload = initPage;
window.onpageshow = initPage;
window.on
