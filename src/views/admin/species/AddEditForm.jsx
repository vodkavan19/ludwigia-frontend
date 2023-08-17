import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import mammoth from 'mammoth';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dropzone from 'react-dropzone';
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress';
import Clear from '@mui/icons-material/Clear'
import DescriptionOutlined from '@mui/icons-material/Description'
import UploadFileOutlined from '@mui/icons-material/UploadFileOutlined';
import CloudUploadTwoTone from '@mui/icons-material/CloudUploadTwoTone';

import axiosPublic from '~/utils/axiosPublic';
import useAxiosPrivate from '~/utils/axiosPrivate';
import { acceptWordFile } from '~/utils/acceptFileField';
import { buildFormData } from '~/utils/buildFormData';
import { convertDataSpeciesFile } from '~/utils/convertDataSpeciesFile';
import { CustomStepConnector, FileFieldWrapper } from '~/components/themeMUI/customComponents';
import { TOAST_STYLE } from '~/components/ui/customToastify';
import IntroductionForm from './form/IntroductionForm';
import DescriptionForm from './form/DescriptionForm';
import MicrosurgeryForm from './form/MicrosurgeryForm';
import DistributionForm from './form/DistributionForm';
import PhytochemicalForm from './form/PhytochemicalForm';
import BenifitsForm from './form/BenefitsForm';
import ReferenceForm from './form/ReferenceForm';

const STEPS = [
    'Giới thiệu',
    'Mô tả',
    'Vi phẩu',
    'Phân bố sinh thái',
    'Hóa thực vật và hoạt tính sinh học',
    'Bộ phận dùng và công dụng',
    'Tài liệu tham khảo'
]

function AddEditForm({ initValue, validateSchema, editItemId, readOnlyMode }) {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0);
    const [genusOptions, setGenusOptions] = useState([])
    const [selectFile, setSelectFile] = useState('')

    useEffect(() => {
        axiosPublic
            .get('/genus/')
            .then((res) => {
                var options = res.map(
                    ({ _id: value, sci_name: label }) => ({ value, label })
                );
                setGenusOptions(options)
            })
            .catch(() => navigate('/internal-server-error'));
    }, [navigate])

    const form = useForm({
        defaultValues: initValue,
        resolver: yupResolver(validateSchema)
    })
    var formState = form.formState;
    
    const handleSubmit = async (value) => {
        if (!editItemId) {
            await handleAddSpecies(value);
        } else {
            await handleEditSpecies(value);
        }
    }

    const handleAddSpecies = async (data) => {
        const { description ,microsurgerys, phytochemicals, ...restField } = data;
        var micrImg = [], phytImg = [];

        const descArrData = description.split('<p>')
            .filter(item => item.trim() !== '')
            .map(item => '<p>' + item);

        const micrData = microsurgerys.map(item => {
            const { image, ...rest } = item
            micrImg.push(image[0])
            return { 
                caption: rest.caption,  
                explains: rest.explains.map(explain =>  explain.content)
            }
        })

        const phytData = phytochemicals.map(item => {
            const { chemical_structure, ...rest } = item
            phytImg.push(chemical_structure[0])
            return { ...rest }
        })

        const formData = new FormData();
        const uploadData = {
            ...restField,
            description: descArrData,
            microsurgerys: micrData,
            microsurgery_images: micrImg,
            phytochemicals: phytData,
            phytochemical_images: phytImg
        };
        buildFormData(formData, uploadData);

        await axiosPrivate
            .post('/species/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonText: 'Xem danh sách',
                    showDenyButton: true,
                    denyButtonColor: '#00695c',
                    denyButtonText: 'Tiếp tục thêm'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/admin/species')
                    } else if (result.isDenied) {
                        form.reset();
                        setActiveStep(0);
                    }
                })
            })
            .catch((err) => {
                if (err.status !== 403) toast.error(err.data.message, TOAST_STYLE)
            })
    }

    const handleEditSpecies = async (data) => {
        const { description, microsurgerys, phytochemicals, ...restField } = data;
        var newImgMicr = [], idxFileMicr = []
        var newImgPhyt = [], idxFilePhyt = []

        const descArrData = description.split('<p>')
            .filter(item => item.trim() !== '')
            .map(item => '<p>' + item);

        const micrData = microsurgerys.map((item, idx) => {
            const { image, ...rest } = item
            if (image[0] instanceof File) {
                newImgMicr.push(image[0])
                idxFileMicr.push(idx)
                return { 
                    caption: rest.caption,  
                    explains: rest.explains.map(explain => explain.content)
                };
            } else {
                return { 
                    image: image,
                    caption: rest.caption,  
                    explains: rest.explains.map(explain => explain.content)
                };
            }
        })

        const phytData = phytochemicals.map((item, idx) => {
            const { chemical_structure, ...rest } = item
            if (chemical_structure[0] instanceof File) {
                newImgPhyt.push(chemical_structure[0])
                idxFilePhyt.push(idx)
                return { ...rest }
            } else return item;
        })

        const formData = new FormData();
        const uploadData = {
            ...restField,
            description: descArrData,
            microsurgerys: micrData,
            microsurgery_new_images: newImgMicr,
            microsurgery_file_idx: idxFileMicr,
            phytochemicals: phytData,
            phytochemical_new_images: newImgPhyt,
            phytochemical_file_idx: idxFilePhyt
        };
        buildFormData(formData, uploadData);

        await axiosPrivate
            .put(`/species/${editItemId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonText: 'Xem danh sách'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/admin/species')
                    }
                })
            })
            .catch((err) => {
                if (err.status !== 403) toast.error(err.data.message, TOAST_STYLE)
            })
    }

    const handleSpeciesWordFileChange = async (files) => {
        const file = files[0];
        setSelectFile(file)
        const fileReader = new FileReader();
        fileReader.onload = function () {
            mammoth
                .extractRawText({ arrayBuffer: this.result })
                .then((result) => {
                    const speciesData = convertDataSpeciesFile(result.value)
                    form.reset((value) => ({
                        ...value,
                        ...speciesData
                    }))
                })
                .done();
        };
        fileReader.readAsArrayBuffer(file)
    }

    const renderStepContent = (step) => {
        switch (step) {
            case 0: return (
                <IntroductionForm
                    form={form}
                    genusOptions={genusOptions}
                    readOnlyMode={readOnlyMode}
                />
            );
            case 1: return (<DescriptionForm form={form} readOnlyMode={readOnlyMode} />);
            case 2: return (<MicrosurgeryForm form={form} readOnlyMode={readOnlyMode} />);
            case 3: return (<DistributionForm form={form} readOnlyMode={readOnlyMode} />);
            case 4: return (<PhytochemicalForm form={form} readOnlyMode={readOnlyMode} />);
            case 5: return (<BenifitsForm form={form} readOnlyMode={readOnlyMode} />);
            case 6: return (<ReferenceForm form={form} readOnlyMode={readOnlyMode} />);
            default: return;
        }
    }

    return (
        <Fragment>
            <Box mx={-2}>
                <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<CustomStepConnector />}
                >
                    {STEPS.map((label, idx) => (
                        <Step key={idx}>
                            <StepLabel onClick={() => setActiveStep(idx)}>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                {(activeStep === 0 && !readOnlyMode) && (
                    <Dropzone accept={acceptWordFile} onDrop={handleSpeciesWordFileChange}>
                        {({ getRootProps, getInputProps }) => (
                            <FileFieldWrapper {...getRootProps()} height={80} position='relative' my={3}>
                                <input {...getInputProps()} />
                                {!(selectFile instanceof File) ? (
                                    <Box textAlign='center' visibility={selectFile[0] ? 'hidden' : 'visible'}>
                                        <UploadFileOutlined fontSize='large' />
                                        <Typography>Kéo thả hoặc chọn file để lấy nội dung</Typography>
                                    </Box>
                                ) : (
                                    <Fragment>
                                        <Tooltip title={selectFile.name} followCursor>
                                            <Box
                                                className='flex-center' position='absolute' overflow='hidden'
                                                top={0} left={0} height='100%' width='100%' px={4}
                                            >
                                                <DescriptionOutlined sx={{ fontSize: 48, mr: 1 }} />
                                                <Box>
                                                    <Typography className='text-eclipse one-line'>{selectFile.name}</Typography>
                                                    <Typography variant='body2'>{selectFile.size} Byte</Typography>
                                                </Box>
                                            </Box>
                                        </Tooltip>
                                        <Tooltip title='Chọn lại file' arrow>
                                            <span>
                                                <IconButton
                                                    sx={{ position: 'absolute', top: 0, right: 0 }}
                                                    onClick={() => setSelectFile('')}
                                                >
                                                    <Clear />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Fragment>
                                )}
                            </FileFieldWrapper>
                        )}
                    </Dropzone>
                )}
                {renderStepContent(activeStep)}
                <Box mt={3} display='flex' alignItems='center' justifyContent='flex-end'>
                    {(activeStep !== 0) && (
                        <Button
                            size='large'
                            color='cancel'
                            variant='contained'
                            onClick={() => setActiveStep((prev) => prev - 1)}
                            sx={{ mr: 2 }}
                        >
                            Trở lại
                        </Button>
                    )}
                    {(activeStep !== STEPS.length - 1) && (
                        <Button
                            size='large'
                            color='primary'
                            variant='contained'
                            onClick={() => setActiveStep((prev) => prev + 1)}
                        >
                            Tiếp theo
                        </Button>
                    )}
                    {(activeStep === STEPS.length - 1 && !readOnlyMode) && (
                        <Button
                            type='submit'
                            variant='contained' size='large' color='primary'
                            disabled={(formState.submitCount !== 0 && !formState.isValid)}
                            sx={{
                                '&.Mui-disabled': {
                                    color: 'primary.contrastText',
                                    bgcolor: 'primary.main',
                                    boxShadow: 2,
                                    opacity: 0.5
                                }
                            }}
                        >
                            {!editItemId ? 'Thêm mới' : 'Chỉnh sửa'}
                        </Button>
                    )}
                </Box>
            </form>

            <Backdrop
                open={formState.isSubmitting}
                sx={{ zIndex: 9000 }}
            >
                <Box position='relative' >
                    <CircularProgress size={120} thickness={4} />
                    <Box
                        className='flex-center' position='absolute'
                        top={0} bottom={0} left={0} right={0} mb={1}
                    >
                        <CloudUploadTwoTone color='primary' sx={{ fontSize: '4rem' }} />
                    </Box>
                </Box>
            </Backdrop>
        </Fragment>
    );
}

export default AddEditForm;