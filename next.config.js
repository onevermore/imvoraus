/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: true,
	images: {
		domains: [
			'videos-imvoraus.s3.amazonaws.com',
			'lh3.googleusercontent.com',
			'uploadthing.com',
		],
		formats: ['image/avif', 'image/webp'],
	},
	experimental: {
		esmExternals: false, // THIS IS THE FLAG THAT MATTERS
	},
	poweredByHeader: false,
	env: {
		REACT_APP_URL: process.env.REACT_APP_URL,
		REACT_APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
		UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
		API_URL: process.env.API_URL,
	},
	swcMinify: true,
	async rewrites() {
		return [
			{
				source: '/apii/:path*',
				destination: 'https://nestjsapp-production.up.railway.app/api/:path*',
				//destination: 'http://localhost:3333/api/:path*',
			},
		]
	},
}

module.exports = nextConfig
