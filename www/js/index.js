/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        } else {
            this.onDeviceReady();
        }

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {

    // var slideMenuButton = document.getElementById('slide-menu-button');
    // slideMenuButton.onclick = function(e) {
    //     console.log('qwe');
    //     var site = document.getElementById('app');
    //     var cl = site.classList;
    //     if (cl.contains('open-left-menu')) {
    //         cl.remove('open-left-menu');
    //     } else {
    //         cl.add('open-left-menu');
    //     }
    // };


 var showCodeDivs = document.getElementsByClassName('showcode');
for (var i = showCodeDivs.length - 1; i >= 0; i--) {
showCodeDivs[i].firstChild.onclick = function(e) {
var element = e.target.parentNode.nextSibling.nextSibling;
var style = window.getComputedStyle(element);
if(style.getPropertyValue('display') == 'none'){
e.target.innerHTML = 'Hide code snippets';
element.style.display = 'block';
} else {
e.target.innerHTML = 'Show code snippets';
element.style.display = 'none';
}
return false;
};
};
var slideMenuButton = document.getElementById('slide-menu-button');
slideMenuButton.onclick = function(e) {
var site = document.getElementById('site');
var cl = site.classList;
if (cl.contains('open')) {
cl.remove('open');
} else {
cl.add('open');
}
};

//console.log(angular.element(document.getElementById('map')));
//console.log(window.innerHeight);
//console.log(document.getElementById('map').offsetTop);

var mapEL=document.getElementById('map');
mapEL.style.height=(window.innerHeight-mapEL.offsetTop)+"px";

var map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © OpenStreetMap contributors'
        }).addTo(map);

var polygon = L.polyline([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).on('click', function(e) {
console.log('click '+e.latlng);
    //alert(e.latlng); // e is an event object (MouseEvent in this case)
});
polygon.addTo(map);


window.onresize=function(){
var mapEL=document.getElementById('map');
mapEL.style.height=(window.innerHeight-mapEL.offsetTop)+"px";
map.invalidateSize(true);
};


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
