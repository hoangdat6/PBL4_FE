import A from '../assets/statics/icon_avatar/A.png';
import Barbbeast from '../assets/statics/icon_avatar/Barbbeast.png';
import Corona from '../assets/statics/icon_avatar/Corona.png';
import Ebola from '../assets/statics/icon_avatar/Ebola.png';
import Ghosty from '../assets/statics/icon_avatar/Ghosty.png';
import Gluttonous from '../assets/statics/icon_avatar/Gluttonous.png';
import Hantavirus from '../assets/statics/icon_avatar/Hantavirus.png';
import Influenza from '../assets/statics/icon_avatar/Influenza.png';
import MERS from '../assets/statics/icon_avatar/MERS.png';
import Moustache from '../assets/statics/icon_avatar/Moustache.png';
import mrhappy from '../assets/statics/icon_avatar/mrhappy.png';
import potato from '../assets/statics/icon_avatar/potato.png';
import Rotavirus from '../assets/statics/icon_avatar/Rotavirus.png';
import Rustseeker from '../assets/statics/icon_avatar/Rustseeker.png';
import SARS from '../assets/statics/icon_avatar/SARS.png';
import scab from '../assets/statics/icon_avatar/scab.png';
import TheCreepyCrowler from '../assets/statics/icon_avatar/TheCreepyCrowler.png';
import TheNiceLady from '../assets/statics/icon_avatar/TheNiceLady.png';
import Tombtooth from '../assets/statics/icon_avatar/Tombtooth.png';
import Vexmask from '../assets/statics/icon_avatar/Vexmask.png';
import Vicious from '../assets/statics/icon_avatar/Vicious.png';

import DefaultAvatar from "../assets/statics/default_avatar/Glowface.png";

const avatars = [
    { name: 'A', path: A },
    { name: 'Barbbeast', path: Barbbeast },
    { name: 'Corona', path: Corona },
    { name: 'Ebola', path: Ebola },
    { name: 'Ghosty', path: Ghosty },
    { name: 'Gluttonous', path: Gluttonous },
    { name: 'Hantavirus', path: Hantavirus },
    { name: 'Influenza', path: Influenza },
    { name: 'MERS', path: MERS },
    { name: 'Moustache', path: Moustache },
    { name: 'mrhappy', path: mrhappy },
    { name: 'potato', path: potato },
    { name: 'Rotavirus', path: Rotavirus },
    { name: 'Rustseeker', path: Rustseeker },
    { name: 'SARS', path: SARS },
    { name: 'scab', path: scab },
    { name: 'TheCreepyCrowler', path: TheCreepyCrowler },
    { name: 'TheNiceLady', path: TheNiceLady },
    { name: 'Tombtooth', path: Tombtooth },
    { name: 'Vexmask', path: Vexmask },
    { name: 'Vicious', path: Vicious }
];

const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex].name;
};

const getAvatarByName = (name) => {
    return name && avatars.find(avatar => avatar.name === name) ? avatars.find(avatar => avatar.name === name).path : DefaultAvatar;
};

export { getRandomAvatar, getAvatarByName };