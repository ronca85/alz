
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
const inputsRequired = document.querySelectorAll(".js-contact-form [required]")

let formData = {}
let emptyRequired = inputsRequired.length

function resetFormData() {
	formData = {}
	formData.posted = false
}

resetFormData()
checkRequiredFormFields()
handleFormLabels()
checkFormData()

handleSubmit()



function validateEmail(email){
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}


function isEmpty( obj ) {
	for ( var key in obj ) {
		if ( obj.hasOwnProperty( key ) )
			return false;
	}
	return true;
}


function checkRequiredFormFields() {
	inputsRequired.forEach( required => {

		required.addEventListener("blur", (e) => {

			if ( required.getAttribute("type") === "email" ) {
				// console.log( "if email" )
				if ( validateEmail(required.value) ) {
					// console.log( "valid" )
					e.target.parentElement.classList.remove("error")
				}
				else {
					// console.log( "not valid" )
					e.target.parentElement.classList.add("error")
				}
			}

			else {
				// console.log( "if not email" )
				if ( e.target.value === "" ) {
					// console.log( "no value" )
					e.target.parentElement.classList.add("error")
				}
				else {
					// console.log( "value ok" )
					e.target.parentElement.classList.remove("error")
				}
			}
			checkFormData()
			console.log( " emptyRequired", emptyRequired );
		})
	})
}



function handleFormLabels() {
	inputs.forEach( field => {
		field.addEventListener("focus", (e) => {

			// when click on input field move label above
			e.target.parentElement.classList.add("focused")
		})

		field.addEventListener("blur", (e) => {

			// if string empty put the label back in
			if ( e.target.value === "" ) {
				e.target.parentElement.classList.remove("focused")
			}
		})
	})
}


function checkFormData() {
	emptyRequired = inputsRequired.length
	inputsRequired.forEach(function(i) {
		if ( i.value.length ) {
			emptyRequired--
		}
	})
	formData.posted = true
}




function handleSubmit() {
	const submitButton = document.querySelector(".js-submit-button");
	if ( submitButton ) {
		submitButton.addEventListener("click", function(e) {
			e.preventDefault()
			if ( emptyRequired === 0 ) {
				resetForm()
			}
			resetFormData()
		});
	}
}



function resetForm() {
	if ( formData.posted ) {
		document.querySelector(".js-contact-form").classList.add("is-loading")
		setTimeout( function() {
			inputs.forEach( function( i ) {
				i.value = ""
				i.parentElement.classList.remove("focused")
			})
			document.querySelector(".js-contact-form").classList.remove("is-loading")
		}, 1800)
		
		setTimeout( function() {
			document.querySelector(".js-validation").classList.add("close-form")
		}, 2000)
		
		setTimeout( function() {
			document.querySelector(".js-validation").classList.remove("close-form")
		}, 5000)
	}
}

