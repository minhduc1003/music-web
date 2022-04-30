// var api = 'https://mp3.zing.vn/xhr/recommend?type=audio&id=ZW67OIA0';   
// fetch(api)
//  .then((response)=>response.json())
//  .then((post)=>{console.log(post)})
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const playlist = $('.recently-played-songs')
const heading = $('.song-playing-name')
const nameSinger = $('.song-playing-title')
const audio = $('.audio')
const btnplay = $('.btn-toggle-play')
const progress = $('.progress')
const songPlayingImg = $('.song-playing-img')
const forward = $('.forward')
const rewind = $('.rewind')
const repeat = $('.btn-repeat')
const randomElement = $('.btn-random')
const app={
    currentIndex:2,
    isPlay: false,
    isRepeat:false,
    isRandom:false,
    songs:[
    {
       nameSong: "Ái Nộ",
        singer: "Masew x KhoiVu",
        path: "./music/AiNo1-MasewKhoiVu-7078913.mp3",
        image: "https://i1.sndcdn.com/artworks-Zfn19xykwtjKQXGr-o3D3yQ-t500x500.jpg",
        star: '4'
      },
      {
       nameSong: "Cưới Thôi",
        singer: "MasewMasiu x BRay",
        path: "./music/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3",
        image:
          "https://i.scdn.co/image/ab67616d0000b273354d3d04579c8ca606cee563",
          star: '3'
      },
      {
       nameSong: "Đau Nhất Là Lặng Im",
        singer: "ERIK",
        path: "./music/DauNhatLaLangIm-ERIK-7130326.mp3",
        image: "https://media.travelmag.vn/files/content/2022/02/14/dnlli_er-10145693.jpg",
        star: '4'
      },
      {
       nameSong: "Hạ Còn Vương Nắng",
        singer: "DatKaa",
        path: "./music/HaConVuongNang-DatKaa-7004769.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/d/8/0/1/d801670cd8ecdb89750bdbe8de198021.jpg",
          star: '4'
      },
      {
       nameSong: "Ngày Đầu Tiên",
        singer: "Đức Phúc",
        path: "./music/NgayDauTien-DucPhuc-7129810.mp3",
        image:
          "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2022/02/faa13fe1-57f2-4333-9025-d5262a68425e-5570.jpeg?fit=660%2C20000&quality=95&ssl=1",
          star: '5'
      },
      {
       nameSong: "See Tình",
        singer: "Hoàng Thùy Linh",
        path: "./music/SeeTinh-HoangThuyLinh-7130526.mp3",
        image:
          "https://image.thanhnien.vn/w1024/Uploaded/2022/lxwpcqjwp/2022_03_02/anh-2-7429.jpg",
          star: '5'
      }],
      songPlaying: function(){
        heading.textContent = this.currentsong.nameSong
        nameSinger.textContent = this.currentsong.singer
        audio.src =this.currentsong.path
        songPlayingImg.src = this.currentsong.image


      },
      hendleEvents: function(){
       const _this = this
       // phat nhac
       btnplay.onclick = function(){
           if (_this.isPlay){
               audio.pause()
           }
           else{
               audio.play()
           }
           audio.onplay = function(){
               _this.isPlay = true;
               btnplay.classList.add('playing')
           }
           audio.onpause = function(){
             _this.isPlay = false;
             btnplay.classList.remove('playing')
            }
          }
           // tua 
           audio.ontimeupdate = function(){
             if(audio.duration){
               const currentTimeSong = audio.currentTime / audio.duration * 100
               progress.value = currentTimeSong
             }
             progress.oninput = function(e){
              const seekTime = audio.duration/100* e.target.value
              audio.currentTime = seekTime
             }
            // nextsong
            forward.onclick = function(){
              if(_this.isRandom){
                _this.randomPlaylist()
              }else{

                _this.nextbtn()
              }
              audio.play()
              _this.render()
            }
            // prev song
            rewind.onclick = function(){
              if(_this.isRandom){
                _this.randomPlaylist()
              }else{

                _this.prevBtn()
              }
              audio.play()
              _this.render()
            }
            audio.onended = function(){
              if(_this.isRepeat){
                audio.play()
              }else{
                forward.onclick()
              }
            }
            repeat.onclick = function(){
              _this.isRepeat = !_this.isRepeat
              this.classList.toggle('active',_this.isRepeat)
            }
            randomElement.onclick = function(){
              _this.isRandom = !_this.isRandom
              this.classList.toggle('active',_this.isRandom)
              
            }

       }
    
      },
      render: function(){
        const htmls = this.songs.map(function(song,index){
            return `
            <div class="recently-played-song-block">
                <img class="recently-played-song-img" src="${song.image}" alt="">
                         <div class="position-song-detail" >
                             <h3 class="recently-played-song-name">${song.nameSong}</h3>
                 <p class="recently-played-song-singer" > ${song.singer}</p>
                        </div>
            </div>
        <div class="recently-played-song-rv">
            <p class="recently-played-song-time">3:24</p>
            <p class="rv">${song.star}</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="recently-played-song-star" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
        </div>
        
       `
        })
        playlist.innerHTML = htmls.join('')
      },
      randomPlaylist: function(){
        let randomValue
        do{
          randomValue = Math.floor(Math.random()* this.songs.length)
        }
        while(
          randomValue === this.currentIndex
        )
        this.currentIndex = randomValue
        this.songPlaying()
      },
      prevBtn: function(){
        this.currentIndex--
        if(this.currentIndex <0){
          this.currentIndex = 5
        }
        this.songPlaying()
      },
      nextbtn: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
          this.currentIndex = 1 
        }
        this.songPlaying()
      },
      defineProperty: function(){
          Object.defineProperty(this,'currentsong',{
              get: function(){
                  return this.songs[this.currentIndex]
              }
          })
      },
      start: function(){
        this.defineProperty()
        this.render()
        this.hendleEvents()
        this.songPlaying()

      }
}
app.start()