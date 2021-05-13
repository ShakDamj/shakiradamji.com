const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

(function i18n() {
  $('[data-language-toggle]').addEventListener('click', () => {
    const { body } = document;

    if (body.classList.contains('display-en')) {
      body.classList.remove('display-en');
      body.classList.add('display-es');
    } else {
      body.classList.remove('display-es');
      body.classList.add('display-en');
    }
  });
})();

// (function detectScroll() {
//   $$('[add-class-when-visible]');
// })();

// (function toClipboard() {
//   $$('[data-to-clipboard]').forEach(el => {
//     el.addEventListener('click', event => {
//       event.preventDefault();
//       el.select();
//       document.execCommand('copy');

//       // not supported yet
//       // const content = el.dataset['to-clipboard'] || el.textContent;
//       // Clipboard.write(content);
//     });
//   });
// })();

// function writeToClipboard(content) {
//   return getPermission().then(() => {
//     return navigator.clipboard.writeText(content);
//   });

//   function getPermission() {
//     return new Promise((resolve, reject) => {
//       navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
//         if (result.state == 'granted' || result.state == 'prompt') {
//           resolve();
//         } else {
//           reject();
//         }
//       });
//     });
//   }
// }
