const express = require('express');
const router = express.Router();
const fileUploadController = require('../../controllers/fileUploadController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.route('/upload')
.get(fileUploadController.addFile)
    


module.exports = router;