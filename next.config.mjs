/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/img/**",
      },
    ],
  },

  // env: {
  //   __NEXT_REACT_DEV_OVERLAY: false,
  // },
};



export default nextConfig;
