export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Space Grotesk"', "sans-serif"],
                cormorant: ["Cormorant Garamond", "serif"],
                inter: ['Inter', 'sans-serif'],
            },
            colors: {
                sand: "#EDD4B5",
            },
            fontSize: {
                '7.5xl': '5.25rem',
                '5.5xl': '3.375rem',
            },
            screens: {
                'sxx': '320px',
                'xs' : '344px',
                'mid': '390px', 
                'ml': '430px',
                'sm': '640px', 
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px'
            }
        },
    },
    plugins: [],
};
