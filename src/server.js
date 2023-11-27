const app = require('./app')
const { authenticated, syncUp } = require('./config/database/database')
const { envs } = require('./config/environments/environments')

async function main(){
    try {
        authenticated()
        syncUp()
    } catch (error) {
        console.log(error)
    }
}

main()

app.listen(envs.PORT, () => {
    console.log("server running on port: " + envs.PORT)
})