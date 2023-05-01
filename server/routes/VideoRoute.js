const videoController = require("../controller/videoController");
const express = require("express");

const router = express.Router();

router.post("/trimVideo", videoController.TrimVideo);
router.post("/addWatermark", videoController.AddWatermark);
router.post("/turnImagesIntoVideo", videoController.TurnImagesIntoVideo);
router.post("/addProgressBar", videoController.AddProgressBar);
router.post("/addOutro", videoController.AddOutro);
router.post("/convertToGIF", videoController.ConvertToGIF);
module.exports = router;
