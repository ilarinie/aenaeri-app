db.createUser({
    user: 'aenaeri-app',
    pwd: 'password123',
    roles: [
        {
            role: "readWrite",
            db: "aenaeri-app"
        }
    ]
})

setVerboseShell(true);