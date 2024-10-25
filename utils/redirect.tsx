import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface RedirectComponentProps {
  targetUrl: string;
}

const RedirectComponent: React.FC<RedirectComponentProps> = ({ targetUrl }) => {
  const router = useRouter();

  useEffect(() => {
    if (targetUrl) {
      router.push(targetUrl); // Redirect to the target URL
    }
  }, [router, targetUrl]);

  return null; // No need to render anything
};

export default RedirectComponent;