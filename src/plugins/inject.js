console.log("The script has been injected")
const button = document.createElement('button');
button.textContent = '请选择Tab:'
document.body.insertAdjacentElement('afterbegin', button);

// button.addEventListener('click', function () {
//     chrome.runtime.sendMessage('', {
//         type: 'notification',
//     });
// });