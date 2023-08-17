import Box from '@mui/material/Box';

import EditorField from '~/components/ui/inputField/EditorField';

function BenifitsForm({ form, readOnlyMode }) {
    return (
        <Box mt={3}>
            <EditorField
                form={form}
                name='benefits'
                placeholder='Nhập thông tin về bộ phận dùng & công dụng của Loài!'
                minHeight={320}
                readOnly={readOnlyMode}
            />
        </Box>
    );
}

export default BenifitsForm;