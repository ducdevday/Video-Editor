import './MediaComponent.css';
import { useEffect, useRef, useState } from 'react';
import { getAudioStock, getVideoStock } from '~/api/videoApi';
import { useDispatch } from 'react-redux';
import { selectAudioStock, selectVideoStock, splitVideo } from '~/app/editorSlice';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
function MediaComponent() {
    const navigate = useNavigate();

    // const videoList = [
    //     { id: 1, url: 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4', name: 'video1' },
    //     { id: 2, url: 'https://creatomate-static.s3.amazonaws.com/demo/video2.mp4' },
    //     { id: 3, url: 'https://creatomate-static.s3.amazonaws.com/demo/video3.mp4' },
    // ];
    // const musicList = [
    //     {
    //         id: 1,
    //         name: 'Music 1',
    //         length: '3:45',
    //         url: 'https://firebasestorage.googleapis.com/v0/b/musicplayer-b04ab.appspot.com/o/discovery_song%2F1679834410627.mp3?alt=media&token=beef64b2-2077-4616-86f7-f888d5cddac4',
    //     },
    //     {
    //         id: 2,
    //         name: 'Music 2',
    //         length: '2:30',
    //         url: 'https://firebasestorage.googleapis.com/v0/b/musicplayer-b04ab.appspot.com/o/discovery_song%2F1679834459097.mp3?alt=media&token=91284a3c-08b8-4b4e-9f41-1246883e6a3b',
    //     },
    //     {
    //         id: 3,
    //         name: 'Music 3',
    //         length: '4:15',
    //         url: 'https://firebasestorage.googleapis.com/v0/b/musicplayer-b04ab.appspot.com/o/discovery_song%2F1679834410627.mp3?alt=media&token=beef64b2-2077-4616-86f7-f888d5cddac4',
    //     },
    // ];
    const [videoList, setvideoList] = useState([]);
    const [musicList, setMusicList] = useState([]);
    const audioRef = useRef(null);
    const [currentSong, setCurrentSong] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const dispatch = useDispatch();
    const playMusic = (url) => {
        setCurrentSong(url);
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.src = url;
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    const getFileInStock = async () => {
        setvideoList(await getVideoStock());
        setMusicList(await getAudioStock());
    };
    useEffect(() => {
        getFileInStock();
    }, []);
    return (
        <div className="mediaComponent-container">
            <div className="stock-videos-container">
                <h1 className="stock-videos-title">Stock Videos</h1>
                <div className="stock-videos-list">
                    {videoList.map((video) => (
                        <video
                            key={video.id}
                            src={video.url}
                            className="stock-video"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                                dispatch(selectVideoStock(video));
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="stock-music-container">
                <h1 className="stock-music-title">Stock Music</h1>
                <div className="music-card-list">
                    {musicList.map((music) => (
                        <div key={music._id} style={{ justifyContent: 'space-between' }} className="music-card">
                            <div style={{ display: 'flex' }}>
                                <button className="music-play-button" onClick={() => playMusic(music.url)}>
                                    {music.url === currentSong && isPlaying ? '⏸️' : '▶️'}
                                </button>
                                <div className="music-info" style={{ fontSize: 12 }}>
                                    <p className="music-name">{music.name}</p>
                                    <p className="music-length">{music.duration}</p>
                                </div>
                            </div>
                            <AddIcon
                                sx={{ cursor: 'pointer' }}
                                onClick={() => {
                                    dispatch(selectAudioStock({ ...music, start: 0 }));
                                    navigate('/audio');
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Audio player */}
            <audio ref={audioRef} className="audio-player" controls hidden />
        </div>
    );
}

export default MediaComponent;
