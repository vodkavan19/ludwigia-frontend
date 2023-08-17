import Box from '@mui/material/Box';

import EditorField from '~/components/ui/inputField/EditorField';

function DistributionForm({ form, readOnlyMode }) {
    return (
        <Box mt={3}>
            <EditorField
                form={form}
                name='distribution'
                placeholder='Nhập nội dung về phân bố sinh thái của Loài!'
                minHeight={320}
                readOnly={readOnlyMode}
            />
        </Box>
    );
}

export default DistributionForm;