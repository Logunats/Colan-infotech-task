const bcrypt = require('bcryptjs');
const db = require('../db');
const config = require('../config');
const adminModel = require('../models/admin.model');

const adminUser = {
    username: 'admin',
    password: 'Admin@123'
};

async function dbSeed() {
    try {
        adminUser.password = await bcrypt.hash(adminUser.password, parseInt(config.saltRounds));
        const findResp = await adminModel.findOne({username: adminUser.username});
        if(!findResp) {
            await adminModel.create(adminUser);
            console.log('-----Success save admin user-----');
        } else {
            console.log('-----Already seeded save admin user-----');
        }
    } catch(error) {
        console.log('-----Failed save admin user-----', error);
    }
}

dbSeed();
