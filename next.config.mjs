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
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // env: {
  //   __NEXT_REACT_DEV_OVERLAY: false,
  // },
};



export default nextConfig;
