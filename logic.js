var pg = require('pg');
var conString = "postgres://node:robot@localhost:5432/homeInventory";

const client = new pg.Client(conString);

//TODO: client should be passed around as the connection

//queries are queued and executed one after another once the connection becomes available
var x = 10;

// initDatabase();

queryDatabase();

async function initDatabase()
{
	await client.connect();
	var result = await client.query("CREATE TABLE ..."); //TODO: design database

	console.log("finished creating tables")
	await client.end();
};

async function queryDatabase()
{
	await client.connect();
	var result = await client.query("SELECT * FROM junk");
	//console.log(result); // All information about the query
	console.log(result.rows); // Results of the query
	// result.rows.length for rows returned
	await client.end();
};


//queries can be executed either via text/parameter values passed as individual arguments
//or by passing an options object containing text, (optional) parameter values, and (optional) query name
//client.query({
//    name: 'insert beatle',
//    text: "INSERT INTO beatles(name, height, birthday) values($1, $2, $3)",
//    values: ['George', 70, new Date(1946, 02, 14)]
//});

//subsequent queries with the same name will be executed without re-parsing the query plan by postgres
//client.query({
//    name: 'insert beatle',
//    values: ['Paul', 63, new Date(1945, 04, 03)]
//});
//var query = client.query("SELECT * FROM beatles WHERE name = $1", ['john']);

//can stream row results back 1 at a time
// query.on('row', function(row) {
//    console.log(row);
//    console.log("Beatle name: %s", row.name); //Beatle name: John
//    console.log("Beatle birth year: %d", row.birthday.getYear()); //dates are returned as javascript dates
//    console.log("Beatle height: %d' %d\"", Math.floor(row.height / 12), row.height % 12); //integers are returned as javascript ints
//});

//fired after last row is emitted
// query.on('end', function() {
//   client.end();
//});
