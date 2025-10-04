import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// GSAP Animations
export function initGSAPAnimations() {
	// Fade Up
	gsap.utils.toArray(".gsap-fade-up").forEach((el, i) => {
		gsap.fromTo(
			el,
			{ opacity: 0, y: 60 },
			{
				opacity: 1,
				y: 0,
				duration: 1.2,
				delay: i * 0.2 + 0.2,
				ease: "power2.out",
				scrollTrigger: {
					trigger: el,
					start: "top 90%",
					toggleActions: "play none none none",
				},
			}
		);
	});
	// Fade Down
	gsap.utils.toArray(".gsap-fade-down").forEach((el, i) => {
		gsap.fromTo(
			el,
			{ opacity: 0, y: -60 },
			{
				opacity: 1,
				y: 0,
				duration: 1.2,
				delay: i * 0.2 + 0.2,
				ease: "power2.out",
				scrollTrigger: {
					trigger: el,
					start: "top 90%",
					toggleActions: "play none none none",
				},
			}
		);
	});
	// Fade Left
	gsap.utils.toArray(".gsap-fade-left").forEach((el, i) => {
		gsap.fromTo(
			el,
			{ opacity: 0, x: -60 },
			{
				opacity: 1,
				x: 0,
				duration: 1.2,
				delay: i * 0.2 + 0.2,
				ease: "power2.out",
				scrollTrigger: {
					trigger: el,
					start: "top 90%",
					toggleActions: "play none none none",
				},
			}
		);
	});
	// Fade Right
	gsap.utils.toArray(".gsap-fade-right").forEach((el, i) => {
		gsap.fromTo(
			el,
			{ opacity: 0, x: 60 },
			{
				opacity: 1,
				x: 0,
				duration: 1.2,
				delay: i * 0.2 + 0.2,
				ease: "power2.out",
				scrollTrigger: {
					trigger: el,
					start: "top 90%",
					toggleActions: "play none none none",
				},
			}
		);
	});
}

// Lenis Smooth Scroll
export function initLenis() {
	const lenis = new Lenis({
		smooth: true,
		lerp: 0.08,
	});
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
}

// Helper to init all
export function initAnimations() {
	initGSAPAnimations();
	initLenis();
}



// Custom circular text cursor for AboutMe section (faithful CodePen adaptation)
function initAboutMeCursor() {
	const aboutMe = document.getElementById("aboutme-section");
	const cursor = document.querySelector(".cursor");
	const cursorText = cursor ? cursor.querySelector(".cursor-text") : null;
	if (!aboutMe || !cursor || !cursorText) return;

	// Split text into chars if not already split
	if (!cursorText.querySelector(".char")) {
		cursorText.innerHTML = cursorText.textContent.split("").map(c => `<span class="char">${c === "-" ? "&nbsp;" : c}</span>`).join("");
	}
	const chars = cursorText.querySelectorAll(".char");
	const radius = 70;

	function rounded(radius) {
		for (let i = 0; i < chars.length; i++) {
			let rotation = i * (360 / chars.length);
			gsap.set(chars[i], {
				transformOrigin: `0px ${radius}px`,
				x: radius,
				rotate: rotation
			});
		}
		gsap.set(cursor, { transformOrigin: "center center", rotation: 0, width: radius * 2, height: radius * 2 });

		let rotate = gsap.timeline({ repeat: -1 });
		rotate.to(cursor, { rotation: 360, duration: 5, ease: "none" });
	}

	rounded(radius);

	// Set initial style
	Object.assign(cursor.style, {
		position: "fixed",
		left: 0,
		top: 0,
		width: "80px",
		height: "80px",
		pointerEvents: "none",
		zIndex: 9999,
		opacity: 0,
		transform: "translate(-50%, -50%) scale(0.7)",
		display: "block",
		background: "none",
		border: "none",
		boxShadow: "none"
	});

	// Show/hide on AboutMe hover
	aboutMe.addEventListener("mouseenter", () => {
		gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" });
	});
	aboutMe.addEventListener("mouseleave", () => {
		gsap.to(cursor, { scale: 0.7, opacity: 0, duration: 0.25, ease: "power2.out" });
	});

	// Mousemove: move cursor only (no text rotation)
	aboutMe.addEventListener("mousemove", (e) => {
		gsap.to(cursor, { x: e.clientX - radius, y: e.clientY - radius, duration: 0.18, ease: "power2.out" });
	});
}

if (typeof window !== "undefined") {
	window.addEventListener("DOMContentLoaded", () => {
		initAnimations();
		initAboutMeCursor();
	});
}
