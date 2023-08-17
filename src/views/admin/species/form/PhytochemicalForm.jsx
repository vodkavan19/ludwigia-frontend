import { Fragment } from 'react';

import { useFieldArray } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ScienceOutlined from '@mui/icons-material/ScienceOutlined';
import ArrowCircleDownTwoTone from '@mui/icons-material/ArrowCircleDownTwoTone';
import HighlightOffTwoTone from '@mui/icons-material/HighlightOffTwoTone';

import InputField from '~/components/ui/inputField/InputField';
import ImageField from '~/components/ui/inputField/ImageField';
import EditorField from '~/components/ui/inputField/EditorField';
import MultipleInputField from '~/components/ui/inputField/MultipleInputField';

const ADD_DEFAULT_VALUE_FORM = {
    bio_active: '',
    bio_reference: '',
    chemical_group: '',
    segment: '',
    physical_properties: '',
    spectrum: [],
    chemical_structure: '',
    pharma_effect: ''
}

function PhytochemicalForm({ form, readOnlyMode }) {
    const phytochemicalForm = useFieldArray({
        name: 'phytochemicals',
        control: form.control
    });

    return (
        <Box mt={3}>
            {phytochemicalForm.fields.map((field, index) => (
                <Fragment key={field.id}>
                    <Box alignItems='center' display='flex' mb={2}>
                        <Box display='flex' alignItems='center' color='text.accent1'>
                            <ScienceOutlined sx={{ mr: .75 }} />
                            <Typography fontSize={18} fontWeight={600} fontStyle='italic'>
                                Thông tin hoạt chất số {index + 1}:
                            </Typography>
                        </Box>
                    </Box>
                    <Box display='flex'>
                        <Box mr={1}>
                            {!readOnlyMode && (
                                <Fragment>
                                    <Box>
                                        <Tooltip title='Xóa hoạt chất này' arrow placement="right">
                                            <span>
                                                <IconButton
                                                    color="error"
                                                    disabled={phytochemicalForm.fields.length <= 1}
                                                    onClick={() => phytochemicalForm.remove(index)}
                                                >
                                                    <HighlightOffTwoTone fontSize="large" />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Box>
                                    <Box>
                                        <Tooltip title='Thêm một hoạt chất mới bên dưới' arrow placement="right">
                                            <span>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => phytochemicalForm.insert(index + 1, ADD_DEFAULT_VALUE_FORM)}
                                                >
                                                    <ArrowCircleDownTwoTone fontSize="large" />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Box>
                                </Fragment>
                            )}
                        </Box>
                        <Grid flex={1} container spacing={2} columns={16} >
                            <Grid xs={10} container>
                                <Grid xs={13}>
                                    <InputField
                                        form={form}
                                        name={`phytochemicals.${index}.bio_active`}
                                        label='Hoạt chất'
                                        readOnly={readOnlyMode}
                                    />
                                </Grid>
                                <Grid xs={3}>
                                    <InputField
                                        form={form}
                                        type='number'
                                        name={`phytochemicals.${index}.bio_reference`}
                                        label='TLTK số'
                                        readOnly={readOnlyMode}
                                    />
                                </Grid>
                                <Grid xs={8}>
                                    <InputField
                                        form={form}
                                        name={`phytochemicals.${index}.chemical_group`}
                                        label='Hoạt chất thuộc nhóm'
                                        readOnly={readOnlyMode}
                                    />
                                </Grid>
                                <Grid xs={8}>
                                    <InputField
                                        form={form}
                                        name={`phytochemicals.${index}.segment`}
                                        label='Phân đoạn chiết tách'
                                        readOnly={readOnlyMode}
                                    />
                                </Grid>
                                <Grid xs={16}>
                                    <MultipleInputField
                                        form={form}
                                        name={`phytochemicals.${index}.spectrum`}
                                        label='Quang phổ'
                                        options={[]}
                                        readOnly={readOnlyMode}
                                    />
                                </Grid>
                            </Grid>
                            <Grid xs={6}>
                                <ImageField
                                    form={form}
                                    name={`phytochemicals.${index}.chemical_structure`}
                                    label='Cấu trúc hóa học'
                                    height={'100%'}
                                    disabled={readOnlyMode}
                                />
                            </Grid>
                            <Grid xs={16}>
                                <EditorField
                                    form={form}
                                    name={`phytochemicals.${index}.physical_properties`}
                                    placeholder='Mô tả tính chất vật lý.'
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                            <Grid xs={16}>
                                <EditorField
                                    form={form}
                                    name={`phytochemicals.${index}.pharma_effect`}
                                    placeholder='Mô tả tác dụng dược lý.'
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    {phytochemicalForm.fields.length > 1 &&
                        <Divider sx={{ border: '1px dashed', borderColor: 'divider', my: 2 }} />
                    }
                </Fragment>
            ))}
        </Box>
    );
}

export default PhytochemicalForm;