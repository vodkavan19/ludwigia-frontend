import { Fragment } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Quote from '~/components/ui/Quote';
import StringHasQuote from '~/components/ui/StringHasQuote';
import ScienceName from '~/components/ui/ScienceName';

function Intro({ data }) {
    return (
        <Grid container columns={16} spacing={6}>
            <Grid xs={10}>
                <Box display='flex' alignItems='center'>
                    <Typography color='text.accent1' fontWeight={700} mr={1}>Tên khoa học:</Typography>
                    <Box><ScienceName name={data.sci_name} /></Box>
                </Box>
                <Box mt={2} display='flex'>
                    <Typography color='text.accent1' fontWeight={700} mr={1.5}>Tên khác:</Typography>
                    <Box display='flex' flexDirection='column'>
                        {data.other_name.map((item, idx) => (
                            <Box key={idx}>
                                <ScienceName name={item.name} />
                                {item.reference && (
                                    <Quote
                                        quote={item.reference}
                                        quoteLink={data.references[item.reference - 1].link}
                                    />
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box mt={2} display='flex'>
                    <Typography color='text.accent1' component='span' fontWeight={700} mr={1}>
                        Tên tiếng Việt:
                    </Typography>
                    <Box>
                        {data.vie_name.map((item, idx) => (
                            <Fragment key={idx}>
                                <Typography component='span'>{item.name}</Typography>
                                {item.reference && (
                                    <Quote
                                        quote={item.reference}
                                        quoteLink={data.references[item.reference - 1].link}
                                    />
                                )}
                                {idx !== data.vie_name.length - 1 ? ', ' : '.'}
                            </Fragment>
                        ))}
                    </Box>
                </Box>
                <Box mt={2} display='flex'>
                    <Typography color='text.accent1' component='span' fontWeight={700} mr={1}>
                        Họ:
                    </Typography>
                    <Box>
                        <StringHasQuote
                            htmlStr={data.family_description}
                            references={data.references}
                        />
                    </Box>
                </Box>
                {(data.author !== '' && data.debut_year) && (
                    <Box mt={2}>
                        <Typography component='i' mr={.75}>{data.short_name}</Typography>
                        được {data.author} mô tả lần đầu tiên năm {data.debut_year}.
                    </Box>
                )}
                <Box mt={2}>
                    <Typography component='i' mr={.75}>{data.short_name}</Typography>
                    được phân loại theo hệ thống của Takhtajan như sau:
                    {Object.values(data.takhtajan_system).map((level, idx) => (
                        <Box key={idx} ml={8 + (idx * 3.5)} mt={.5}>
                            <Typography component='span' color='text.accent1' fontWeight={700} mr={1}>
                                {level.name || 'Loài'}
                            </Typography>
                            <Typography component={level.name ? 'span' : 'i'}>
                                {`(${level.nomenclature})`}
                            </Typography>
                            {level.reference && (
                                <Quote
                                    quote={level.reference}
                                    quoteLink={data.references[level.reference - 1].link}
                                />
                            )}
                        </Box>
                    ))}
                </Box>
            </Grid>
            <Grid xs={6}>
                <Box
                    width='100%' maxHeight='75%' mt={6}
                    borderRadius='8px' overflow='hidden'
                    sx={{ aspectRatio: 1/1, boxShadow: 4 }}
                >
                    <Box
                        component='img'
                        src={data.avatar.fileUrl} alt=''
                        width='100%' height='100%'
                        sx={{ objectFit: 'cover' }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

export default Intro;