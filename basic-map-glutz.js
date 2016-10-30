//Declare global variables
var map, basemap;
ALKMaps.APIKey = "345EF47E420C98489790596A0B811479";
$(document).ready(function () {
    //Create main map object
    map = new ALKMaps.Map('map', { displayProjection: new ALKMaps.Projection("EPSG:4326") });
    init();

    function init() {
        var lon, lat, zoom;
        var mapregion = $("input:radio[name=region]:checked").val();
        var style = $("#mapStyles option:selected").val();
        lon = -73.9, lat = 40.7, zoom = 12;

        //Declare the map layer objects
        //ALKMaps.Layer.BaseMap requires the alkmaps.js to be loaded
        basemap = new ALKMaps.Layer.BaseMap("ALK Maps", { region: mapregion, style: ALKMaps.STYLE.MONOCHROME }, { displayInLayerSwitcher: false });
                
        var trafficLayer = new ALKMaps.Layer.Traffic( "ALK LiveTraffic", {region: 'NA'}, {});
        map.addLayers([basemap]);

        var trafficHistoricLayer = new ALKMaps.Layer.Traffic( 
            "ALK LiveTraffic", 
            { 
                histDay: "Tuesday", 
                histTimeBin: 40, 
                histTimeZone: "-04:00" 
            }, 
            {}
        );        
        //Add the layers to the map object
        map.addLayers([trafficHistoricLayer]);
        
        map.addControl(new ALKMaps.Control.MousePosition());
        map.addControl(new ALKMaps.Control.Scale());

        var routingLayer = new ALKMaps.Layer.Routing( "Route Layer" );
        map.addLayer(routingLayer);

        var stops = [
                new ALKMaps.LonLat(-75.173297, 39.942892),
                new ALKMaps.LonLat(-74.438942, 39.362469)
            ];					
        stops = ALKMaps.LonLat.transformArray(stops, new ALKMaps.Projection("EPSG:4326"), map.getProjectionObject());
        routingLayer.addRoute({
            stops: stops,
            functionOptions:{
                routeId: "PhiladelphiaToAtlanticCity"
            },
            routeOptions: {
                highwayOnly: false, 
                tollDiscourage: true
            },
            reportOptions: {}
        });

        //Change the initial viewpoint of the map
        if (!window.location.search) {
            var lonLat = new ALKMaps.LonLat(lon, lat).transform(new ALKMaps.Projection("EPSG:4326"), map.getProjectionObject());
            map.setCenter(lonLat, zoom);
        }

        $("#btnSubmit").click(function () {
            var scaleratio = 1 / parseFloat($('#selectScale').val());
            map.zoomToScale(scaleratio);
        });

        $("#mapStyles").change(function () {
            style = $("#mapStyles option:selected").val();
            alkmap.changeStyle(ALKMaps.STYLE[style]);
            
        });

        $("#traffic-state").text("xx");
    }
});

