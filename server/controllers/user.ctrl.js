const userModel = require('../models/user.model');
const responseMessage = require('../middlewares/responseMessages');

exports.getUser = async (req, res) => {
    try {
        const userFindResp = await userModel.find({loginId: req.jwt.user});
        return res.status(200).json({
            success: true,
            data: {
                user: userFindResp
            }
        });
    } catch(error) {
        return res.status(503).json({
            success: false,
            message: responseMessage[1005],
        });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const userFindResp = await userModel.findById(req.params.id);
        if(userFindResp) {
            return res.status(200).json({
                success: true,
                data: {
                    user: userFindResp
                }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: responseMessage[1006],
            });
        }
    } catch(error) {
        return res.status(503).json({
            success: false,
            message: responseMessage[1005],
        });
    }
}

exports.saveUser = async (req, res) => {
    try {
        const userFindResp = await userModel.findOne({name: req.body.name});
        if(userFindResp) {
            return res.status(400).json({
                success: false,
                message: responseMessage[1007],
            });
        } else {
            req.body.loginId = req.jwt.user;
            const saveResp = await userModel.create(req.body);
            return res.status(200).json({
                success: true,
                data: {
                    user: saveResp
                },
                message: responseMessage[1008],
            });
        }
    } catch(error) {
        return res.status(503).json({
            message: responseMessage[1005],
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userFindResp = await userModel.findById(req.params.id);
        if(!userFindResp) {
            return res.status(404).json({
                success: false,
                message: responseMessage[1006],
            });
        } else {
            const updateResp = await userModel.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json({
                success: true,
                data: {
                    user: updateResp
                },
                message: responseMessage[1009],
            });
        }
    } catch(error) {
        return res.status(503).json({
            message: responseMessage[1005],
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userFindResp = await userModel.findById(req.params.id);
        if(!userFindResp) {
            return res.status(404).json({
                success: false,
                message: responseMessage[1006],
            });
        } else {
            await userModel.findByIdAndRemove(req.params.id);
            return res.status(200).json({
                success: true,
                message: responseMessage[1010],
            });
        }
    } catch(error) {
        return res.status(503).json({
            message: responseMessage[1005],
        });
    }
}