//Clase que maneja la informacion obtenida de la API
 class Shows{
    constructor(){
        this.shows_count = 20;
    }

    //Get all shows information (array of all shows)
    async  getShows(){
        const allShowsResponse = await fetch(`http://api.tvmaze.com/shows`);
        const allShowsData = await allShowsResponse.json();
        return allShowsData;  
    }

    //Get the information of a specific show
    static async  getShowInfo(showNumber){
        const showResponse = await fetch(`http://api.tvmaze.com/shows/${showNumber}`);
        const showData = await showResponse.json();
        return showData;  
    }
}

export default Shows;