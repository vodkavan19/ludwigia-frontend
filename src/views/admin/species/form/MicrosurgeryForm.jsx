import { Fragment } from 'react';

import { useFieldArray } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import FormatListNumbered from '@mui/icons-material/FormatListNumbered';
import RemoveCircleTwoTone from '@mui/icons-material/RemoveCircleTwoTone';
import BiotechOutlined from '@mui/icons-material/BiotechOutlined';
import ArrowCircleDownTwoTone from '@mui/icons-material/ArrowCircleDownTwoTone'
import HighlightOffTwoTone from '@mui/icons-material/HighlightOffTwoTone';
import ArrowDropDownCircleTwoTone from '@mui/icons-material/ArrowDropDownCircleTwoTone';

import ImageField from '~/components/ui/inputField/ImageField';
import InputField from '~/components/ui/inputField/InputField';

const ExplainsNestedForm = ({ form, nestIndex, readOnlyMode }) => {
    const explainsForm = useFieldArray({
        name: `microsurgerys.${nestIndex}.explains`,
        control: form.control
    });

    return (
        <Grid container spacing={2}>
            {explainsForm.fields.map((field, index) => (
                <Grid xs={12} key={field.id} display='flex'>
                    <Box flexGrow={1}>
                        <InputField
                            form={form}
                            name={`microsurgerys.${nestIndex}.explains.${index}.content`}
                            label={`Diễn giải chú thích số ${index + 1}`}
                            readOnly={readOnlyMode}
                        />
                    </Box>
                    {!readOnlyMode && (
                        <Box display='flex' alignItems='center' ml={1}>
                            <Tooltip title='Thêm' arrow>
                                <span>
                                    <IconButton
                                        color="primary" size='small'
                                        onClick={() => explainsForm.insert(index + 1, { content: '' })}
                                    >
                                        <ArrowDropDownCircleTwoTone sx={{ fontSize: '2rem' }} />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Tooltip title='Xóa diễn giải chú thích này' arrow>
                                <span>
                                    <IconButton
                                        color="error" size='small'
                                        disabled={explainsForm.fields.length === 1}
                                        onClick={() => explainsForm.remove(index)}
                                    >
                                        <RemoveCircleTwoTone sx={{ fontSize: '2rem' }} />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>
                    )}
                </Grid>
            ))}
        </Grid>
    );
}


function MicrosurgeryForm({ form, readOnlyMode }) {
    const microsurgeryForm = useFieldArray({
        name: 'microsurgerys',
        control: form.control
    });

    return (
        <Box mt={3}>
            {microsurgeryForm.fields.map((field, index) => (
                <Fragment key={field.id}>
                    <Box display='flex' alignItems='center' color='text.accent1' mb={2}>
                        <BiotechOutlined sx={{ mr: .75 }} />
                        <Typography fontSize={18} fontWeight={600} fontStyle='italic'>
                            Mô tả vi phẩu số {index + 1}:
                        </Typography>
                    </Box>
                    <Box display='flex'>
                        <Box mr={1}>
                            {!readOnlyMode && (
                                <Fragment>
                                    <Box>
                                        <Tooltip title='Xóa vi phẩu này' arrow placement="right">
                                            <span>
                                                <IconButton
                                                    color="error"
                                                    disabled={microsurgeryForm.fields.length <= 1}
                                                    onClick={() => microsurgeryForm.remove(index)}
                                                >
                                                    <HighlightOffTwoTone fontSize="large" />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Box>
                                    <Box>
                                        <Tooltip title='Thêm một vi phẩu mới bên dưới' arrow placement="right">
                                            <span>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => microsurgeryForm.insert(
                                                        index + 1,  
                                                        { image: '', caption: '', explains: [{ content: '' }] }
                                                    )}
                                                >
                                                    <ArrowCircleDownTwoTone fontSize="large" />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Box>
                                </Fragment>
                            )}
                        </Box>
                        <Grid flex={1} container spacing={2}>
                            <Grid xs={6} container flexDirection='column' alignItems='flex-start'>
                                <Grid xs={12}>
                                    <ImageField
                                        form={form}
                                        name={`microsurgerys.${index}.image`}
                                        label={`Vi phẩu thứ ${index + 1}`}
                                        height={240}
                                        disabled={readOnlyMode}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <InputField
                                        form={form}
                                        name={`microsurgerys.${index}.caption`}
                                        label="Mô tả hình ảnh vi phẩu"
                                        readOnly={readOnlyMode}
                                    />
                                </Grid>
                            </Grid>
                            <Grid xs={6} flexDirection='column' alignItems='flex-start'>
                                <Box display='flex' alignItems='center' mb={2.25}>
                                    <FormatListNumbered sx={{ mr: .75 }} fontSize='small' />
                                    <Typography fontSize={15} fontWeight={500} fontStyle='italic'>
                                        Diễn giải chú thích:
                                    </Typography>
                                </Box>
                                <Box>
                                    <ExplainsNestedForm 
                                        form={form} 
                                        nestIndex={index} 
                                        readOnlyMode={readOnlyMode} 
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    {microsurgeryForm.fields.length > 1 &&
                        <Divider sx={{ border: '1px dashed', borderColor: 'divider', my: 2 }} />
                    }
                </Fragment>
            ))}
        </Box>
    );
}

export default MicrosurgeryForm;
