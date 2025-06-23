import { colors } from '@/utils/colors/colors';
import { STATUS } from '@/utils/types/feedback';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Modal } from '@mui/material';
import { useEffect, useState } from 'react';

interface ModalFeedBackStatusProps {
  status: string;
  open: boolean;
  setIsClose: () => void;
  title: string;
  description: string

}


const ModalFeedBackStatus = ({open, setIsClose, status,title, description }: ModalFeedBackStatusProps) => {
  const [timer, setTimer] = useState<number>(3);
  const StatusIcon = status === STATUS.SUCCESS ? CheckCircleIcon : ErrorIcon;
  console.log(status);
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (open) {
      setTimer(3);
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer <= 0) {
            clearInterval(interval!); 
            setIsClose(); 
          }
          return newTimer;
        });
      }, 1000);
    } else if (!open && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [open, setIsClose]);


  return (
    <Modal
      open={open}
      onClose={setIsClose}
      className="flex justify-center items-center"
    >
      <div className='bg-white rounded-20 p-4 text-center'>
        <StatusIcon style={{ fontSize: 96, color: status === STATUS.SUCCESS ? colors.green : colors.red }} />
        <h1 className='font-bold text-3xl pt-3 pb-2'>{title}</h1>
        <p className='font-light '>{description}</p>
        {/* <p className='pt-3 font-bold '>{'00:0'+timer}</p> */}

      </div>
    </Modal>
  )
}

export default ModalFeedBackStatus