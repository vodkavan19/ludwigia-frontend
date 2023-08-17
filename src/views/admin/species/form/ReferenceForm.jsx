import { Fragment } from 'react';
import { useFieldArray } from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DatasetLinkedOutlined from '@mui/icons-material/DatasetLinkedOutlined';
import ArrowCircleDownTwoTone from '@mui/icons-material/ArrowCircleDownTwoTone';
import HighlightOffTwoTone from '@mui/icons-material/HighlightOffTwoTone';

import InputField from '~/components/ui/inputField/InputField';
import EditorField from '~/components/ui/inputField/EditorField';

function ReferenceForm({ form, readOnlyMode }) {
    const referencesForm = useFieldArray({
        name: 'references',
        control: form.control
    });

    return (
        <Box mt={3}>
            {referencesForm.fields.map((field, index) => (
                <Fragment key={field.id}>
                    <Box mb={2} alignItems='center' display='flex'>
                        <Box display='flex' alignItems='center' color='text.accent1'>
                            <DatasetLinkedOutlined sx={{ mr: .75 }} />
                            <Typography fontWeight={600} fontStyle='italic'>
                                Tài liệu tham khảo số {index + 1}:
                            </Typography>
                        </Box>
                    </Box>
                    <Box display='flex'>
                    <Box mr={1}>
                            {!readOnlyMode && (
                                <Fragment>
                                    <Box>
                                        <Tooltip title='Xóa tài liệu này' arrow placement="right">
                                            <span>
                                                <IconButton
                                                    color="error"
                                                    disabled={referencesForm.fields.length <= 1}
                                                    onClick={() => referencesForm.remove(index)}
                                                >
                                                    <HighlightOffTwoTone fontSize="large" />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Box>
                                    <Box>
                                        <Tooltip title='Thêm một tài liệu mới bên dưới' arrow placement="right">
                                            <span>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => referencesForm.insert(index + 1, { content: '', link: '' })}
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
                            <Grid xs={12}>
                                <InputField
                                    form={form}
                                    name={`references.${index}.link`}
                                    label='URL tài liệu trực tuyến'
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <EditorField
                                    form={form}
                                    name={`references.${index}.content`}
                                    placeholder='Tên tài liệu tham khảo'
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider sx={{ border: '1px dashed', borderColor: 'divider', my: 2 }} />
                </Fragment>
            ))}
        </Box>
    );
}

export default ReferenceForm;