const express = require("express");
const router = express.Router();
const tablelandController = require("../controllers/tableland.controller");
/**
 * @description     Get a list of tables of a user
 * @access          public
 */
router.get("/", tablelandController.getTablelandUserMapping);


/**
 * @description     Post a table name for a user
 * @access          public
 */
router.post("/", tablelandController.createTablelandUserMapping);

module.exports = router;