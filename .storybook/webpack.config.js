const path = require('path');

const config = {
    module: {
        rules: [
            {
                test: /\.css?$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "raw-loader",
                        options: {
                            include: path.resolve(__dirname, '../')
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = config;
