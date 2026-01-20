// ==========================================
// 1. СОСТОЯНИЕ
// ==========================================
let isSurpriseActive = false;
let mediaList = [];
let currentIndex = 0;

// ==========================================
// 2. НАВИГАЦИЯ ПО СТРАНИЦАМ
// ==========================================
function openPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    const nav = document.querySelector('.nav');
    if (nav) nav.style.display = (pageId === 'welcome') ? 'none' : 'flex';
    window.scrollTo(0, 0);
}

// ==========================================
// 3. СЮРПРИЗ (МЕМЫ)
// ==========================================
function openBirthdayQuest() {
    const modal = document.getElementById('questModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeQuest() {
    const modal = document.getElementById('questModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        isSurpriseActive = false;
    }
}

function startSurprise(videoName) {
    isSurpriseActive = true;
    const questModal = document.getElementById('questModal');
    if (questModal) questModal.style.display = 'none';

    const videoModal = document.getElementById('videoModal');
    const fullVideo = document.getElementById('fullVideo');

    if (videoModal && fullVideo) {
        videoModal.style.display = 'flex';
        fullVideo.src = 'images/' + videoName;
        fullVideo.load();
        fullVideo.play();
        document.body.style.overflow = 'hidden';

        // Скрываем стрелки в сюрпризе через стиль
        videoModal.querySelectorAll('.arrow').forEach(a => a.style.setProperty('display', 'none', 'important'));
    }
}

// ==========================================
// 4. ГАЛЕРЕЯ (ФОТО + ВСЕ ВИДЕО)
// ==========================================

function collectGalleryMedia() {
    mediaList = [];

    // 1. Собираем фото
    document.querySelectorAll('.gallery img').forEach(img => {
        mediaList.push({ type: 'photo', src: img.getAttribute('src') });
    });

    // 2. Собираем видео
    document.querySelectorAll('.video-preview video source').forEach(source => {
        mediaList.push({ type: 'video', src: source.getAttribute('src') });
    });
}

function openPhoto(imgElement) {
    isSurpriseActive = false;
    collectGalleryMedia();
    const targetSrc = imgElement.getAttribute('src');
    currentIndex = mediaList.findIndex(item => item.src === targetSrc);
    updateModal();
}

function openVideo(previewElement) {
    isSurpriseActive = false;
    collectGalleryMedia();
    const source = previewElement.querySelector('source').getAttribute('src');
    // Ищем видео в списке
    currentIndex = mediaList.findIndex(item => item.src === source);
    updateModal();
}

function openHomePhoto(imgElement) {
    isSurpriseActive = false;
    mediaList = [];
    document.querySelectorAll('.home-gallery img').forEach(img => {
        mediaList.push({ type: 'photo', src: img.getAttribute('src') });
    });
    const targetSrc = imgElement.getAttribute('src');
    currentIndex = mediaList.findIndex(item => item.src === targetSrc);
    updateModal();
}

function updateModal() {
    if (mediaList.length === 0) return;
    const item = mediaList[currentIndex];

    const photoModal = document.getElementById('photoModal');
    const videoModal = document.getElementById('videoModal');
    const fullVideo = document.getElementById('fullVideo');

    photoModal.style.display = 'none';
    videoModal.style.display = 'none';
    if (fullVideo) { fullVideo.pause(); fullVideo.src = ""; }

    if (item.type === 'photo') {
        photoModal.style.display = 'flex';
        document.getElementById('fullPhotoImg').src = item.src;
    } else {
        videoModal.style.display = 'flex';
        // Включаем стрелки обратно для видео из галереи
        videoModal.querySelectorAll('.arrow').forEach(a => a.style.setProperty('display', 'block', 'important'));
        fullVideo.src = item.src;
        fullVideo.load();
        fullVideo.play();
    }
    document.body.style.overflow = 'hidden';
}

function nextMedia() {
    if (mediaList.length <= 1 || isSurpriseActive) return;
    currentIndex = (currentIndex + 1) % mediaList.length;
    updateModal();
}

function prevMedia() {
    if (mediaList.length <= 1 || isSurpriseActive) return;
    currentIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
    updateModal();
}

function closePhoto() {
    document.getElementById('photoModal').style.display = 'none';
    document.body.style.overflow = '';
}

function closeVideo() {
    const v = document.getElementById('fullVideo');
    if (v) { v.pause(); v.src = ""; }
    document.getElementById('videoModal').style.display = 'none';

    if (isSurpriseActive) {
        document.getElementById('questModal').style.display = 'flex';
    } else {
        document.body.style.overflow = '';
    }
}

// ==========================================
// 5. АВАТАР И ПЛЕЕР (БЕЗ ИЗМЕНЕНИЙ)
// ==========================================
function showFullAvatar() {
    const modal = document.getElementById("avatarModal");
    const modalImg = document.getElementById("fullAvatarImg");
    const smallImg = document.getElementById("avatarImg");
    if (modal && modalImg && smallImg) {
        modal.style.display = "flex";
        modalImg.src = smallImg.src;
        document.body.style.overflow = 'hidden';
    }
}

function closeFullAvatar() {
    const modal = document.getElementById("avatarModal");
    if (modal) { modal.style.display = "none"; document.body.style.overflow = ''; }
}

const playlist = [
    { name: "Don Omar - Danza Kuduro", src: "music/don-omar-feat-lucenzo_danza-kuduro.mp3", gif: "images/movingcute.gif" },
    { name: "Morandi - Angels", src: "music/Morandi_Angels_-_Morandi_Angels_(mp3.pm).mp3", gif: "images/drawingtghr.gif" },
    { name: "One Direction - You and I", src: "music/one-direction_you-i_.mp3", gif: "images/форпесни.gif" },
    { name: "Riton x Nightcrawlers - Friday", src: "music/riton-x-nightcrawlers_friday-dopamine-re-edit-feat-_.mp3", gif: "images/танцулька.jpg" },
    { name: "One Direction - live young", src: "music/1d.mp3", gif: "images/weare.jpg" },
    { name: "Billie Eilish - Birds", src: "music/Billie.mp3", gif: "images/молодес.jpg" },
    { name: "Ludovico - Una Mattina", src: "music/Una mattina.mp3", gif: "images/красотка.jpg" },
    { name: "Ludovico - experience", src: "music/Ludovico.mp3", gif: "images/wow.jpg" },
    { name: "Feduk - хлопья", src: "music/Feduk.mp3", gif: "images/snow.jpg" },
    { name: "Peder B. Helland - Always", src: "music/01Always.mp3", gif: "images/sogreatful.jpg" }
];

let currentTrackIndex = 0;
const audio = document.getElementById('myAudio');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const progressBar = document.getElementById('progress');
const playlistView = document.getElementById('playlistView');

function renderPlaylist() {
    if (!playlistView) return;
    playlistView.innerHTML = "";
    playlist.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.name;
        li.onclick = () => { currentTrackIndex = index; loadTrack(currentTrackIndex); audio.play(); updateButtonsUI(true); };
        playlistView.appendChild(li);
    });
    updatePlaylistActive();
}

function loadTrack(index) {
    if (!audio || !playlist[index]) return;
    audio.src = playlist[index].src;
    document.getElementById('trackName').textContent = playlist[index].name;
    document.getElementById('coverImg').src = playlist[index].gif;
    updatePlaylistActive();
}

function togglePlayPause() {
    if (audio.paused) { audio.play(); updateButtonsUI(true); }
    else { audio.pause(); updateButtonsUI(false); }
}

function updateButtonsUI(isPlaying) {
    if (playBtn) playBtn.style.display = isPlaying ? 'none' : 'block';
    if (pauseBtn) pauseBtn.style.display = isPlaying ? 'block' : 'none';
}

function nextTrack() { currentTrackIndex = (currentTrackIndex + 1) % playlist.length; loadTrack(currentTrackIndex); audio.play(); updateButtonsUI(true); }
function prevTrack() { currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length; loadTrack(currentTrackIndex); audio.play(); updateButtonsUI(true); }

function updatePlaylistActive() {
    if (!playlistView) return;
    playlistView.querySelectorAll('li').forEach((item, index) => {
        item.classList.toggle('active', index === currentTrackIndex);
    });
}

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return min + ":" + (sec < 10 ? "0" + sec : sec);
}

if (audio) {
    loadTrack(currentTrackIndex);
    renderPlaylist();
    audio.addEventListener('timeupdate', () => {
        if (progressBar) progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
        document.getElementById('currentTime').textContent = formatTime(audio.currentTime);
        if (audio.duration) document.getElementById('duration').textContent = formatTime(audio.duration);
    });
    audio.addEventListener('ended', nextTrack);
}

if (progressBar) {
    progressBar.addEventListener('input', () => {
        const time = (progressBar.value / 100) * audio.duration;
        audio.currentTime = time;
    });
}