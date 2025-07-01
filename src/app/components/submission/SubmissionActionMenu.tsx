import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";
import { canSwitchToPaper, canSwitchToPending } from "../../utils/status";
import type { SubmissionStatus } from "../../types";

interface SubmissionActionMenuProps {
  submissionId: string;
  status: SubmissionStatus;
  onSwitchToPaper: (id: string) => void;
  onSwitchToPending: (id: string) => void;
}

const SubmissionActionMenu: React.FC<SubmissionActionMenuProps> = ({
  submissionId,
  status,
  onSwitchToPaper,
  onSwitchToPending,
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSwitchToPaper = () => {
    onSwitchToPaper(submissionId);
    handleMenuClose();
  };

  const handleSwitchToPending = () => {
    onSwitchToPending(submissionId);
    handleMenuClose();
  };

  const showPaperOption = canSwitchToPaper(status);
  const showPendingOption = canSwitchToPending(status);

  if (!showPaperOption && !showPendingOption) {
    return (
      <IconButton disabled size="small">
        <MoreVertIcon />
      </IconButton>
    );
  }

  return (
    <>
      <IconButton onClick={handleMenuOpen} size="small">
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {showPaperOption && (
          <MenuItem onClick={handleSwitchToPaper}>
            {t("submissions.switchToPaper")}
          </MenuItem>
        )}
        {showPendingOption && (
          <MenuItem onClick={handleSwitchToPending}>
            {t("submissions.switchToPending")}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default SubmissionActionMenu;
