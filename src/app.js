//Variables initialization 
import Shows from "./shows"
import UI from "./ui"
let ui = new UI();
let shows = new Shows() 
let appState = 'info';
const toolbar = document.querySelector('.player-controls');

// -------------------------------- PLAYER SETTINGS ----------------------------------

//Create the object for media playback
function createPlayerObject(){
    var objElem = document.createElement('object');
    objElem.type = 'application/avplayer';
    objElem.id = 'av-obj';
    objElem.setAttribute('style', 'position:absolute; left:0px; top:0px; width: 1920px; height: 1080px;'); //esto
    //Append the object element to your document
    document.body.appendChild(objElem);
}


//Initialize the player 
 function initializePlayer(alreadyCreated) {

    //Set Listeners
   !alreadyCreated && createPlayerObject();
    
    //webapis.avplay.open('http://www.streambox.fr/playlists/test_001/stream.m3u8');
    webapis.avplay.open('http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8');
    webapis.avplay.prepareAsync(function(){
        playVideo();
        getVideoDuration();
        webapis.avplay.setListener(listener);
    });	
    
    //Player visual setup (Height, width, etc)
    
    // Base resolution of avplay
    var avplayBaseWidth = 1920;
    // Calculate ratio to base resolution
    var ratio = avplayBaseWidth / window.document.documentElement.clientWidth;

    // Convert rectangle to base resolution
    var newLeft = 0 * ratio;
    var newTop = 0 * ratio;
    var newWidth = 1920 * ratio; //esto
    var newHeight = 1080   * ratio; //esto

    webapis.avplay.setDisplayRect(newLeft,newTop,newWidth,newHeight);
};

//Plays the video, in case there was an error, it is shown on the console
var playVideo = function() {
	    try {
            if(webapis.avplay.getState()== "IDLE"){
                initializePlayer(true)
                console.log("ENTRO AQUI")
            }
            else {
                webapis.avplay.play();
            }
	    } catch (e) {
	        console.log("Current state: " + webapis.avplay.getState());
	        console.log(e);
	    }
    };
    
//Set the Listeners
var listener = { 
   //While the video is running, show its progress on the controller
    oncurrentplaytime: function(currentTime) {
        getVideoProgress(currentTime);
    },
    //When the video is over, it starts again
    onstreamcompleted : function() { 
        playVideo();			 				 				
    } 
}; 


//---------------------------- PLAYER CONTROLLER SETTINGS------------------------------
 // Figure out if the current element has a next sibling.
// If so, moving focus to it.
function focusNextItem() {
    const item = document.activeElement;
        if (item.nextElementSibling) {
            if(item.nextElementSibling.id!='duration'){
                activate(item.nextElementSibling);
                desactivate(item);
            }
        }
  }

// Figure out if the current element has a previous sibling.
// If so, moving focus to it.
  function focusPreviousItem() {
    const item = document.activeElement;
        if (item.previousElementSibling) {
            if(item.previousElementSibling.id!='progress'){
                activate(item.previousElementSibling);
                desactivate(item);
            }
          }
  }

  function desactivate(item){
    item.style.borderColor='transparent';
  }
  
  // Activate the item, set the focus to it
  function activate(item) {
    //Evitar que se haga focus sobre los labels de progreso y duracion
     if(item.id == 'progress-lbl'|| item.id=='duration-lbl'){
         return;
     } 
    // Set all of the buttons to tabindex -1
    toolbar.querySelectorAll('.player-buttons').forEach((btn) => btn.tabIndex = -1);
    // Make the current button "active"
    item.tabIndex = 0;
    item.focus();
    item.style.borderColor = 'red'; 
  }

  //Get any time in milliseconds and convert it into hrs,mins, or secs
function getTimeData(milliseconds){
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return [hour,minute,seconds];
}
//Gets the duration of the video and sets it on the player controller
 function getVideoDuration(){
     //Get the time data
    let duration = webapis.avplay.getDuration();
    let timeData = getTimeData(duration);
    //Set the duration on the UI
    ui.setDuration(timeData[0],timeData[1],timeData[2]);
 }   

 //Shows the video progress on the player controller
 function getVideoProgress(milliseconds){
    //Get the time data
    let timeData = getTimeData(milliseconds);
     //Set the progress on the UI
    ui.setProgress(timeData[0],timeData[1],timeData[2]);
 }

 //---------------------------- MAIN SETTINGS -------------------------------------

window.onload = function () {
    //Ocultar el player
   // document.getElementById('av-player').style.display = 'none';
    //Crear los 'show elements' obtenidos de la API
    ui.hidePlayerControls(0);
    loadShows();

    //Manejo de botones: LEFT, RIGHT, CENTER
    document.addEventListener('keydown', function (e) {
        if (appState == 'info') {
            switch (e.keyCode) {
                case 10009://back
                    try { tizen.application.getCurrentApplication().exit();} 
                    catch (ignore) { }
                    break
                case 39: //derecha                                                                                                        
                case 37: // Izquierda
                    showCardsMargin();
                    break
                case 13://enter
                    goToPlayer();
                    break
            }
        } else if(appState=='player') {
                switch (e.keyCode) {
                    case 10009://back
                        goBackToMenu();
                        break                                        
                    case 415://Play btn
                        webapis.avplay.play();
                        break
                    case 413://Stop btn
                        webapis.avplay.stop();
                        break
                    case 412://Rewind btn
                        webapis.avplay.jumpBackward(5000);
                        break
                    case 417://FastFoward btn
                        webapis.avplay.jumpForward(5000);
                        break
                    case 19://Pause btn
                        webapis.avplay.pause();
                        break
                    case 38://arriba
                        document.getElementById('pause-btn').focus();
                        ui.showPlayerControls();
                        break 
                    case 40://abajo
                        ui.hidePlayerControls();                  
                    case 39: //derecha
                        focusNextItem();  
                        break                                                                                                      
                    case 37: // Izquierda
                        focusPreviousItem();
                        break
                    case 13://enter
                        let item = document.activeElement;
                        switch (item.id) {
                            case 'play-btn':
                               //webapis.avplay.play();
                               playVideo()
                                break;
                            case 'pause-btn':
                                webapis.avplay.pause();
                                break;
                            case 'stop-btn':
                                webapis.avplay.stop();
                                break;
                            case 'backward-btn':
                                webapis.avplay.jumpBackward(5000);
                                break;
                            case 'foward-btn':
                                webapis.avplay.jumpForward(5000);
                                break;   
                        }
                        break
                }
        }
        
    });
};

//------------------------------ UI SETTINGS ----------------------------------

//Go back to the menu from the player
function goBackToMenu(){
    appState = 'info'
    //loadShows(); //esto
    ui.displayMenu();
    let firstShow= document.getElementById('show-1');
    $.caph.focus.controllerProvider.getInstance().focus(firstShow);
    let item = document.activeElement;
    desactivate(item);
    webapis.avplay.close(); //esto
    ui.hidePlayerControls(); //esto
    let avObj = document.getElementById('av-obj'); //esto
    avObj.parentNode.removeChild(avObj) //esto
}
//Go to the player when a card is entered
function goToPlayer(){
    appState = 'player'
    displayShowInfo();
    ui.hidePlayerControls();
    ui.displayPlayer();
    initializePlayer();
}
//Simulate the show cards navigation
function showCardsMargin(){
    let isSomethingFocused = document.querySelector(".contents .focused");
    if (!isSomethingFocused) {
        return;
     }
    let row = isSomethingFocused.parentNode;
    let childrenNumber = row.children.length
    let index = parseInt(isSomethingFocused.getAttribute("index") || 0);
    let newMargin = "-" + (300 * index) + "px";
    if (index==4 || index==5 || index==6 || index == 7 || index==8 || index==9) {
        //dejar de sumar al margin
        newMargin = '-'+1200+'px';
    }
    if (childrenNumber - 1 == index) {
        return
    }
    row.style.marginLeft = newMargin;
}



//Create the each show element
function loadShows() {
    //get all shows from API 
    shows.getShows().then(function (data) {
        let showsArray1 = data.slice(0, 10);
        let showsArray2 = data.slice(10, 20);
        let array1Length = showsArray1.length;

        showsArray1.forEach((showInfo, index) => {
            ui.createElements1(showInfo,index,array1Length);
        });

        showsArray2.forEach((showInfo, index) => {
            ui.createElements2(showInfo,index);
        });
    });
}



//Get the id of the focused item
function getShowId(){
    let focusedItem = $.caph.focus.controllerProvider.getInstance().getCurrentFocusItem();
    let focusedId = focusedItem.getAttribute('id');
    let idSplit = focusedId.split('show-');
    var showId = idSplit[1];
    return showId;
}

//Display the show info everytime a show is focused(title, summary)
function displayShowInfo() {
    let showId = getShowId();
    //Obtener la informacion del show con ese id
    Shows.getShowInfo(showId).then(function(data) {
        ui.displayInfo(data);
        ui.displayShowNamePlayer(data);
    });
}

//Caph initialization
$(document).ready(function () {
    $.caph.focus.activate(function (nearestFocusableFinderProvider, controllerProvider) {
        controllerProvider.onFocused(function (event, originalEvent) {
            setTimeout(() => {
                    displayShowInfo(); 
            }, 500);
        });
        controllerProvider.onSelected(function (event, originalEvent) {
            $(event.currentTarget).toggleClass("selected");
        });
    });
}
);


