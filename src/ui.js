//Clase que maneja funciones relacionadas a la UI 
class UI{
    constructor(){
        //Main menu UI Elements
        this.containerAll = document.getElementById('all-content');
        this.container0 = document.getElementById('container0');
        this.container = document.getElementById('container');
        this.title = document.getElementById('show-title');
        this.language = document.getElementById('language');
        this.rating = document.getElementById('rating');
        this.summary = document.getElementById('summary');
        this.titleSummary = document.getElementById('title-summary');
        this.backgroundImage = document.getElementById('bg-image');

        //Player UI Elements
        this.player = document.getElementById('av-player');
        this.infoControls = document.getElementById('show-info-controls');
        this.playBtn = document.getElementById('play-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.backwardBtn = document.getElementById('backward-btn');
        this.fowardBtn = document.getElementById('foward-btn');
        this.playerShowTitle = document.getElementById('player-show-title');
        this.duration = document.getElementById('duration-lbl');
        this.progress =document.getElementById('progress-lbl');
    }
    
    createElements1(showInfo,index,array1Length){
         //Creando el div focusable  
         const div = document.createElement('div');
         div.className = 'card';
         div.setAttribute('focusable', 'focusable');
         div.setAttribute('index', index);
         div.setAttribute('id', `show-${showInfo.id}`);
         if (showInfo.id == 1) {
             div.setAttribute('data-focusable-initial-focus', 'true')
             setTimeout(function () {
                 //cambiar el focus a un determinado elemento
                 $.caph.focus.controllerProvider.getInstance().focus(div); 
             }, 500);
         } 
         if (showInfo.id == array1Length) {
             div.setAttribute('data-focusable-next-focus-right','null');
         }
         //Creando la imagen 
         const img = document.createElement('img');
         img.className = 'show-image';
         img.setAttribute('src', `${showInfo.image.medium}`);
         //Agregando elementos a sus respectivos parentNodes
         div.appendChild(img);
         this.container0.appendChild(div);
    }

    createElements2(showInfo,index){
        //Creando el div focusable  
        const div = document.createElement('div');
        div.className = 'card';
        div.setAttribute('focusable', 'focusable')
        div.setAttribute('index', index);
        div.setAttribute('id', `show-${showInfo.id}`);
        if (showInfo.id == 11) {
            div.setAttribute('data-focusable-next-focus-left','null');
         }
         if (showInfo.id == 21) {
            div.setAttribute('data-focusable-next-focus-right','null');
         }

        //Creando la imagen 
        const img = document.createElement('img');
        img.className = 'show-image';
        img.setAttribute('src', `${showInfo.image.medium}`);
        //Agregando elementos a sus respectivos parentNodes
        div.appendChild(img);
        this.container.appendChild(div);
    }

    //Display on the UI the info of a specific show
    displayInfo(showData){
        //Mostrar informacion
        this.title.innerHTML = `${showData.name}`;
        this.language.innerHTML = `${showData.language}`;
        this.rating.innerHTML = `Rating: ${showData.rating.average}/10`;
        this.summary.innerHTML = `${showData.summary}`;
        
        //Mostrar imagen de fondo
        const bgImage = this.backgroundImage;
        bgImage.setAttribute('src', `${showData.image.original}`);
    }
    //Display the show name in the player
    displayShowNamePlayer(showData){
        this.playerShowTitle.innerHTML = `${showData.name}`;
    }

    //Show the player when a show card is entered
    displayPlayer(){
        this.containerAll.style.display = 'none';
        this.pauseBtn.focus();
        this.pauseBtn.style.borderColor = 'red';
    }
    //Show the show menu when the back button is pressed on the player
    displayMenu(){
        this.containerAll.style.display = 'inline-block';
       // this.player.style.display ='none'; //esto
    }

    //Display the duration of the video on the player
    setDuration(finalHours,finalMinutes,finalSeconds){
        if (finalMinutes<10) {
            finalMinutes = '0'+`${finalMinutes}`;
        }
        if (finalSeconds<10) {
            finalSeconds = '0'+`${finalMinutes}`;
        }
        if (finalHours == 0) {
            this.duration.innerHTML = `${finalMinutes}:${finalSeconds}`;
        }else{
        this.duration.innerHTML = `${finalHours}:${finalMinutes}:${finalSeconds}`;
        }
    }
    //Show the video timing progrss on the player
    setProgress(finalHours,finalMinutes,finalSeconds){
        if (finalMinutes<10) {
            finalMinutes = '0'+`${finalMinutes}`;
        }
        if (finalSeconds<10) {
            finalSeconds = '0'+`${finalSeconds}`;
        }
        if (finalHours == 0) {
            this.progress.innerHTML = `${finalMinutes}:${finalSeconds}`;
        }else{
            this.progress.innerHTML = `${finalHours}:${finalMinutes}:${finalSeconds}`;
        }
    }

    //Show the player controls when the up key is pressed
    showPlayerControls(){
        this.infoControls.style.display = 'block';
        this.stopBtn.style.borderColor = 'transparent';
        this.playBtn.style.borderColor = 'transparent';
        this.backwardBtn.style.borderColor = 'transparent';
        this.fowardBtn.style.borderColor = 'transparent';
        this.pauseBtn.focus();
        this.pauseBtn.style.borderColor = 'red';
        
    }

    //Hide the player controls when the video is played 
    //and when the down key is pressed
    hidePlayerControls(){
        this.pauseBtn.focus();
        this.infoControls.style.display = 'none'
    }
}

export default UI;
