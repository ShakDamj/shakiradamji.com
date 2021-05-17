const mobile = '30rem';
const standard = '60rem';
const desktop = '90rem';

module.exports = {
  plugins: {
    'postcss-custom-media': {
      customMedia: {
        '--mobile-down': `screen and (width < ${standard})`,
        '--mobile-only': `screen and (width < ${standard}) and (width >= ${mobile})`,
        '--mobile-up': `screen and (width >= ${mobile})`,
        '--standard-down': `screen and (width < ${desktop})`,
        '--standard-only': `screen and (width < ${desktop}) and (width >= ${standard})`,
        '--standard-up': `screen and (width >= ${standard})`,
        // '--desktop-down': `screen`,
        // '--desktop-only': `screen and (width < ${desktop}) and (width >= ${desktop})`,
        '--desktop-up': `screen and (width >= ${desktop})`,
      },
    },
  },
};
