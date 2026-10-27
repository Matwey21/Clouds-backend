import React, { useState } from 'react';
import { Play, Pause, Volume2, Heart, Share2, Download, X, Settings, ChevronRight } from 'lucide-react';

export default function MusicPlayer() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentFilter, setCurrentFilter] = useState('day');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentVolume, setCurrentVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [likedTracks, setLikedTracks] = useState([]);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileTracks, setProfileTracks] = useState([]);

  const [profile, setProfile] = useState({
    username: 'Music Lover',
    avatar: null,
    avatarFile: '👤',
    banner: null,
    bannerFile: '🎵',
    bio: 'Welcome to my music collection',
    gifs: ['🎵', '🎶', '♪', '♫'],
    followers: 1234,
    following: 567
  });

  const [editProfile, setEditProfile] = useState({ ...profile });

  // Реальные треки с разных платформ
  const allTracks = [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', source: 'Spotify', plays: '4.2B', duration: '3:20', image: '🎸' },
    { id: 2, title: 'As It Was', artist: 'Harry Styles', source: 'Spotify', plays: '2.8B', duration: '2:17', image: '✨' },
    { id: 3, title: 'Shape of You', artist: 'Ed Sheeran', source: 'Spotify', plays: '3.5B', duration: '3:53', image: '💝' },
    { id: 4, title: 'Good as Hell', artist: 'Lizzo', source: 'Apple Music', plays: '1.9B', duration: '4:09', image: '🎤' },
    { id: 5, title: 'Levitating', artist: 'Dua Lipa', source: 'Deezer', plays: '2.2B', duration: '3:23', image: '🌟' },
    { id: 6, title: 'Sunroof', artist: 'Nicky Youre', source: 'SoundCloud', plays: '892M', duration: '2:58', image: '☀️' },
    { id: 7, title: 'Flowers', artist: 'Miley Cyrus', source: 'Spotify', plays: '1.5B', duration: '3:20', image: '🌸' },
    { id: 8, title: 'Anti-Hero', artist: 'Taylor Swift', source: 'Apple Music', plays: '1.1B', duration: '3:20', image: '👑' },
    { id: 9, title: 'Heat Waves', artist: 'Glass Animals', source: 'Spotify', plays: '2.1B', duration: '3:59', image: '🌊' },
    { id: 10, title: 'Starboy', artist: 'The Weeknd ft. Daft Punk', source: 'Spotify', plays: '1.8B', duration: '3:50', image: '⭐' },
    { id: 11, title: 'Dance The Night', artist: 'Dua Lipa', source: 'Deezer', plays: '900M', duration: '2:33', image: '💃' },
    { id: 12, title: 'Bohemian Rhapsody', artist: 'Queen', source: 'Яндекс Музыка', plays: '850M', duration: '5:55', image: '🎭' }
  ];

  // Подборки
  const tracksOfDay = allTracks.slice(0, 4);
  const tracksOfWeek = allTracks.slice(0, 8);
  const tracksOfYear = allTracks;

  const getFilteredTracks = () => {
    switch(currentFilter) {
      case 'day': return tracksOfDay;
      case 'week': return tracksOfWeek;
      case 'year': return tracksOfYear;
      default: return tracksOfDay;
    }
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === 'avatar') {
          setEditProfile({ ...editProfile, avatar: event.target.result });
        } else if (type === 'banner') {
          setEditProfile({ ...editProfile, banner: event.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
  };

  const toggleLike = (trackId) => {
    if (likedTracks.includes(trackId)) {
      setLikedTracks(likedTracks.filter(id => id !== trackId));
    } else {
      setLikedTracks([...likedTracks, trackId]);
    }
  };

  const addToProfile = (track) => {
    if (!profileTracks.find(t => t.id === track.id)) {
      setProfileTracks([...profileTracks, track]);
    }
  };

  const removeFromProfile = (trackId) => {
    setProfileTracks(profileTracks.filter(t => t.id !== trackId));
  };

  const saveProfileChanges = () => {
    setProfile({ ...editProfile });
    setShowProfileEdit(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-95 backdrop-blur-sm border-b border-gray-700 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              ♪ SoundHub
            </div>
            <nav className="hidden md:flex gap-8">
              <button
                onClick={() => { setCurrentPage('home'); setCurrentFilter('day'); }}
                className={`pb-2 font-medium transition ${
                  currentPage === 'home'
                    ? 'border-b-2 border-orange-500 text-orange-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setCurrentPage('likes')}
                className={`pb-2 font-medium transition ${
                  currentPage === 'likes'
                    ? 'border-b-2 border-orange-500 text-orange-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Избранное
              </button>
              <button
                onClick={() => setCurrentPage('profile')}
                className={`pb-2 font-medium transition ${
                  currentPage === 'profile'
                    ? 'border-b-2 border-orange-500 text-orange-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Профиль
              </button>
            </nav>
          </div>
          <input
            type="text"
            placeholder="Поиск треков..."
            className="hidden md:block px-4 py-2 bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
          />
        </div>
      </header>

      <div className="pt-24 pb-40 max-w-7xl mx-auto px-4">
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div>
            <div className="mb-8">
              <h1 className="text-5xl font-bold mb-2">Треки дня, недели, года</h1>
              <p className="text-gray-400">Откройте лучшую музыку со всех платформ</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setCurrentFilter('day')}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  currentFilter === 'day'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                📅 Треки дня
              </button>
              <button
                onClick={() => setCurrentFilter('week')}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  currentFilter === 'week'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                📊 Треки недели
              </button>
              <button
                onClick={() => setCurrentFilter('year')}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  currentFilter === 'year'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                🏆 Треки года
              </button>
            </div>

            {/* Tracks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {getFilteredTracks().map((track, idx) => (
                <div
                  key={track.id}
                  className="group bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition cursor-pointer hover:shadow-lg hover:shadow-orange-500/20"
                >
                  <div className="relative h-40 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-6xl group-hover:scale-105 transition">
                    {track.image}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center">
                      <button
                        onClick={() => handlePlayTrack(track)}
                        className="opacity-0 group-hover:opacity-100 transition transform scale-50 group-hover:scale-100"
                      >
                        <div className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full">
                          <Play size={24} fill="white" />
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white mb-1 truncate text-sm">{track.title}</h3>
                    <p className="text-gray-400 text-xs mb-2 truncate">{track.artist}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="bg-orange-900 bg-opacity-50 px-2 py-1 rounded">{track.source}</span>
                      <span>{track.duration}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePlayTrack(track)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium text-xs transition flex items-center justify-center gap-1"
                      >
                        <Play size={12} /> Play
                      </button>
                      <button
                        onClick={() => toggleLike(track.id)}
                        className={`p-2 rounded transition ${
                          likedTracks.includes(track.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <Heart size={14} fill={likedTracks.includes(track.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => addToProfile(track)}
                        className="p-2 rounded transition bg-gray-700 text-gray-300 hover:bg-gray-600"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">👂 {track.plays}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LIKES PAGE */}
        {currentPage === 'likes' && (
          <div>
            <h1 className="text-4xl font-bold mb-6">❤️ Ваше избранное</h1>
            {likedTracks.length === 0 ? (
              <div className="text-center py-20 bg-gray-800 rounded-lg">
                <Heart size={64} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">Вы еще не добавили треки в избранное</p>
              </div>
            ) : (
              <div className="space-y-3">
                {allTracks
                  .filter(t => likedTracks.includes(t.id))
                  .map((track, idx) => (
                    <div
                      key={track.id}
                      className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex items-center justify-between transition group"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span className="text-gray-500 font-bold text-lg w-8">{idx + 1}</span>
                        <div className="text-4xl flex-shrink-0">{track.image}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white truncate">{track.title}</h3>
                          <p className="text-gray-400 text-sm truncate">{track.artist} • {track.source}</p>
                        </div>
                        <div className="text-gray-500 text-sm">{track.duration}</div>
                      </div>
                      <button
                        onClick={() => handlePlayTrack(track)}
                        className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition opacity-0 group-hover:opacity-100 ml-4 flex-shrink-0"
                      >
                        <Play size={20} fill="white" />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* PROFILE PAGE */}
        {currentPage === 'profile' && (
          <div>
            {/* Banner */}
            <div
              className="h-48 rounded-lg mb-6 relative overflow-hidden transition bg-cover bg-center"
              style={{
                backgroundImage: profile.banner ? `url(${profile.banner})` : 'none',
                backgroundColor: profile.banner ? 'transparent' : '#1f2937'
              }}
            >
              {!profile.banner && (
                <div className="text-8xl flex items-center justify-center h-full opacity-50">
                  {profile.bannerFile}
                </div>
              )}
              <button
                onClick={() => setShowProfileEdit(true)}
                className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition shadow-lg"
              >
                <Settings size={20} />
              </button>
            </div>

            {/* Profile Info */}
            <div className="mb-8">
              <div className="flex items-end gap-6 mb-6">
                <div
                  className="w-32 h-32 rounded-lg overflow-hidden border-4 border-orange-500 bg-cover bg-center flex-shrink-0 shadow-lg"
                  style={{
                    backgroundImage: profile.avatar ? `url(${profile.avatar})` : 'none',
                    backgroundColor: profile.avatar ? 'transparent' : '#1f2937'
                  }}
                >
                  {!profile.avatar && (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {profile.avatarFile}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">{profile.username}</h1>
                  <p className="text-gray-400 mb-4">{profile.bio}</p>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="font-bold text-orange-500">{profile.followers}</span>
                      <span className="text-gray-400"> подписчиков</span>
                    </div>
                    <div>
                      <span className="font-bold text-orange-500">{profile.following}</span>
                      <span className="text-gray-400"> подписок</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* GIFs in Profile */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Моя коллекция</h3>
                <div className="flex gap-3 flex-wrap">
                  {profile.gifs.map((gif, idx) => (
                    <div key={idx} className="text-5xl bg-gray-800 p-4 rounded-lg hover:scale-110 transition cursor-pointer hover:bg-gray-700">
                      {gif}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Tracks */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">🎵 Мои треки</h2>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="text-orange-500 hover:text-orange-400 text-sm font-medium flex items-center gap-1"
                >
                  + Добавить треки <ChevronRight size={16} />
                </button>
              </div>
              {profileTracks.length === 0 ? (
                <p className="text-gray-400 bg-gray-800 p-6 rounded-lg text-center">Добавьте треки в ваш профиль</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profileTracks.map(track => (
                    <div key={track.id} className="bg-gray-800 rounded-lg p-4 group hover:bg-gray-700 transition">
                      <div className="relative h-32 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-5xl rounded mb-3 group-hover:scale-105 transition">
                        {track.image}
                      </div>
                      <h3 className="font-bold mb-1 truncate text-sm">{track.title}</h3>
                      <p className="text-gray-400 text-xs truncate mb-3">{track.artist}</p>
                      <button
                        onClick={() => removeFromProfile(track.id)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-xs transition font-medium"
                      >
                        Удалить
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      {showProfileEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Редактировать профиль</h2>
              <button onClick={() => setShowProfileEdit(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Имя</label>
                <input
                  type="text"
                  value={editProfile.username}
                  onChange={(e) => setEditProfile({ ...editProfile, username: e.target.value })}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={editProfile.bio}
                  onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">📸 Загрузить аватар</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'avatar')}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                />
                {editProfile.avatar && (
                  <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border-2 border-orange-500">
                    <img src={editProfile.avatar} alt="avatar preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">🖼️ Загрузить баннер</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'banner')}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                />
                {editProfile.banner && (
                  <div className="mt-2 w-full h-24 rounded-lg overflow-hidden border-2 border-orange-500">
                    <img src={editProfile.banner} alt="banner preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Эмодзи аватара (если нет файла)</label>
                <input
                  type="text"
                  value={editProfile.avatarFile}
                  onChange={(e) => setEditProfile({ ...editProfile, avatarFile: e.target.value })}
                  maxLength="2"
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-2xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Эмодзи баннера (если нет файла)</label>
                <input
                  type="text"
                  value={editProfile.bannerFile}
                  onChange={(e) => setEditProfile({ ...editProfile, bannerFile: e.target.value })}
                  maxLength="2"
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-2xl"
                />
              </div>

              <button
                onClick={saveProfileChanges}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded transition mt-6"
              >
                Сохранить изменения
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Music Player */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700">
        {currentTrack && (
          <div className="max-w-7xl mx-auto px-4">
            {/* Progress Bar */}
            <div className="h-1 bg-gray-700">
              <div
                className="h-full bg-orange-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="py-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center text-3xl flex-shrink-0 shadow-lg">
                {currentTrack.image}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white truncate">{currentTrack.title}</h4>
                <p className="text-gray-400 text-sm truncate">{currentTrack.artist} • {currentTrack.source}</p>
              </div>
              <div className="hidden sm:flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition"
                >
                  {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                </button>
                <div className="flex items-center gap-2 w-32">
                  <Volume2 size={18} className="text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentVolume}
                    onChange={(e) => setCurrentVolume(e.target.value)}
                    className="w-full cursor-pointer accent-orange-500"
                  />
                  <span className="text-xs text-gray-400 w-8">{currentVolume}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!currentTrack && (
          <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-400 text-sm">
            Выберите трек для прослушивания
          </div>
        )}
      </footer>
    </div>
  );
}