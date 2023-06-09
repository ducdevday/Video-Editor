import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetStoreAuth } from '~/app/authSlice';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import LogoutIcon from '@mui/icons-material/Logout';
const cx = classNames.bind(styles);
const tab = ['Media', 'Audio', 'Templates', 'Logout'];
function Sidebar() {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <Stack
            direction="column"
            sx={{
                color: 'white',
                padding: 0,
                backgroundColor: '#101010',
                height: '100vh',
                // width: '300px',
                alignItems: 'center',
            }}
        >
            {user && (
                <Stack direction="column" sx={{ margin: '15px 0 25px 0' }}>
                    <Avatar
                        alt="Remy Sharp"
                        src="data:image/jpeg;base64,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"
                        sx={{ width: 45, height: 45 }}
                    />
                    <p style={{ fontSize: 12 }}>{user.user?.name}</p>
                </Stack>
            )}

            <Stack direction="column">
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ margin: '10px 5px 10px 5px', color: 'white', cursor: 'pointer', fontSize: 22 }}
                    onClick={() => {
                        navigate(`/media`);
                    }}
                >
                    <LibraryAddIcon />
                    <h6 sx={{}}>Media</h6>
                </Stack>

                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ margin: '10px 5px 10px 5px', color: 'white', cursor: 'pointer', fontSize: 22 }}
                    onClick={() => {
                        navigate(`/Audio`);
                    }}
                >
                    <AudiotrackIcon />
                    <h6>Audio</h6>
                </Stack>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ margin: '10px 5px 10px 5px', color: 'white', cursor: 'pointer', fontSize: 22 }}
                    onClick={() => {
                        navigate(`/Templates`);
                    }}
                >
                    <AutoAwesomeMosaicIcon />
                    <h6>Templates</h6>
                </Stack>
                {user && (
                    <Stack
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ margin: '10px 5px 10px 5px', color: 'white', cursor: 'pointer' }}
                        onClick={() => {
                            dispatch(resetStoreAuth());
                            navigate('/login');
                        }}
                    >
                        <LogoutIcon />
                        <h6 sx={{ cursor: 'pointer' }}>Logout</h6>
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
}

export default Sidebar;
