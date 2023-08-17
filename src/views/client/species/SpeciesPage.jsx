import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Box from '@mui/material/Box';

import axiosPublic from '~/utils/axiosPublic';
import HeadName from '~/components/ui/HeadName';
import SpeciesSidebar from './Sidebar';
import HeadContent from './HeadContent';
import Intro from './content/Intro';
import Description from './content/Description';
import Microsurgery from './content/Microsurgery';
import Distribution from './content/Distribution';
import Phytochemicals from './content/Phytochemicals';
import Benifits from './content/Benefits';
import References from './content/References';

function SpeciesPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [species, setSpecies] = useState(null)

    useEffect(() => {
        const controler = new AbortController();

        axiosPublic
            .get(`/species/${id}`)
            .then(res => {
                setSpecies(res)
            })
            .catch(() => navigate('/internal-server-error'));

        return () => {
            controler.abort();
        }
    }, [id, navigate])

    return (
        <Box>
            {species !== null && (
                <Fragment>
                    <HeadName
                        title={species.short_name}
                        subTitle={species.sci_name}
                        image={species.avatar.fileUrl}
                    />
                    <Box display='flex'>
                        <SpeciesSidebar />
                        <Box py={3} px={4}>
                            <Box id='intro' pb={8}>
                                <Intro data={species} />
                            </Box>
                            <Box id='description' pb={8}>
                                <HeadContent mx={-4} mb={4}>Mô tả</HeadContent>
                                <Description
                                    data={species.description}
                                    references={species.references}
                                />
                            </Box>
                            <Box id='microsurgery' pb={8}>
                                <HeadContent mx={-4} mb={4}>Vi phẩu</HeadContent>
                                <Microsurgery data={species.microsurgerys} />
                            </Box>
                            <Box id='distribution' pb={8}>
                                <HeadContent mx={-4} mb={4}>Phân bố sinh thái</HeadContent>
                                <Distribution
                                    data={species.distribution}
                                    references={species.references}
                                />
                            </Box>
                            <Box id='phytochemicals'>
                                <HeadContent mx={-4}>Hóa thực vật và hoạt tính sinh học</HeadContent>
                                <Phytochemicals
                                    data={species.phytochemicals}
                                    references={species.references}
                                />
                            </Box>
                            <Box id='used-parts' pb={8}>
                                <HeadContent mx={-4} mb={4}>Bộ phận dùng và công dụng</HeadContent>
                                <Benifits
                                    data={species.benefits}
                                    references={species.references}
                                />
                            </Box>
                            <Box id='references' pb={4}>
                                <HeadContent mx={-4}>Tài liệu tham khảo</HeadContent>
                                <References data={species.references} />
                            </Box>
                        </Box>
                    </Box>
                </Fragment>
            )}
        </Box>
    );
}

export default SpeciesPage;