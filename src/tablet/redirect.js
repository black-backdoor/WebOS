/* 
 * Redirects to / if screen size is too small
 */

window.onload = function() {
    function popup() {
        return confirm("Your screen size is too small for this content. Do you want to be redirected to the mobile version?");
    }

    if (window.innerWidth < 1100) {
        // Redirect to mobile.html if screen width is less than 1100px
        console.warn(`%c[Warning]%c Screen size is too small for content! min-width is 1100x; currently: ${window.innerWidth};`, 'color: red; font-weight: bold;', 'color: inherit;');
        if(popup() === true) {
            window.location.href = "/";
        }
    }

    if (window.innerHeight < 650) {
        // Redirect to mobile.html if screen height is less than 650px
        console.warn(`%c[Warning]%c Screen size is too small for content! min-height is 650px; currently: ${window.innerHeight};`, 'color: red; font-weight: bold;', 'color: inherit;');
        if(popup() === true) {
            window.location.href = "/";
        }
    }
};