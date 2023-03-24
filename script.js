(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        setTimeout(updateClock, 1000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 12) {
                if (h < 10) {
                h = "0" + h;
                }

                if (m < 10) {
                m = "0" + m;
                }

                if (s < 10) {
                s = "0" + s;
                }

                c.innerHTML = h + ":" + m + ":" + s + " EL";
            } else if (h >= 12) {
                if (m < 10) {
                    m = "0" + m;
                }
    
                if (s < 10) {
                    s = "0" + s;
                }

                if(h != 12) {
                   h = h - 12;
                }
                
                c.innerHTML = h + ":" + m + ":" + s + " PL";
            } 
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0.00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();
        
        let delivery = 0;

        let kingitus = document.getElementById("v1");
        let kontaktivaba = document.getElementById("v2");

        let linn = document.getElementById("linn");

        let radio1 = document.getElementById("r1");
        let radio2 = document.getElementById("r2");

        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");

        if (fname.value === "" || lname.value === ""){
            alert("Palun sisetage oma nimi");
            return;
        } else if (/\d/.test(fname.value) == true || /\d/.test(lname.value) == true){
            alert("Nimi ei tohi sisaldada numberid, kontrollige sisendit");
        }
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else if (linn.value == "tln") {
            delivery += 0;
        } else if (linn.value == "trt") {
            delivery += 2.5;
        } else if (linn.value == "nrv") {
            delivery += 2.5;    
        } else if (linn.value == "prn") {
            delivery += 3;
        }
        
        if (kingitus.checked == true){
            delivery += 5;
        }

        if (kontaktivaba.checked == true){
            delivery += 1;
        }
        
        if (radio1.checked == false && radio2.checked == false) {
            alert("Palun valige tarneviis")

            linn.focus();
            
            return;
        }

        e.innerHTML = delivery + "&euro;";
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;
let infobox;

function GetMap() {
    let lat1 = 58.38104;
    let lat2 = 58.38525;
    let long1 = 26.71992;
    let long2 = 24.48852;
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        (lat1 + lat2 )/2, 
        (long1 + long2)/2
    );
    
    let esimenePunkt = new Microsoft.Maps.Location(
        58.38104, 
        26.71992
    );
    
    let teinePunkt = new Microsoft.Maps.Location(
        58.38525, 
        24.48852
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin1 = new Microsoft.Maps.Pushpin(esimenePunkt, {
            title: 'Tartu Ülikool',
            description: 'Hea koht',
            text: 'UT'
        });
    
    let pushpin2 = new Microsoft.Maps.Pushpin(teinePunkt, {
            title: 'Tartu Ülikooli Pärnu Kolledž',
            description: 'Hea koht',
            text: 'PK'
        });
    
    pushpin1.metadata = {
        title: 'Tartu Ülikool',
        description: 'Hea koht'
    }

    pushpin2.metadata = {
        title: 'Tartu Ülikooli Pärnu Kolledž',
        description: 'Hea koht'
    }

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false,
        });
    
    
    infobox.setMap(map);

    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);    

    map.entities.push(pushpin1);
    map.entities.push(pushpin2);

}
//funktsioon võetud: https://learn.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/infoboxes/multiple-pushpins-and-infoboxes
function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

