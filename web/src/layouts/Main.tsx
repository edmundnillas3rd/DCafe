import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";

export default function Home() {
  const getVideos = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/v1/video`);
    const data = await response.json() as Promise<any>;
  };

  useEffect(() => {
    getVideos().catch((error) => console.error(error));
  });

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
