const express = require('express');
const router = express.Router();
const guidedToursController = require('../../controllers/api/guidedToursController');
const multer = require("multer");


const fileeStorageEngine = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/img");
    },
    filename: (req, res, cb) => {
        cb(null, Date.now() + "--" + res.originalname)
    },
});

//handle incoming Image inside Form 
const upload = multer({
    storage: fileeStorageEngine
});

router.use(upload.single("image"), )
router.use((req, res, next) => {
    next()
})

router.route('/')
    .get(guidedToursController.getAllTours)
    .post(guidedToursController.addTour, async (req, res) => {
        if (!req?.body) return res.status(400).json({
            "message": 'Request empty'
        });
        if (res) res.send("Success");
    })
    .patch(guidedToursController.updateTour);

router.route('/:id')
    .get(guidedToursController.getTour, async (req,res) => {
        if(!res?.body) return res.status(400).json({
            "message": "No Tour found"
        });
        if (res) res.send("Success");
    });

router.route('/:id')
    .delete(guidedToursController.deleteTour);

module.exports = router;