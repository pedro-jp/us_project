type Toast = {
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress?: number;
  theme: 'light' | 'dark';
};

const toastConfig: Toast = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light'
};

export default toastConfig;
