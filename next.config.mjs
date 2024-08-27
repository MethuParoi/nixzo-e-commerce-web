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
      {
        protocol: "https",
        hostname: "kjqzojrvmhadxwftawlo.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/product_images/**",
      },
    ],
  },

  // env: {
  //   __NEXT_REACT_DEV_OVERLAY: false,
  // },
};



export default nextConfig;
