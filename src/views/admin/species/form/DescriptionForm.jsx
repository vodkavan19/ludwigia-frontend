import Box from '@mui/material/Box';

import EditorField from '~/components/ui/inputField/EditorField';

function DescriptionForm({ form, readOnlyMode }) {
    return (
        <Box mt={3}>
            <EditorField
                form={form}
                name='description'
                placeholder='Nhập thông tin mô tả chi tiết của Loài!'
                minHeight={320}
                readOnly={readOnlyMode}
            />
        </Box>
    );
}

export default DescriptionForm;
