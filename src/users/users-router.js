const path = require('path');
const express = require('express');
const UsersService = require('./users-service');
const usersRouter = express.Router();
const jsonParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');

usersRouter
    .post('/', jsonParser, (req, res, next) =>  {
        const { email, username, password, first_name, last_name } = req.body;
        for (const field of ['email', 'username', 'password', 'first_name', 'last_name'])
            if(!req.body[field])
            return res.status(400).json({
                error: `Missing '${field} in request body`
            });

        const passwordError = UsersService.validatePassword(password);
        if (passwordError) 
            return res.status(400).json({ error: passwordError });

            UsersService.hasUserWithUserName(
                req.app.get('db'),
                username
            )
            .then(hasUserWithUserName => {
                if (hasUserWithUserName)
                        return res.status(400).json({ error: `Username already taken` });
                
                return UsersService.hashPassword(password)
                .then(hashedPassword => {
                    const newUser = {
                        email,
                        username,
                        password: hashedPassword,
                        first_name,
                        last_name,
                        date_created: 'now()',
                    }

                    return UsersService.insertUser(
                        req.app.get('db'),
                        newUser
                    )
                    .then(user => {
                        res
                            .status(201)
                            .location(path.posix.join(req.originalUrl, `/${user.id}`))
                            .json(UsersService.serializeUser(user));
                    });
                });
            })
            .catch(next);
        
    });

usersRouter
    .route('/:username')
    .all(requireAuth)
    .all(checkUsernameExists)
    .get((req, res) => {
        res.json(UsersService.serializeUser(res.user));
    });

// async/await syntax for promises
async function checkUsernameExists(req, res, next) {
    try {
        console.log('req.params', req.params);
        const user = await UsersService.getByUsername(
            req.app.get('db'),
            req.params.username
        );

        if (!user)
            return res.status(404).json({
                error: `User does not exist`
            });

            res.user = user;
            next();
    } catch (error) {
        next(error);
    }
}

module.exports = usersRouter;