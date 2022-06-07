function getContinentColor(c) {
    switch(c){
        case "asia":
            return '#ff0000';
        case "europe":
            return '#0000ff';
        case "southAmerica":
            return '#008000';
        case "oceania":
            return '#800080';
        case "africa":
            return '#FD8D3C';
        case "northAmerica":
            return '#FEB24C';
    }
}

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function getValue(pais, tipus){
    let value = 0;
    let aux;

    switch(tipus){
        case "total":
            aux = contingutTotal.find(element => element[0] == pais);
            if(aux != null){
                value = aux[1]
            }
            break;
        case "netflix":
            aux = contingutNetflix.find(element => element[0] == pais);
            if(aux != null){
                value = aux[2]
            }
            break;
        case "2021":
            aux = contingut2021.find(element => element[0] == pais);
            if(aux != null){
                value = aux[2]
            }
            break;
    }

    return value;
}

function getColor2(pais, tipus){
    let value = getValue(pais, tipus);

    return value > 1000 ? '#800026' :
           value > 500  ? '#BD0026' :
           value > 200  ? '#E31A1C' :
           value > 100  ? '#FC4E2A' :
           value > 50   ? '#FD8D3C' :
           value > 20   ? '#FEB24C' :
           value > 10   ? '#FED976' :
           value > 0    ? '#FFEDA0' :
                      '';
}

function continentsStyle(feature) {
    return {
        fillColor: getContinentColor(feature.properties.continent)
    };
}

function countriesStyle(feature) {
    return {
        weight: 2,  
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0
    };
}

function countriesStyle2(feature) {
    return {
        fillColor: getColor2(feature.properties.ADMIN, "total"),
        weight: 2,  
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function countriesStyle3(feature) {
    return {
        fillColor: getColor2(feature.properties.ADMIN, "2021"),
        weight: 2,  
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function countriesStyle4(feature) {
    return {
        fillColor: getColor2(feature.properties.ADMIN, "netflix"),
        weight: 2,  
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function highlightFeature2(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties, "total");
}

function highlightFeature3(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties, "2021");
}

function highlightFeature4(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties, "netflix");
}

function resetHighlight(e) {
    countriesGeojson.resetStyle(e.target);
    info.update();
}

function resetHighlight2(e) {
    countries2Geojson.resetStyle(e.target);
    info.update();
}

function resetHighlight3(e) {
    countries3Geojson.resetStyle(e.target);
    info.update();
}

function resetHighlight4(e) {
    countries4Geojson.resetStyle(e.target);
    info.update();
}

function onEachCountryFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

function onEachCountryFeature2(feature, layer) {
    layer.on({
        mouseover: highlightFeature2,
        mouseout: resetHighlight2
    });
}

function onEachCountryFeature3(feature, layer) {
    layer.on({
        mouseover: highlightFeature3,
        mouseout: resetHighlight3
    });
}

function onEachCountryFeature4(feature, layer) {
    layer.on({
        mouseover: highlightFeature4,
        mouseout: resetHighlight4
    });
}

function onMapClick(e) {
    popup.setLatLng(e.latlng)
            .setContent("Estas al punt " + e.latlng.toString())
            .openOn(map);
}

function onOverlayAdd(e){
    console.log(e)
    switch(e.name)
    {
        case "Continents":
            legendContinents.addTo(map)
            break;
        case "Paisos":
        case "Pellicules totals paisos":
        case "Pellicules paisos Netflix":
        case "Pellicles paisos 2021":
            info.addTo(map)
            legend2.addTo(map)
            break;
    }
}

function onOverlayDelete(e){
    console.log(e)
    switch(e.name)
    {
        case "Continents":
            legendContinents.remove()
            break;
        case "Paisos":
        case "Pellicules totals paisos":
        case "Pellicules paisos Netflix":
        case "Pellicles paisos 2021":
            info.remove()
            legend2.remove()
            break;
    }
}