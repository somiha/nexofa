const db = require('../model/database')
const DokanAdmin = db.dokanAdmin
const DokanStaff = db.dokanStaff
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerDokanAdmin = async(req, res, next) => {
    try {
        let { dokanName, ownerName, phone, password, address } = req.body
        let dokanAdmin = await DokanAdmin.findAll({
            where: {
                phone: phone,
                status: '1'
            }
        })
        if (dokanAdmin.length > 0) {
            return res.status(400).json({ msg: 'Dokan Already Exists' })
        }
        let hashPassword = await bcrypt.hash(password, 10);
        let createdDokan = await DokanAdmin.create({
            dokanName,
            ownerName,
            phone,
            password: hashPassword,
            address,
            status: '1'
        })

        if (createdDokan) {
            return res.status(200).json({ createdDokan })
        } else {
            return res.status(400).json({ msg: 'Dokan Created Fail' })
        }

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}




exports.signInDokanAdmin = async(req, res, next) => {
    try {
        let { phone, password } = req.body
        const dokan = await DokanAdmin.findOne({
            where: {
                phone: phone
            }
        })
        if (!dokan) {
            return res
                .status(400)
                .json({ msg: "User with this phone does not exist!" });
        }
        const isMatch = await bcrypt.compare(password, dokan.password)
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password." });
        }

        const token = jwt.sign({ id: dokan.id, dokanId: dokan.id, type: 'dokanAdmin' }, "tokenSecretKey")
            //const token = jwt.sign({ dokan }, "tokenSecretKey");
        return res.status(200).json({ token })
            //return res.status(200).json({ token  })

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

exports.getUser = async(req, res, next) => {
    try {
        let userId = req.userId
        let type = req.userType
        if (type == "dokanAdmin") {
            let dokanAdmin = await DokanAdmin.findByPk(userId)
            if (dokanAdmin) {
                return res.status(200).json({ "type": "dokanAdmin", info: dokanAdmin })
            } else {
                return res.status(400).json({ msg: 'something wrong' })
            }
        } else {
            //let staff = await DokanStaff.findByPk(userId)
            let staff = await DokanAdmin.findAll({
                include: [{ model: DokanStaff, where: { id: userId } }]
            })
            if (staff) {
                return res.status(200).json({ "type": "staff", info: staff })
            } else {
                return res.status(400).json({ msg: 'something wrong' })
            }
        }
    } catch (e) {
        res.status(500).json({ error: e.message })

    }
}