const {User} = require('../moduls/users');

const authenticate = (req,res,next)=>{         //middleware
    const token = req.header('x-auth');     //req.header get edir res.header set edir key valueye gore

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    })
};

module.exports = {authenticate};