const LIGHT = 'light';
const DARK = 'dark';

function setTheme() {
    const dark = localStorage.getItem('theme') === DARK ?? false;
    document.documentElement.setAttribute("data-theme", dark ? DARK : LIGHT);
    const controller = document.querySelector('input.theme-controller');
    if (controller) {
        controller.checked = dark;
        controller.classList.add('transition-none');
        setTimeout(() => {
            controller.classList.remove('transition-none');
        }, 250);
    }
}

function listenForThemeChanges() {
    const controller = document.querySelector('input.theme-controller')
    controller?.addEventListener('input', e => {
        const dark = e.target.checked;
        document.documentElement.setAttribute("data-theme", dark ? DARK : LIGHT);
        if (dark) {
            localStorage.setItem('theme', DARK);
        } else {
            localStorage.setItem('theme', LIGHT);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme();
    listenForThemeChanges();
});
