import { useColorScheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';

function ModeToggle() {
    const { mode, setMode } = useColorScheme();

    return (
        <IconButton
            onClick={() => {
                setMode(mode === 'light' ? 'dark' : 'light');
            }}
        >
            {mode === 'light' ? <LightModeOutlined /> : <DarkModeOutlined />}
        </IconButton>
    );
}

export default ModeToggle;
