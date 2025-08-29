const importAll = (r) => {
    let images = {};
    r.keys().forEach((key) => {
        const name = key.replace("./", "");
        images[name] = r(key);
    });
    return images;
};

// Updated path: just 'assets', not 'assets/images'
const images = importAll(require.context("../assets", false, /\.(png|jpe?g|svg)$/));
export default images;