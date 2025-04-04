import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogClose } from '../../redux/action';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({updateStatus}) {
  const state = useSelector(state => state.dialogAction);
  const open = state.status;
  const dispatch = useDispatch();

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => dispatch(dialogClose())}
        aria-describedby="alert-dialog-slide-description"
        sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#FEC8D8", // Màu nền tùy chỉnh
              color: '#957DAD'
            },
          }}
      >
        <DialogTitle>{"Cảnh báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText color='#957DAD' id="alert-dialog-slide-description">
          Bạn có chắc chắn muốn mở lớp cho đơn này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(dialogClose())}>Hủy</Button>
          <Button onClick={() => updateStatus(state.data.value, state.data.id)}>Mở lớp</Button>
        </DialogActions>
      </Dialog>
  );
}