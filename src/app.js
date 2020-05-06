const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//these below two functions or properties is provided by the wrapper function (which we say while debugging notes app in chrome browser - those extra things which got added to our code)
//__dirname - gives the path to the current directory
//__filename - gives the path to the current file 
console.log(__dirname)
console.log(path.join(__dirname , '../public')) //path.join() is a function which will return the final path and we pass to it the individual pieces to the path and it does the job of manipulating the string for us
//console.log(__filename)
//We can customize are views directory and rename it to some other directory name(say templates) - but for that we have to add the path to that directory as the express does not know about it - it only knows about 'views' folder.

const app = express()


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

//app.use() is a way to customize your server - here we will customize the server to serve out that folder
//express.static() is a function which takes the path to the folder we want to serve up

//app.set() - allows us to set a value for a given express setting - its format or syntax is - app.set('view engine', 'hbs') - it shouls look exactly same like this
//this line below is only need to set up handle bars and we can use it create dynamic web page

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath) //letting know express about the path to the templates folder
hbs.registerPartials(partialsPath) //registerPartials() take a path to the directory where the partials live

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
	res.render('index',{
		title:'Weather App',
		name:'Nishita Tiwary'	
	})
})

app.get('/about' , (req,res) => {
	res.render('about',{
		title:'About Me',
		name:'Nishita'

	})
})

app.get('/weather' , (req,res) => {
	if(!req.query.address) {
		return res.send({
			error:'Please give the address'
	})
}
	else{
	geocode(req.query.address,(error,{longitude,latitude,place} = {} ) => {
        if(error) {
                return res.send({
			//error:'Cannot find the given address'
			error:error
})
        }
        forecast(longitude,latitude, (error, data) => {
                if(error) {
		 return res.send({
                         //error:'Cannot find the given forecast'
                         error //shorthand syntax
 })
        
}
        res.send({
                address:req.query.address,
		location:place,
                forecast:data
        })

})
})
}
})


app.get('/products' , (req,res) => {
	if(!req.query.search) {
		return res.send({
			error:'You must provide a search term'
})
}


//	console.log(req.query)
	res.send({
		products: []
	})
})

//challenge-

app.get('/help', (req,res) => {
	res.render('help' , {
		help_msg:'This is a help page',
		title:'Help',
		name:'Nishita'
		})
})

app.get('/help/*' , (req,res) => {
	res.render('errorpage' , {
		error_msg:'Help article not found.',
		title:'404 Page',
		name:'Nishita'
	})
})

app.get('*' , (req,res) => {
	res.render('errorpage' , {
		error_msg:'Page not found.',
		title:'404 Page',
		name:'Nishita'
	})
})


/*
//get() is used if a user visits a domain say app.com then what we want to display him as a result of his request
app.get('' , (req,res) => {

	//res.send('Hello Express!!')
	res.send('<h1>Weather</h1>')

})

app.get('/help' , (req,res) => {

	//res.send('Help page')
	//express is gonna detect we have provided an object - it is automatically going to stringify JSON for us and its gonna get it sent to the requester correctly
	res.send({
		name : 'Nishita',
		age:27
	})
})

app.get('/json-example' ,(req,res) => {
	//res.send('About page')
	res.send([{
		name:'shaan'
},
{
		name:'nishita'
}])
})

app.get('/about' , (req,res) => {
	res.send('<h1>About</h1>')
})
*/

//app.com
//app.com/help
//app.com/about

//to start the server up - app.listen is used
app.listen(3000 , () =>{
	console.log('Server is up on port 3000')
})
