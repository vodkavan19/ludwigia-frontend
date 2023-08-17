import { useLayoutEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';

import StringHasQuote from '~/components/ui/StringHasQuote';

function Description({ data, references }) {
    const containerRef = useRef(null)
    
    useLayoutEffect(() => {
        const images = containerRef.current.querySelectorAll('img.image_resized');

        images.forEach((image, idx) => {
            const figure = document.createElement('figure');
            figure.style.width = image.style.width;
            
            const caption = document.createElement('figcaption');
            caption.innerText = `Hình ${idx + 1}`;
            
            image.style.width = '100%'
            figure.appendChild(image.cloneNode(true));
            figure.appendChild(caption);
            image.parentNode.replaceChild(figure, image);
        });
    }, [])

    return (
        <Box 
            ref={containerRef}
            sx={{
                '& p': {
                    textAlign: 'justify',
                    '& figure': {
                        my: 0
                    },
                    '&:has(figure img)': {
                        display: 'flex',
                        justifyContent: 'center'
                    },
                },
                '& figure': {
                    mx: 0,
                    '& figcaption': {
                        fontSize: 14,
                        textAlign: 'center',
                        fontStyle: 'italic',
                        color: grey.A700
                    }
                },
            }}
        >
            <StringHasQuote
                htmlStr={data}
                references={references}
            />
        </Box>
    );
}

export default Description;
