/** @type {import('next').NextConfig} */
const nextConfig = {
	images:{
        remotePatterns: [{hostname :"firebasestorage.googleapis.com"}, {hostname :"flagcdn.com"}, {hostname : "lh3.googleusercontent.com"}],
    }
};
export default nextConfig;
