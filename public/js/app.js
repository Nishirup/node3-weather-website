
//fetch () is used to fetch values from an api 
//the syntax used below means - fetch the value from the url and then get the response - once the reponse is received - parse it into a js object and dump it to the console or render it on the browser page.

/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
	response.json().then((data) => {
		console.log(data)
	})
})
*/

//document.querySelector('form') - this function is used to access the form element on the client side js which are trying to work with - now what comesback from that is a js represenation of that element and we can use that to manipulate the element or to do things when a user interacts with the element.

const weatherForm = document.querySelector('form')
const search = document.querySelector('input') //grab users value from input
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JS' //textContent is a property - using this we can manipulate the content in the html page(index.hbs)

//now when the user submits the form the below code will execute - so addEventListener('submit' ,() =>{}) here - this listener will perform the task provided in the callback function if user submits the form

weatherForm.addEventListener('submit' , (e) => {
	//e stands for event
	e.preventDefault() //this will prevent the default behavior of forms which is to refresh the browser allowing the server to render a new page and instead its gonna do nothing - it will allow us to do whatever we want by letting the function run
	
	const location = search.value //value extracts the input value which is whatever is typed in	

messageOne.textContent = 'Loading...'
messageTwo.textContent = ''

fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
                if(data.error){
                        messageOne.textContent = data.error
        } else {
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.forecast
        }
        })
})

})


