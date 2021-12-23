function toggleFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    fullscreen.classList.toggle('fa-compress-arrows-alt');
    fullscreen.classList.toggle('fa-expand');

    if (document.fullscreenElement !== null) {
        document.exitFullscreen();
    } else {
        let elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }
    }
}