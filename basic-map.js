//Declare global variables
var map, alkmap;
ALKMaps.APIKey = "345EF47E420C98489790596A0B811479";
$(document).ready(function () {
    //Create main map object
    map = new ALKMaps.Map('map', { displayProjection: new ALKMaps.Projection("EPSG:900913") });
    var first = true;
    init();

    function init() {
        var lon, lat, zoom;
        var mapregion = $("input:radio[name=region]:checked").val();
        var style = $("#mapStyles option:selected").val();
        if (mapregion === "EU") {
            lon = 10.7748462, lat = 49.855031, zoom = 5;
        } else {
            lon = -74, lat = 40.71, zoom = 10;
        }

        if (first === false) {
            var numLayers = map.layers.length;
            for (var i = numLayers - 1 ; i >= 0 ; i--) {
                map.removeLayer(map.layers[i]);
            }
        }

        //Declare the map layer objects
        //ALKMaps.Layer.BaseMap requires the alkmaps.js to be loaded
        alkmap = new ALKMaps.Layer.BaseMap("ALK Maps", { region: mapregion, style:ALKMaps.STYLE[style] }, { displayInLayerSwitcher: false });
        var radarLayer = new ALKMaps.Layer.WeatherRadar("Weather Radar Layer",
                    { display: "radar" },  // radar
                    { displayInLayerSwitcher: true, opacity: 0.5, visibility: false }
                );

        var satLayer = new ALKMaps.Layer.WeatherRadar("Weather Cloud Layer",
                { display: "satellite" },
                { displayInLayerSwitcher: true, opacity: 0.5, visibility: false }
            );

        var trafficLayer = new ALKMaps.Layer.Traffic("ALK LiveTraffic&trade;", {region: mapregion}, {
            displayInLayerSwitcher: true, minScale: 500000, visibility: false
        });

        var weatherAlerts = new ALKMaps.Layer.WeatherAlerts("Weather Alerts", {
            visibility: false,
            legendDisplayClass: "customWeatherAlertLegend", //name of custom legend control css class
            optionDisplayClass: "customWeatherAlertOption", //name of custom option control css class
        });
        
        var layer = new ALKMaps.Layer.BaseMap("ALK Maps", {}, {sphericalMercator: false, displayInLayerSwitcher: false });
        
        //Add the layers to the map object
        map.addLayers([alkmap, radarLayer, satLayer, trafficLayer, weatherAlerts]);

        //Change the initial viewpoint of the map
        if (!window.location.search) {
            var lonLat = new ALKMaps.LonLat(lon, lat).transform(new ALKMaps.Projection("EPSG:4326"), map.getProjectionObject());
            map.setCenter(lonLat, zoom);
        }

        if (first === true) {
            //Add additional the control panels
            map.addControl(new ALKMaps.Control.LayerSwitcher({ roundedCorner: false, 'div': ALKMaps.Util.getElement('layerSwitcher') }));
            //These define the styles for the Lat/Lon Grid
            //	var grat = new ALKMaps.Symbolizer.Line({strokeColor: "#000000", strokeWidth: 1, strokeOpacity: 0.1});
            //	var text = new ALKMaps.Symbolizer.Text({fontSize: "8pt", fontColor: "#999999"});
            // map.addControl(new ALKMaps.Control.Graticule({layerName: "Lat/Long Grid", displayInLayerSwitcher: true, lineSymbolizer: grat, labelSymbolizer: text, visible:true}));

            map.addControl(new ALKMaps.Control.Permalink({ 'div': ALKMaps.Util.getElement('permalink-ctrl')}));
            map.addControl(new ALKMaps.Control.MousePosition());
            map.addControl(new ALKMaps.Control.Scale());
            map.addControl(new ALKMaps.Control.ViewportInfo({ 'div': ALKMaps.Util.getElement('external-controls') }));
            map.addControl(new ALKMaps.Control.ContextMenu({
                'ctxMenuItems': [
                    { separator: false, text: 'Zoom In', onclick: function (e) { map.zoomIn(); } },
                    { separator: false, text: 'Zoom Out', onclick: function (e) { map.zoomOut(); } },
                    { separator: true },
                    { separator: false, text: 'Zoom to Extent', onclick: function (e) { map.zoomToMaxExtent(); } }
                ]
            }));
            //map.addControl(new ALKMaps.Control.NavPanel());
            //map.addControl(new ALKMaps.Control.Geolocate());
            first = false;
        }
        //map.events.register("moveend", map, function () {
        //    $("#permalink-btn").prop('href', $("#permalink-ctrl").find('a').prop('href'));
        //    $('#txtPermalink').val($("#permalink-ctrl").find('a').prop('href'));
        //});

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

