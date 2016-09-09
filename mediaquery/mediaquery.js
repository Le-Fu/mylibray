/**
 *  For media-query isn't suported by ie6~8, we use js to solve this problem.
 */

<script>
if (!window.screenX) {
    //IE6~8
    var oStyle = document.createElement("link");
    oStyle.rel = "stylesheet";
    oStyle.type = "text/css";
    if (screen.width > 1024) {
        oStyle.href = "widthScreen.css";	
    } else {
        oStyle.href = "normalScreen.css";	
    }
    document.getElementsByTagName("head")[0].appendChild(oStyle);
}
</script>