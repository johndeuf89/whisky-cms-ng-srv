const express = require('express');
const app = express();
const api = require('./api/v1/'); // permet d'importer router
const cors = require('cors');


const mongoose = require('mongoose');
const connection = mongoose.connection;

app.set('port', (process.env.port || 3000 ));

//Utilisation de cors middleware pour la gestion des requetes

app.use(cors()); //app.use permet d'utiliser des middleware
app.use('/api/v1', api); //requete sur localhost:3000/api/v1
app.use((req, res) => {
	const err = new Error('Erreur 404 aie aie aie');
	err.status = 404;
	res.json({ msg:'404 not foung', err:err});
});

//gestion de la connection à mongoDB
mongoose.connect('mongodb://localhost:27017/whiskycms',{ useNewUrlParser:true, useUnifiedTopology:true});
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



