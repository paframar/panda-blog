import { Toaster } from 'react-hot-toast'

const toasterParams = {
  toastOptions: {
    success: {
      duration: 3000,
      style: {
        color: '$cp-blue-50',
      },
    },
    error: {
      duration: 5000,
      style: {
        color: '$cp-pink-300',
      },
    },
    style: {
      fontSize: '16px',
      maxWidth: '500px',
      padding: '16px 24px',
      backgroundColor: '$cp-white-50',
    },
  },
  containerStyle: {
    margin: '8px',
  },
}

function Toasts() {
  const { toastOptions, containerStyle } = toasterParams
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={containerStyle}
      toastOptions={toastOptions}
    />
  )
}

export default Toasts
