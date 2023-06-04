import * as Burnt from 'burnt';

export function useToast() {
  function errorToast({ title, message }: { title: string; message?: string }) {
    Burnt.toast({
      title,
      message,
      preset: 'error',
    });
  }

  return {
    errorToast,
  };
}
