export default (config, env, helpers) => {
    config.node = {
        fs: 'empty',
    }
    config.output.publicPath = '/' + (process.env.BASE_URL || "");
    config.plugins.push(
        new helpers.webpack.DefinePlugin({
            PUBLIC_PATH: JSON.stringify(config.output.publicPath),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        })
    );
};
