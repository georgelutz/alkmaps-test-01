//Declare global variables
var map, alkmap;
ALKMaps.APIKey = "345EF47E420C98489790596A0B811479";
$(document).ready(function () {
    //Create main map object
    map = new ALKMaps.Map('map', { displayProjection: new ALKMaps.Projection("EPSG:4326") });
    var first = true;
    init();

    function init() {
        var lon, lat, zoom;
        lon = -74, lat = 40.71, zoom = 6;
        
        //Declare the map layer objects
        //ALKMaps.Layer.BaseMap requires the alkmaps.js to be loaded
        alkmap = new ALKMaps.Layer.BaseMap("ALK Maps");

        var lonLat = new ALKMaps.LonLat(lon, lat);
        map.setCenter(lonLat, zoom);

        map.addControl(new ALKMaps.Control.LayerSwitcher({ roundedCorner: false, 'div': ALKMaps.Util.getElement('layerSwitcher') }));

        $("#btnSubmit").click(function () {
            var scaleratio = 1 / parseFloat($('#selectScale').val());
            map.zoomToScale(scaleratio);
        });

        $("#permalink-ctrl").find('a').addClass("btn btn-small");

        $("#mapStyles").change(function () {
            style = $("#mapStyles option:selected").val();
            alkmap.changeStyle(ALKMaps.STYLE[style]);
        });

        $('#btnRegion').on('click', function () {
            init();
        });
    }
});

