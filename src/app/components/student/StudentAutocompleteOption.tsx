import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { StudentSearchResult } from '../../data-layer/submissions';

interface StudentAutocompleteOptionProps {
  option: StudentSearchResult;
  props: any;
}

const StudentAutocompleteOption: React.FC<StudentAutocompleteOptionProps> = ({
  option,
  props,
}) => {
  const { t } = useTranslation();

  return (
    <ListItem {...props} key={option.id}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
          <PersonIcon sx={{ fontSize: 18 }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body1" fontWeight={500}>
            {option.fullName}
          </Typography>
        }
        secondary={
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            component="span"
          >
            {t('submissions.studentId')}: {option.id}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default StudentAutocompleteOption; 