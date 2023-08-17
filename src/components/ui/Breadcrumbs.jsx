import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Link as MuiLink } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';


function RouterBreadcrumbs({ prevLink = [], currentPage, homeIcon }) {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {prevLink.map((item, idx) => (
                <MuiLink
                    key={idx}
                    component={Link} to={item.link}
                    className='flex-center'
                    underline='hover'
                    color={(!currentPage && idx === prevLink.length - 1) ? 'inherit' : 'text.primary'}
                    sx={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        '& span svg' : {
                            fontSize: '1.25rem',
                            mr: 0.5
                        },
                        '&:hover': {
                            color: (!currentPage && idx === prevLink.length - 1) ? 'inherit' : 'text.primary'
                        }
                    }}
                >
                    {(idx === 0) && (
                        <Box component="span" className="flex-center">{homeIcon}</Box>
                    )}
                    {item.label}
                </MuiLink>
            ))}
            {currentPage && (
                <Typography
                    color="text.disabled"
                    sx={{
                        fontSize: '0.825rem',
                        fontWeight: 500
                    }}
                >
                    {currentPage}
                </Typography>
            )}
        </Breadcrumbs>
    );
}

export default RouterBreadcrumbs;
