import dotenv from "dotenv";

dotenv.config();

const config = {
    development:{
        mongoUrl: process.env.MONGODB_URL,
        port: process.env.PORT
    },
    production:{
        mongoUrl: process.env.MONGODB_URL,
        port: process.env.PORT
    }
};

// export default config;
