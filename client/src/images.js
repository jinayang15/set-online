const imageModules = import.meta.glob('./assets/cards/*.svg', { eager: true });
const cardImages = Object.values(imageModules).map(mod => mod.default);
console.log(cardImages)
export default cardImages