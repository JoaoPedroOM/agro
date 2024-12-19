import { IconType } from 'react-icons';

interface ButtonLoginProps {
  title: string;
  Icon: IconType;
  handleLogin: () => void;
}

export default function ButtonLogin({ title, Icon, handleLogin }: ButtonLoginProps) {
  return (
    <button
      onClick={handleLogin}
      className="font-regular rounded font-main flex h-10 w-full items-center justify-center gap-2 bg-neutral-900 text-white"
    >
      <Icon size={23} /> 
      <div>{title}</div>
    </button>
  );
}
