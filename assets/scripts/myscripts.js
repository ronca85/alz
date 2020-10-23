
// https://github.com/wicg/inert
import "wicg-inert";

// if ( document.querySelector(".js-main-nav-toggle") ) {
// 	document.querySelector(".js-main-nav-toggle").addEventListener("click", function(e) {
// 		document.documentElement.classList.toggle("menu-is-open");
// 	});
// }

const mainNavToggle = document.querySelector(".js-main-nav-toggle")
const mainNav       = document.querySelector(".js-main-nav")

if ( mainNavToggle ) {
	mainNavToggle.addEventListener("click", () => {
		if ( document.documentElement.classList.contains("menu-is-open") ) {
			mainNav.inert = true
			document.documentElement.classList.remove("menu-is-open")
		}
		else {
			mainNav.inert = false
			document.documentElement.classList.add("menu-is-open")
		}
	})
}

mainNav.inert = true



const mainNavLinks = mainNav.querySelectorAll("a")


mainNavLinks.forEach( item => {
	item.addEventListener("click", () => {
		if ( document.documentElement.classList.contains("menu-is-open") ) {
			console.log("close menu");
			mainNav.inert = true
			document.documentElement.classList.remove("menu-is-open")
		}
	})
})





const inputs = document.querySelectorAll(".js-contact-form input, .js-contact-form textarea")

inputs.forEach( input => {
	input.addEventListener("focus", (e) => {
		e.target.previousElementSibling.classList.add("focused");
	})
	input.addEventListener("blur", (e) => {
		e.target.previousElementSibling.classList.remove("focused");
	})
})
