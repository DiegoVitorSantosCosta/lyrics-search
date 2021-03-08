class Music{

    // MELHORAR O CODICO DEPOIS
    constructor(){
       this.urlApi = `https://api.lyrics.ovh`
       this.form = document.querySelector('#form')
       this.search = document.querySelector('#search')
       this.songContainer = document.querySelector('#songs-container')
       this.prevAndNext = document.querySelector('#prev-and-next-container')
       this.btns = document.querySelector('#prox')
       this.begin()
       
    }

    begin(){
        this.submit(this.form)
   
    }

    submit(value){

    value.addEventListener('submit',event=>{
        event.preventDefault()

        // o metodo trim retira todos os espaços em brancos digitados
        const stringMusic = this.search.value.trim()
        if(!stringMusic){
            this.songContainer.innerHTML = `<li class = 'warning-message'>Por favor,digite alguma letra !</li>`

            // o return esta aqui para não executar os codigos abaixo desse if
            return
        }
        
        this.fetchSong(stringMusic)
        
        
    })
    
    this.songContainer.addEventListener('click',event=>{
        let click = event.target
        if(click.tagName === 'BUTTON'){
            let artist = click.getAttribute('data-artist')
            let song = click.getAttribute('data-song-title')
           
            this.prevAndNext.innerHTML = ``
            this.fetchLyrics(artist,song)
            
        }
    })

    }
    fetchSong(lyrics){

        // fetch faz um requisição ajax no browser,passamos alguns parametros para a url
        // o método fetch retorna uma promesse com objeto response
        

        fetch(`${this.urlApi}/suggest/${lyrics}`)
        .then(response=> response.json())
  

        // data vai retorna um objeto com informações da api
        .then(data =>{
            this.insertSongIntoPage(data)
         
            
        })
       

    }

    insertSongIntoPage(value){
       
    //    console.log(value.data.map(song=> song.artist.name));
        // o map ele trabalha com array,e recebe como parametro uma arrow function
        // para cada item do array ele executa uma função, e retorna o mesmo array com as funções aplicadas.
        
     
        this.songContainer.innerHTML  = value.data.map(song =>  `
        <li class='song'> 
            <span class='song-artist' > <strong> ${song.artist.name}   </strong> ${song.title}</span>
            <button class='btn' data-artist = '${song.artist.name}' data-song-title = '${song.title}'>Ver letra</button>
        </li>
        
        `).join('')
      
       
        if(value.prev || value.next){
            this.prevAndNext.innerHTML = `
            ${value.prev ? `<button class = "btn" onClick="getMoreSongs('${value.prev}')"  >Anteriores</button>` : ''}
            ${value.next ? `<button id='prox' class = 'btn' onClick = "getMoreSongs('${value.next}')" >Proxímas</button>` : ''}
            `  
            
           
            return
        }

        this.prevAndNext.innerHTML = ''
      
    }

    fetchLyrics(artist,song){
       
      
        
        fetch(`${this.urlApi}/v1/${artist}/${song}`)
        .then(response=> response.json())
        // data vai retorna um objeto com informações da api
        .then(data =>{

            let lyrics1 = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');
            console.log(lyrics1);
            this.songContainer.innerHTML = `
            <li class='lyrics-container' >
             <h2>  <strong>${song}</strong> - ${artist} </h2>
            <p class=''> ${lyrics1}</p>
            </li>
            `
            
            
        })

    }

}

window.music = new Music()