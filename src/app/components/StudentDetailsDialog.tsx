import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Timeline as TimelineIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { formatDateTime, formatDurationDescriptive } from '../utils';

interface StudentDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  submission: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ 
          p: { xs: 1, sm: 2, md: 3 },
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const StudentDetailsDialog: React.FC<StudentDetailsDialogProps> = ({
  open,
  onClose,
  submission,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!submission) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ABSENT':
        return 'error';
      case 'IN_PROGRESS':
        return 'warning';
      case 'STUDENT_SUBMISSION':
        return 'success';
      case 'PENDING':
        return 'info';
      default:
        return 'default';
    }
  };

  const getSessionHealthColor = (health: string) => {
    switch (health) {
      case 'GOOD':
        return 'success';
      case 'POOR':
        return 'warning';
      case 'DISCONNECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth={false}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          m: isMobile ? 0 : { xs: 1, sm: 2 },
          width: isMobile ? '100vw' : { xs: '95vw', sm: '90vw', md: '80vw', lg: '900px' },
          height: isMobile ? '100vh' : { xs: '85vh', sm: '80vh', md: '75vh' },
          maxWidth: isMobile ? '100vw' : '900px',
          maxHeight: isMobile ? '100vh' : '75vh',
          minHeight: isMobile ? '100vh' : { xs: '500px', sm: '600px' },
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          px: { xs: 2, sm: 3 },
          pt: { xs: 2, sm: 3 },
          flexShrink: 0,
        }}
      >
        <Box 
          display="flex" 
          alignItems="center" 
          gap={{ xs: 1, sm: 2 }}
          flexWrap="wrap"
        >
          <Box sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            👦🏼
          </Box>
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"}
            sx={{
              wordBreak: 'break-word',
              lineHeight: 1.2,
              flex: 1,
              minWidth: 0,
            }}
          >
            {submission.student?.fullName} - {t('submissions.details')}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          px: { xs: 1, sm: 2, md: 3 },
          py: 0,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
          minHeight: 0,
          height: '100%',
        }}
      >
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          flexShrink: 0,
        }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile={isMobile}
            sx={{
              '& .MuiTab-root': {
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                minHeight: { xs: 40, sm: 48 },
                padding: { xs: '6px 8px', sm: '12px 16px' },
              }
            }}
          >
            <Tab label={t('submissions.general')} />
            <Tab label={t('submissions.sessionHealth')} />
            <Tab label={t('submissions.logs')} />
          </Tabs>
        </Box>

        <Box sx={{ 
          flex: 1, 
          overflow: 'auto',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <TabPanel value={tabValue} index={0}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', lg: 'row' }}
              gap={{ xs: 2, sm: 3 }}
              sx={{ minHeight: 'fit-content' }}
            >
              <Box flex={1}>
                <Card sx={{ height: 'fit-content' }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography 
                      variant={isMobile ? "subtitle1" : "h6"} 
                      gutterBottom
                      sx={{ mb: { xs: 1.5, sm: 2 } }}
                    >
                      {t('submissions.studentInfo')}
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={{ xs: 1.5, sm: 2 }}>
                      <Box 
                        display="flex" 
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        justifyContent={{ sm: 'space-between' }}
                        gap={{ xs: 0.5, sm: 1 }}
                      >
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontWeight: { xs: 500, sm: 'normal' } }}
                        >
                          {t('submissions.studentId')}:
                        </Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight="bold"
                          sx={{ 
                            wordBreak: 'break-all',
                            textAlign: { xs: 'left', sm: 'right' }
                          }}
                        >
                          {submission.student?.id}
                        </Typography>
                      </Box>
                      <Box 
                        display="flex" 
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        justifyContent={{ sm: 'space-between' }}
                        gap={{ xs: 0.5, sm: 1 }}
                      >
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontWeight: { xs: 500, sm: 'normal' } }}
                        >
                          {t('submissions.studentName')}:
                        </Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight="bold"
                          sx={{ 
                            wordBreak: 'break-word',
                            textAlign: { xs: 'left', sm: 'right' }
                          }}
                        >
                          {submission.student?.fullName}
                        </Typography>
                      </Box>
                      <Box 
                        display="flex" 
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        justifyContent={{ sm: 'space-between' }}
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        gap={{ xs: 0.5, sm: 1 }}
                      >
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontWeight: { xs: 500, sm: 'normal' } }}
                        >
                          {t('submissions.status')}:
                        </Typography>
                        <Chip
                          label={t(`status.${submission.status}`)}
                          color={getStatusColor(submission.status)}
                          size="small"
                          sx={{ 
                            alignSelf: { xs: 'flex-start', sm: 'center' },
                            fontSize: { xs: '0.7rem', sm: '0.75rem' }
                          }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              <Box flex={1}>
                <Card sx={{ height: 'fit-content' }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography 
                      variant={isMobile ? "subtitle1" : "h6"} 
                      gutterBottom
                      sx={{ mb: { xs: 1.5, sm: 2 } }}
                    >
                      {t('submissions.examInfo')}
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={{ xs: 1.5, sm: 2 }}>
                      <Box 
                        display="flex" 
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        justifyContent={{ sm: 'space-between' }}
                        gap={{ xs: 0.5, sm: 1 }}
                      >
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontWeight: { xs: 500, sm: 'normal' } }}
                        >
                          {t('submissions.loginTime')}:
                        </Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight="bold"
                          sx={{ 
                            wordBreak: 'break-word',
                            textAlign: { xs: 'left', sm: 'right' }
                          }}
                        >
                          {submission.loginTime
                            ? formatDateTime(submission.loginTime)
                            : t('common.notAvailable')}
                        </Typography>
                      </Box>
                      <Box 
                        display="flex" 
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        justifyContent={{ sm: 'space-between' }}
                        gap={{ xs: 0.5, sm: 1 }}
                      >
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontWeight: { xs: 500, sm: 'normal' } }}
                        >
                          {t('submissions.startTime')}:
                        </Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight="bold"
                          sx={{ 
                            wordBreak: 'break-word',
                            textAlign: { xs: 'left', sm: 'right' }
                          }}
                        >
                          {submission.startTime
                            ? formatDateTime(submission.startTime)
                            : t('common.notAvailable')}
                        </Typography>
                      </Box>
                      <Box 
                        display="flex" 
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        justifyContent={{ sm: 'space-between' }}
                        gap={{ xs: 0.5, sm: 1 }}
                      >
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontWeight: { xs: 500, sm: 'normal' } }}
                        >
                          {t('submissions.timeElapsed')}:
                        </Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight="bold"
                          sx={{ 
                            wordBreak: 'break-word',
                            textAlign: { xs: 'left', sm: 'right' }
                          }}
                        >
                          {formatDurationDescriptive(submission.timeElapsed, t)}
                        </Typography>
                      </Box>
                      <Box 
                        display="flex" 
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        justifyContent={{ sm: 'space-between' }}
                        gap={{ xs: 0.5, sm: 1 }}
                      >
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontWeight: { xs: 500, sm: 'normal' } }}
                        >
                          {t('submissions.questionsSync')}:
                        </Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight="bold"
                          sx={{ 
                            wordBreak: 'break-word',
                            textAlign: { xs: 'left', sm: 'right' }
                          }}
                        >
                          {submission.questionsSync}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Card sx={{ height: 'fit-content' }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"} 
                  gutterBottom
                  sx={{ mb: { xs: 1.5, sm: 2 } }}
                >
                  {t('submissions.sessionHealth')}
                </Typography>
                <Box 
                  display="flex" 
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  gap={{ xs: 1, sm: 2 }} 
                  mb={2}
                >
                  <Typography variant="body1">
                    {t('submissions.currentHealth')}:
                  </Typography>
                  <Chip
                    label={t(`health.${submission.sessionHealth}`)}
                    color={getSessionHealthColor(submission.sessionHealth)}
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                  />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ lineHeight: 1.5 }}
                >
                  {t('submissions.sessionHealthDescription')}
                </Typography>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Card sx={{ 
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <CardContent sx={{ 
                p: { xs: 2, sm: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"} 
                  gutterBottom
                  sx={{ mb: { xs: 1.5, sm: 2 } }}
                >
                  {t('submissions.activityLogs')}
                </Typography>
                <Box sx={{ 
                  flex: 1,
                  minHeight: 200,
                  maxHeight: 400,
                  overflow: 'auto',
                }}>
                  {submission.activities && submission.activities.length > 0 ? (
                    <List sx={{ 
                      p: 0,
                      '& .MuiListItem-root': {
                        px: { xs: 0, sm: 2 },
                        py: { xs: 1, sm: 1.5 },
                      }
                    }}>
                      {submission.activities.map((activity: any, index: number) => (
                        <ListItem key={index} divider>
                          <ListItemIcon sx={{ minWidth: { xs: 35, sm: 40 } }}>
                            <TimelineIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography 
                                variant="body1"
                                sx={{ 
                                  fontSize: { xs: '0.9rem', sm: '1rem' },
                                  fontWeight: 500,
                                  wordBreak: 'break-word'
                                }}
                              >
                                {t(`activity.${activity.activityType}`)}
                              </Typography>
                            }
                            secondary={
                              <Box sx={{ mt: 0.5 }}>
                                <Typography 
                                  variant="caption" 
                                  display="block"
                                  sx={{ 
                                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                    wordBreak: 'break-word'
                                  }}
                                >
                                  {formatDateTime(activity.timestamp)}
                                </Typography>
                                {activity.details && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ 
                                      mt: 0.5,
                                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                      wordBreak: 'break-word',
                                      lineHeight: 1.4
                                    }}
                                  >
                                    {activity.details}
                                  </Typography>
                                )}
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 200,
                    }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                        sx={{ 
                          fontSize: { xs: '0.8rem', sm: '0.875rem' }
                        }}
                      >
                        {t('submissions.noActivityLogs')}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </TabPanel>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 1.5, sm: 2 },
          gap: 1,
          flexShrink: 0,
        }}
      >
        <Button 
          onClick={onClose} 
          variant="outlined"
          fullWidth={isMobile}
          sx={{
            minHeight: { xs: 40, sm: 36 },
            fontSize: { xs: '0.9rem', sm: '0.875rem' }
          }}
        >
          {t('common.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDetailsDialog;
