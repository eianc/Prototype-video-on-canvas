// import '../styles/app';
import '../styles/app';

// import the scripts

import videoCanvas from 'modules/canvas';

// __DEV__ is a global boolean that is set by Webpack
// This is good to use if you want exclude some JS from
// the production build, e.g. console statements
__DEV__ && console.log('Zone boilerplate\n================\nThis message is only viewable in the development build');


videoCanvas();
