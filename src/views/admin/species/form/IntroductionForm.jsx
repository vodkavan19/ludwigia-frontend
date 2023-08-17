import { useFieldArray } from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddCircleTwoTone from '@mui/icons-material/AddCircleTwoTone'
import DashboardCustomizeOutlined from '@mui/icons-material/DashboardCustomizeOutlined'
import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import RemoveCircleTwoTone from '@mui/icons-material/RemoveCircleTwoTone'

import ImageField from '~/components/ui/inputField/ImageField';
import InputField from '~/components/ui/inputField/InputField';
import SelectField from '~/components/ui/inputField/SelectField';

function IntroductionForm({ form, genusOptions, readOnlyMode }) {
    const otherNameForm = useFieldArray({
        name: 'other_name',
        control: form.control
    })

    const vieNameForm = useFieldArray({
        name: 'vie_name',
        control: form.control
    })

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Box display='flex' alignItems='center'>
                        <DashboardOutlined sx={{ mr: .75 }} fontSize='small' />
                        <Typography fontWeight={600} fontStyle='italic'>
                            Thông tin chung:
                        </Typography>
                    </Box>
                </Grid>
                <Grid xs={6} container>
                    <Grid xs={12}>
                        <SelectField
                            form={form}
                            name='genus_ref'
                            options={genusOptions}
                            label='Loài thuộc Chi'
                            readOnly={readOnlyMode}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <InputField
                            form={form}
                            name='sci_name'
                            label='Tên khoa học'
                            readOnly={readOnlyMode}
                        />
                    </Grid>
                    <Grid xs={8}>
                        <InputField
                            form={form}
                            name='author'
                            label='Tác giả mô tả'
                            readOnly={readOnlyMode}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <InputField
                            form={form}
                            name='debut_year'
                            type='number'
                            label='Năm mô tả'
                            readOnly={readOnlyMode}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <InputField
                            form={form}
                            name='family_description'
                            label='Mô tả Họ của Loài'
                            multiline={true}
                            readOnly={readOnlyMode}
                        />
                    </Grid>
                </Grid>
                <Grid xs={6}>
                    <ImageField
                        form={form}
                        name='avatar'
                        label='Hình ảnh đại diện'
                        height='100%'
                        disabled={readOnlyMode}
                    />
                </Grid>
                <Grid xs={6} container flexDirection='column' alignItems='flex-start'>
                    <Grid xs={12}>
                        <Box display='flex' alignItems='center' mt={2}>
                            <DashboardCustomizeOutlined sx={{ mr: .75 }} fontSize='small' />
                            <Typography fontWeight={600} fontStyle='italic'>
                                Tên khoa học khác:
                            </Typography>
                        </Box>
                    </Grid>
                    {otherNameForm.fields.map((field, index) => (
                        <Grid xs={12} key={field.id} container flexWrap='nowrap'>
                            <Grid flexGrow={1}>
                                <InputField
                                    form={form}
                                    name={`other_name.${index}.name`}
                                    label='Tên khoa học'
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                            <Grid xs={3}>
                                <InputField
                                    form={form}
                                    type='number'
                                    name={`other_name.${index}.reference`}
                                    label='TLTK số'
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                            {!readOnlyMode && (
                                <Grid pr={0} pl={0.5} py={1.25}>
                                    {index == 0 ? (
                                        <Tooltip title='Thêm một tên khoa học khác' arrow>
                                            <span>
                                                <IconButton
                                                    color='primary' edge='start'
                                                    onClick={() => otherNameForm.append({ name: '', reference: '' })}
                                                >
                                                    <AddCircleTwoTone fontSize='large' />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title='Xóa tên này' arrow>
                                            <span>
                                                <IconButton
                                                    color='error' edge='start'
                                                    onClick={() => otherNameForm.remove(index)}
                                                >
                                                    <RemoveCircleTwoTone fontSize='large' />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    )}
                                </Grid>
                            )}
                        </Grid>
                    ))}
                </Grid>
                <Grid xs={6} container flexDirection='column' alignItems='flex-start'>
                    <Grid xs={12}>
                        <Box display='flex' alignItems='center' mt={2}>
                            <DashboardCustomizeOutlined sx={{ mr: .75 }} fontSize='small' />
                            <Typography fontWeight={600} fontStyle='italic'>
                                Tên tiếng Việt:
                            </Typography>
                        </Box>
                    </Grid>
                    {vieNameForm.fields.map((field, index) => (
                        <Grid xs={12} key={field.id} container flexWrap='nowrap'>
                            <Grid flexGrow={1}>
                                <InputField
                                    form={form}
                                    name={`vie_name.${index}.name`}
                                    label='Tên tiếng Việt'
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                            <Grid xs={3}>
                                <InputField
                                    form={form}
                                    type='number'
                                    name={`vie_name.${index}.reference`}
                                    label='TLTK số'
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                            {!readOnlyMode && (
                                <Grid pr={0} pl={0.5} py={1.25}>
                                    {index == 0 ? (
                                        <Tooltip title='Thêm một tên tiếng Việt' arrow>
                                            <span>
                                                <IconButton
                                                    color='primary'edge='start'
                                                    onClick={() => vieNameForm.append({ name: '', reference: '' })}
                                                >
                                                    <AddCircleTwoTone fontSize='large' />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title='Xóa tên này' arrow>
                                            <span>
                                                <IconButton
                                                    color='error' edge='start'
                                                    onClick={() => vieNameForm.remove(index)}
                                                >
                                                    <RemoveCircleTwoTone fontSize='large' />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    )}
                                </Grid>
                            )}
                        </Grid>
                    ))}
                </Grid>
                <Grid xs={12} container>
                    <Grid xs={12}>
                        <Box display='flex' alignItems='center' mt={2}>
                            <DashboardOutlined sx={{ mr: .75 }} fontSize='small' />
                            <Typography fontWeight={600} fontStyle='italic'>
                                Phân loại theo hệ thống Takhtajan:
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.kingdom.name'
                                label='Thuộc giới'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.kingdom.nomenclature'
                                label='Danh pháp khoa học'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.kingdom.reference'
                                label='TLTK số'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.division.name'
                                label='Thuộc Ngành'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.division.nomenclature'
                                label='Danh pháp khoa học'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.division.reference'
                                label='TLTK số'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.layer.name'
                                label='Thuộc Lớp'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.layer.nomenclature'
                                label='Danh pháp khoa học'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.layer.reference'
                                label='TLTK số'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.order.name'
                                label='Thuộc Bộ'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.order.nomenclature'
                                label='Danh pháp khoa học'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.order.reference'
                                label='TLTK số'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.family.name'
                                label='Thuộc Họ'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.family.nomenclature'
                                label='Danh pháp khoa học'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.family.reference'
                                label='TLTK số'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.genus.name'
                                label='Thuộc Chi'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.genus.nomenclature'
                                label='Danh pháp khoa học'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.genus.reference'
                                label='TLTK số'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={10}>
                            <InputField
                                form={form}
                                name='takhtajan_system.species.nomenclature'
                                label='Danh pháp khoa học của Loài'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.species.reference'
                                label='TLTK số'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default IntroductionForm;
