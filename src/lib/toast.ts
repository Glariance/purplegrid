import Swal from 'sweetalert2';

export const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: '#0f0f11',
  color: '#f6f6f8',
  customClass: {
    popup: 'shadow-lg shadow-purple-900/30 border border-white/10 rounded-xl',
  },
});

export const alert = Swal.mixin({
  background: '#0f0f11',
  color: '#f6f6f8',
  confirmButtonColor: '#7c3aed',
  cancelButtonColor: '#a855f7',
});
