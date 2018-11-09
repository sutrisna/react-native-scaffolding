module.exports = {
    // REST API
    get Services() {
        return require('./services/api').default;
    },
    // STYLES
    get Styles() {
        return require('./styles/style-global').default;
    },
    // PIPES
    get Pipes(){
        return require('./pipes/format').default;
    }
}