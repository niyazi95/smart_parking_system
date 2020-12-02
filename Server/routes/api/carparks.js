const express = require('express')
const router = express.Router()

const bodyparser = require('body-parser') //Burası body-parser'ı kullanabilmek için

const { admin } = require('../../firebaseConfig')
const db = admin.firestore();

router.post('/', (req, res) => {
  console.log(req.body.searchItem);
  const docRef = db.collection("car-parks").doc(req.body.searchItem).get()

  docRef.then(data => {
    res.send(data.data());
  })

});

//Burası bodyparser'a ayar vermek için
router.use(bodyparser.urlencoded({extended:false})) 
router.use(bodyparser.json()) 
router.use(bodyparser.text({ type: 'text/*' })) // Bu satır olmadan plain text header'lı gönderim body-parser tarafından algılanmıyor.

router.post('/raspberry', (req, res) => { //Burası Raspberry Pi'dan obje göndermek için
    res.send("OK, Received!" + "\nPlate: " + req.body.plate)
}); 
router.post('/raspberry-plain', (req, res) => {  //Burası Raspberry Pi'dan düz yazı göndermek için
    res.send("OK, Received!" + "\nGelen veri:  " + req.body)
}); 


module.exports = router
