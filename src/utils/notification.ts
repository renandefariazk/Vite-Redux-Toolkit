import { toast } from 'react-toastify';

export function notify(type: 'error' | 'success', message: string): void {
  // console.log("toast")
  if (type === 'error') {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: 'toasterror',
    });
  }
  if (type === 'success') {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: 'toastsuccess',
    });
  }
}
