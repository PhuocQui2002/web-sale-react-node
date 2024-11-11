const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/update/:id", authUserMiddleWare, userController.updateUser);
router.delete("/delete/:id", authMiddleWare, userController.deleteUser);
router.get("/getAllUser", authMiddleWare, userController.getAllUser);
router.get("/getDetails/:id", userController.getDetailsUser);
router.post("/refreshToken", userController.refreshToken);
router.post("/logOut", userController.logOutUser);
router.post('/deleteMany', authMiddleWare, userController.deleteUser)
router.put("/sendPassword", userController.sendPassword);
router.put("/updatePassword", userController.updatePassword);

module.exports = router;
