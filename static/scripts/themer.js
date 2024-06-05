function setTheme() {
    const dark = localStorage.getItem('theme') === 'dark' ?? false;
    document.documentElement.setAttribute("data-theme", dark ? 'dark' : 'light');
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
        document.documentElement.setAttribute("data-theme", dark ? 'dark' : 'light');
        if (dark) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme();
    listenForThemeChanges();
});
