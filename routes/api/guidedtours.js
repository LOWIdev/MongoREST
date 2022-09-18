const express = require('express');
const router = express.Router();
const GuidedToursController = require('../../controllers/guidedToursController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const multer = require("multer");


const fileeStorageEngine = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/img");
    },
    filename: (req, res, cb) => {
        cb(null, Date.now() + "--" + res.originalname)
    },
});

//extract mediafile from stream and store inside
const upload = multer({
    storage: fileeStorageEngine
});


router.use(upload.single("image"), )
router.use((req, res, next) => {
    next()
})

router.route('/')
    .get(GuidedToursController.getAllTours)
    .post(GuidedToursController.addTour, async (req, res) => {
        if (!req?.body) return res.status(400).json({
            "message": 'Request empty'
        });

        if (res) res.send("succes");
    })
    .patch(GuidedToursController.updateTour);

router.route('/:id')
    .get(GuidedToursController.getTour, async (req,res) => {
        if(!req?.body) return res.status(400).json({
            "message": ""
        });
        if (res) res.send("");
    });

router.route('/delete/:Id')
    .delete(GuidedToursController.deleteTour);



module.exports = router;