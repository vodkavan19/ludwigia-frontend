import { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Speed from '@mui/icons-material/Speed';
import ArrowBackOutlined from '@mui/icons-material/ArrowBackOutlined';

import RouterBreadcrumbs from '~/components/ui/Breadcrumbs';
import AddEditForm from './AddEditForm';

const BREADCRUMBS = [
    { label: 'Trang chủ', link: '/admin/' },
    { label: 'Loài thực vật', link: '/admin/species' }
];

function AddEditSpecies() {
    const navigate = useNavigate();
    const { state } = useLocation();
    var currentData = state?.data;
    const mode = state?.mode;

    if(currentData) {
        const micrData = currentData.microsurgerys.map((item, idx) => {
            return { 
                image: item.image,
                caption: item.caption,
                explains: item.explains.map(explain => {
                    return { content: explain }; 
                })
            }
        })
        currentData.microsurgerys = micrData;
    }

    const initValue = {
        // INTRODUCTION FORM
        genus_ref: currentData?.genus_ref._id || '',
        sci_name: currentData?.sci_name || '',
        author: currentData?.author || '',
        debut_year: currentData?.debut_year || '',
        avatar: currentData?.avatar || '',
        other_name: currentData?.other_name || [{ name: '', reference: '' }],
        vie_name: currentData?.vie_name || [{ name: '', reference: '' }],
        family_description: currentData?.family_description || '',
        takhtajan_system: {
            kingdom: currentData?.takhtajan_system?.kingdom || { name: '', nomenclature: '', reference: '' },
            division: currentData?.takhtajan_system?.division || { name: '', nomenclature: '', reference: '' },
            layer: currentData?.takhtajan_system?.layer || { name: '', nomenclature: '', reference: '' },
            order: currentData?.takhtajan_system?.order || { name: '', nomenclature: '', reference: '' },
            family: currentData?.takhtajan_system?.family || { name: '', nomenclature: '', reference: '' },
            genus: currentData?.takhtajan_system?.genus || { name: '', nomenclature: '', reference: '' },
            species: currentData?.takhtajan_system?.species || { nomenclature: '', reference: '' }
        },
        // DESCRIPTION FORM
        description: currentData?.description || '',
        // MICROSURERY FROM
        microsurgerys: currentData?.microsurgerys || [{ image: '', caption: '', explains: [{content: ''}] }],
        // DISTRIBUTION FORM
        distribution: currentData?.distribution || '',
        // PHYTOCHEMICAL FORM
        phytochemicals: currentData?.phytochemicals || [{
            bio_active: '',
            bio_reference: '',
            chemical_group: '',
            segment: '',
            physical_properties: '',
            spectrum: [],
            chemical_structure: '',
            pharma_effect: ''
        }],
        // BENEFIT FORM
        benefits: currentData?.benefits || '',
        // REFERENCES FORM
        references: currentData?.references || [{ content: '', link: '' }]
    }

    const validateSchema = Yup.object().shape({
        // INTRODUCTION FORM
        genus_ref: Yup.string().trim()
            .required('Vui lòng chọn một trong các lựa chọn!'),
        sci_name: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        author: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        debut_year: Yup.string().trim()
            .max(4, 'Vui lòng nhập năm đúng định dạng!'),
        avatar: Yup.mixed()
            .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                if (typeof value === 'object' && value.fileUrl) return true;
                return value && value.length;
            })
            .test('fileSize', 'Dung lượng hình ảnh vượt quá 5 MB!', value => {
                if (typeof value === 'object' && value.fileUrl) return true;
                return value && (value[0].size <= 5 * 1024 * 1024)
            }),
        other_name: Yup.array()
            .of(Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            })),
        vie_name: Yup.array()
            .of(Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            })),
        family_description: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        takhtajan_system: Yup.object().shape({
            kingdom: Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            }),
            division: Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            }),
            layer: Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            }),
            order: Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            }),
            family: Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            }),
            genus: Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            }),
            species: Yup.object().shape({
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            })
        }),
        // DESCRIPTION FORM
        description: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        // MICROSURERY FROM
        microsurgerys: Yup.array()
            .of(Yup.object().shape({
                image: Yup.mixed()
                    .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                        if (typeof value === 'object' && value.fileUrl) return true;
                        return value && value.length;
                    })
                    .test('fileSize', 'Dung lượng hình ảnh vượt quá 5 MB!', value => {
                        if (typeof value === 'object' && value.fileUrl) return true;
                        return value && (value[0].size <= 5 * 1024 * 1024)
                    }),
                caption: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
            })),
        // DISTRIBUTION FORM
        distribution: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        // PHYTOCHEMICAL FORM
        phytochemicals: Yup.array()
            .of(Yup.object().shape({
                bio_active: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                chemical_group: Yup.string().trim(),
                segment: Yup.string().trim(),
                physical_properties: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                spectrum: Yup.array()
                    .of(Yup.string().trim())
                    .min(1, 'Vui lòng không để trống trường này!'),
                chemical_structure: Yup.mixed()
                    .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                        if (typeof value === 'object' && value.fileUrl) return true;
                        return value && value.length;
                    })
                    .test('fileSize', 'Dung lượng hình ảnh vượt quá 5 MB!', value => {
                        if (typeof value === 'object' && value.fileUrl) return true;
                        return value && (value[0].size <= 5 * 1024 * 1024)
                    }),
                pharma_effect: Yup.string().trim().trim()
            })),
        // BENEFIT FORM
        benefits: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        // REFERENCES FORM
        references: Yup.array()
            .of(Yup.object().shape({
                content: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                link: Yup.string().trim()
                    .url('Vui lòng nhập đúng định dạng một URL!')
            }))
    })

    return (
        <Fragment>
            <Box className="flex-between" alignItems="flex-end">
                <Box>
                    <Typography variant="h5" fontWeight="700" gutterBottom>
                        {(currentData == null)
                            ? 'Thêm Loài thực vật'
                            : (mode === 'edit')
                                ? 'Chỉnh sửa Loài thực vật'
                                : 'Chi tiết Loài thực vật'
                        }
                    </Typography>
                    <RouterBreadcrumbs
                        prevLink={BREADCRUMBS}
                        homeIcon={<Speed />}
                        currentPage={(currentData == null)
                            ? 'Thêm Loài thực vật'
                            : (mode === 'edit')
                                ? 'Chỉnh sửa Loài thực vật'
                                : 'Chi tiết Loài thực vật'
                        }
                    />
                </Box>
                <Box mb={1}>
                    <Button
                        color='cancel'
                        variant="contained"
                        startIcon={<ArrowBackOutlined />}
                        onClick={() => navigate('/admin/species')}
                    >
                        Trở lại
                    </Button>
                </Box>
            </Box>
            <Paper sx={{ mt: 3, p: 2, pt: 3 }} elevation={4}>
                <AddEditForm
                    initValue={initValue}
                    validateSchema={validateSchema}
                    editItemId={currentData?._id}
                    readOnlyMode={mode === 'readOnly'}
                />
            </Paper>
        </Fragment>
    );
}

export default AddEditSpecies;