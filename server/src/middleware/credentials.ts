import allowedOrigin from "../config/allowedOrigin";

const credentials = (req: any, res: any, next: any) => {
    const origin = req.headers.origin;
    if (allowedOrigin.indexOf(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

export default credentials