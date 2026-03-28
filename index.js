import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "20s" });
};

const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            }

            console.log(decoded)

            resolve(decoded);
        })
    });
}

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Bearer TOKEN
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
        return res.sendStatus(401);
    }

    try {
        req.user = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
        return next();
    } catch (err) {
        if (err.name !== "TokenExpiredError") {
            return res.sendStatus(403);
        }

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.sendStatus(403);
        }

        try {
            const refreshUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            const user = { username: refreshUser.username };
            req.user = user;
            res.locals.accessToken = generateAccessToken(user);
            return next();

        } catch (err) {
            return res.sendStatus(403);
        }
    }
};


app.post("/login", (req, res) => {
    const { username } = req.body;

    // Access Database to verify user credentials here
    const user = { username };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // store refresh token in persistent storage
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
    });

    res.json({ accessToken });
});

app.get("/protected", authenticateToken, (req, res) => {
    const response = {
        message: "This is a protected route",
        user: req.user,
    }

    if (res.locals.accessToken) {
        response.accessToken = res.locals.accessToken;
        response.refreshed = true;
    }

    res.json({ response });
});

app.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.sendStatus(401);
    }

    try {
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const accessToken = generateAccessToken({ username: user.username });
        res.json({ accessToken });

    } catch (err) {
        return res.sendStatus(403);
    }
});

const PORT = 4500;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
