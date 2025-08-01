const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password || !confirmPassword) {
      return res.status(401).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(401).json({
        status: "ERR",
        message: "The input is email",
      });
    } else if (password !== confirmPassword) {
      return res.status(401).json({
        status: "ERR",
        message: "The password is equal confirmPassword",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};


const loginUser = async (req, res) => {
  try {
    //console.log(req.body);
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(401).json({
        status: "ERR",
        message: "You entered incorrectly",
      });
    } else if (!isCheckEmail) {
      return res.status(401).json({
        status: "ERR",
        message: "Error entering email",
      });
    }

    const response = await UserService.loginUser(req.body);

    const { refresh_token, ...newReponse } = response;
    console.log("refresh_token", refresh_token);

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: '/',
    });


    return res.status(200).json(newReponse);

  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "ID người dùng không có",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await UserService.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "ID người dùng không có",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const refreshToken1 = async (req, res) => {
  console.log("cookie refresh token", req.cookies);
  try {
    let token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const refreshToken = async (req, res) => {
  console.log("req.cookies.refresh_token", req.cookies.refresh_token);
  try {
    let token = req.cookies.refresh_token;
    if (!token) {
      return res.status(404).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const logOutUser = async (req, res) => {
  try {
      res.clearCookie('refresh_token')
      //res.localStorage.clear();
      return res.status(200).json({
          status: 'OK',
          message: 'Logout successfully'
      })
  } catch (e) {
      return res.status(404).json({
          message: e
      })
  }
}

const deleteMany = async (req, res) => {
  try {
      const ids = req.body.ids
      if (!ids) {
          return res.status(200).json({
              status: 'ERR',
              message: 'The ids is required'
          })
      }
      const response = await UserService.deleteManyUser(ids)
      return res.status(200).json(response)
  } catch (e) {
      return res.status(404).json({
          message: e
      })
  }
}
const sendPassword = async (req, res) => {
  try {
    const { email, otp} = req.body;
    console.log("updatePass", email, otp)
    if (!otp) {
      return res.status(200).json({
        status: "ERR",
        message: "The otp is required",
      });
    }
    const response = await UserService.sendPassword(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    // console.log("updatePassword", email, password, confirmPassword)
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await UserService.updatePassword(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  getDetailsUser,
  getAllUser,
  deleteUser,
  refreshToken,
  logOutUser,
  deleteMany,
  sendPassword,
  updatePassword
};
