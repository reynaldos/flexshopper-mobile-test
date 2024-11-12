import { redirect } from 'next/navigation';

export default function Home() {

const FLEXSHOPPER_URL = process.env.NEXT_PUBLIC_FLEXSHOPPER_URL || "";
// Server-side redirect
redirect(FLEXSHOPPER_URL);

}
