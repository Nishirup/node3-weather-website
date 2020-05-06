const request = require('request')
const forecast = (latitude,longitude,callback) => {

	const url = 'http://api.weatherstack.com/current?access_key=a286ee6768afcac9f6b211d5eb60147a&query='+longitude+','+latitude+'&units=m'

	request({url,json:true},(error,{ body } = {} ) => {
		if(error) {
			callback('Unable to connect to the weather service!',undefined)
		}
		else if(body.error) {
			callback('Unable to find the location!',undefined)
		}
		else {
			callback(undefined,body.current.weather_descriptions[0] + ' . It is '+body.current.temperature+' degrees outside.It feels like '+body.current.feelslike+' degrees out.')
		}
})
} 

module.exports = forecast




