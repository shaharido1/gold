

function getEnvironmentVariables() {
    const env = process.env;
    const envConfig = {};
    Object.keys(env)
        .filter(key => key.includes("config_env", 0))
        .forEach(key => {
            envConfig[key] = env[key];
        });
    return envConfig;
}
const c = getEnvironmentVariables();

console.log(c.config_env);
