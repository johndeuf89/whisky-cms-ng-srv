const express = require('express');
const app = express();
const api = require('./api/v1/'); // permet d'importer router
const bodyParser = require('body-parser');
const cors = require('cors');


const mongoose = require('mongoose');
const connection = mongoose.connection;

app.set('port', (process.env.port || 3000 ));
//bodyparser permet de récupérer la valeur de body et de la renvoyer quelque part
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
//Utilisation de cors middleware pour la gestion des requetes
app.use(cors()); //app.use permet d'utiliser des middleware
app.use('/api/v1', api); //requete sur localhost:3000/api/v1
//Catch errors
app.use((req, res) => {
	const err = new Error('Erreur 404 aie aie aie');
	err.status = 404;
	res.json({ msg:'404 not found', err:err });
});

//gestion de la connection à mongoDB
mongoose.connect('mongodb://localhost:27017/whiskycms',{ useNewUrlParser:true, useUnifiedTopology:true });
connection.on('error', (err) => {
	console.error(`connection to MongoDB erro: ${err.message}`);
});

connection.once('open', () => {
	console.log('connected to mongoDB');

	// On écoute sur le port défini précedement 
	app.listen(app.get('port'), () => {
		console.log(`The express server listening on port ${app.get('port')}`);
	}); 

});



