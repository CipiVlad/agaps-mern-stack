import allowedOrigin from "./allowedOrigin"

const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

export default corsOptions