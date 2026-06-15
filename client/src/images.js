const imageModules = import.meta.glob('./assets/cards/*.svg', { eager: true, query: '?url' });
const cardImages = Object.fromEntries(
    Object.entries(imageModules).map(([path, mod]) => {
        const fileName = path.split('/').pop().replace('.svg', '')
        return [fileName, mod.default]
    })
)
console.log(cardImages)
export default cardImages