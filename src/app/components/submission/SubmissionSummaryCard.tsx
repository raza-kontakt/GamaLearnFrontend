import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { 
  Schedule as ScheduleIcon, 
  LocationOn as LocationOnIcon, 
  People as PeopleIcon 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { formatDateTime } from '../../utils';

interface SubmissionSummaryCardProps {
  assessmentName: string;
  startTime: string;
  totalStudents: number;
  area: string;
}

const SubmissionSummaryCard: React.FC<SubmissionSummaryCardProps> = ({
  assessmentName,
  startTime,
  totalStudents,
  area,
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ mb: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {assessmentName}
        </Typography>
        
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <ScheduleIcon fontSize="small" color="primary" />
            <Typography variant="body2">
              {t('assessments.startTime')}: {formatDateTime(startTime)}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <PeopleIcon fontSize="small" color="primary" />
            <Typography variant="body2">
              {t('assessments.examinees')}: {totalStudents}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnIcon fontSize="small" color="primary" />
            <Chip 
              label={area} 
              size="small" 
              variant="outlined" 
              color="primary" 
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SubmissionSummaryCard; 