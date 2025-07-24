import toast from 'react-hot-toast'
const notifySuccess = (message) => {
    toast.success(message)
}

const notifyError = (message) => {
    toast.error(message)
}

const notifyWarn = (message) => {
    toast(message, {
        icon: '⚠️',
        style: {
            border: '1px solid #facc15',
            color: '#92400e',
        },
    });
};

const toastPromise = (apiPromise, loading, success, error) => {
    return toast.promise(apiPromise, {
        loading: loading,
        success: success,
        error: error
    })
}


export { notifySuccess, notifyError, notifyWarn, toastPromise } 