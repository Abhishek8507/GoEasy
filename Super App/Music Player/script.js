const songs = [
    {
        name: "Shree Ganesha",
        film: "Agneepath",
        imageSrc:"image/deva_shree_ganesha.jpg",
        audioSrc:"music/deva_shree_ganesha.mp3"
    },
    {
        name: "Tum Mile",
        film: "Tum Mile",
        imageSrc:"image/tum_mile.jpg",
        audioSrc:"music/tum_mile.mp3"
    },
    {
        name: "Ajab Si",
        film: "Om Shanti Om",
        imageSrc:"image/ajab_si.jpg",
        audioSrc:"music/ajab_si.mp3"
    },
    {
        name: "Rang Sharbaton Ka",
        film: "Phata Poster Nikla Hero",
        imageSrc:"image/rang_sharbaton_ka.jpg",
        audioSrc:"music/rang_sharbaton_ka.mp3"
    }
]

var sidebar_song_list = "";
for(i=0; i<songs.length; i++)
{
    sidebar_song_list += `<p class="child" data-index=${i}>${songs[i].name}</p>`; //data index is used to know which song to play, song.name is used to enter the song name in html code
    //data-index: here data is dataset and index is variable in the dataset. You can use multiple dataset varialble on same html line
}


const play = document.querySelector('#play');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

const title = document.querySelector('.title');
const film = document.querySelector('.film');
const img = document.querySelector('img');

const music = document.querySelector('audio');

const sidebar = document.querySelector('.sidebar');
const hamburger = document.querySelector('.hamburger');
const options = document.querySelector('.inner-options');
const option_name = document.querySelector('.option-name');
options.innerHTML = sidebar_song_list;

const sidebar_songs = document.querySelectorAll('.child');
let songIndex = 0;

// Use of object = We can create own index name;
// const song = {
//     name: "Tum Mile",
//     film: "Emran Hashmi",
//     imageSrc:"image/deva_shree_ganesha.jpg",
//     audioSrc:"music/deva_shree_ganesha.mp3"
// }
// To use object's value call song.property_name -> Ex: song.name, song.film
// Alternative: To use object's value call song["property_name"] -> Ex: song['name'], song['film']


let isPlaying = false;

function pauseMusic(){
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause','fa-play');
    img.classList.remove('anime');

}

function playMusic(){
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play','fa-pause');
    img.classList.add('anime');
}

play.addEventListener('click',function(){

    if(isPlaying)
     pauseMusic();
    else
     playMusic();
    // music.play();
    // play.classList.replace('fa-play','fa-pause');
    // img.classList.add('anime');
});

function loadSongs(curr_song, playing=isPlaying){
    // Statements
    console.log(curr_song);
    title.innerText = curr_song.name;
    film.innerText = curr_song.film;
    music.src = curr_song.audioSrc;
    img.src = curr_song.imageSrc;
    
    for(i=0; i<sidebar_songs.length; i++)
    {
        sidebar_songs[i].classList.remove("pressed");
        if(sidebar_songs[i].dataset.index == songIndex)
        sidebar_songs[i].classList.add("pressed");
    }
    if(playing)
        playMusic();
    else
        pauseMusic();
}

function playNextMusic(){
    songIndex = (songIndex+1)%songs.length;
    loadSongs(songs[songIndex]);

}

music.addEventListener('ended',playNextMusic);

next.addEventListener('click',function()
{
    playNextMusic();
})

prev.addEventListener('click',function()
{
    songIndex = (songIndex-1+songs.length)%songs.length;
    loadSongs(songs[songIndex]);
})

hamburger.addEventListener('click',function(){
    if(hamburger.classList.contains('fa-bars'))
        hamburger.classList.replace('fa-bars','fa-times')
    else
        hamburger.classList.replace('fa-times','fa-bars')
    
    sidebar.classList.toggle('close');
})

for(i=0; i<sidebar_songs.length; i++)
{
    sidebar_songs[i].addEventListener('click',function(e){
        songIndex = e.srcElement.dataset.index;
        loadSongs(songs[songIndex],true);
    })
}

option_name.addEventListener('click',() => {
    options.classList.toggle('open-option');
})

loadSongs(songs[songIndex]);