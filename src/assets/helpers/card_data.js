import back from '../images/back.png';
import images from './card_images';

export default images.map(front => ({
    front,
    back,
    flipped: false
})

);

// export default images.map( (value, index) => {
//     return {
//         back: back,
//         front: value,
//         flipped: false
//     }
// });