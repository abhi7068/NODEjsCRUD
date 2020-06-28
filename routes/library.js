var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
const Schema = mongoose.Schema;
const Bookschemas = new Schema({
	Bookname: String,
	Author: String,
	Price: String
});
var books = mongoose.model("books", Bookschemas);
mongoose.connection
	.once("open", () => {
		console.log("connectd to db");
	})
	.on("error", error => {
		console.log("the error is", error);
	});


	// normal get call
router.get("/getdata", (req, res) => {
	books.find((err, data) => {
		if (err) throw err;
		console.log("data");
		res.json(data);
	});
});


//get call by id
router.get("/getdata1/:id", (req, res) => {
	let id=req.params.id;          
	books.findById(id,(err, data) => {
		if (err) throw err;
		console.log("data");
		res.json(data);
	});
});

// post call
router.post("/add", (req, res) => {
	console.log("query hit");
	console.log(req.body);
	var value = new books(req.body);
	value.save((err, doc) => {
		if (err) throw err;
		//console.log(value);
		res.status(200).send(doc);
		//res.json({ status: "ok" });
	});
});


//delete call to delete  many ids in one time

router.delete("/remove/:id1/:id2",(req, res) =>{
	
	books.remove(
		{_id:{ $in:[
			mongoose.Types.ObjectId(req.params.id1),
			mongoose.Types.ObjectId(req.params.id2)
		]}},
		(err,doc)=>{
			if(err) res.json(err);
			else res.json("removed");
		}
	);
	});


//update call
router.post("/update", function(req, res) {
	console.log(req.body);
	books.findByIdAndUpdate(
		req.body.idkey,
		{
			Bookname: req.body.Bookname,
			Author: req.body.Author,
			Price: req.body.Price
		},
		function(err, doc) {
			if (err) throw err;
			console.log(doc);
			res.send(doc);
		}
	);
});
//this is also update
router.get("/changeData/:id", (req, res) => {
	let id=req.params.id;
	books.findById(id,(err, data) => {
		if (err) throw err;
		console.log("data");
		res.json(data);
	});
});
router.post("/update/:id",)

module.exports = router;
