import { Toaster } from '@/components/primitives/toast';

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
