/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'Aller',
                    'Mulish',
                    'Open Sans',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"SF Pro Text"',
                    '"Segoe UI"',
                    'Roboto',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                ],
                chevin: ['"Chevin"', '"Nunito"', '"Varela Round"', 'sans-serif'],
                aller: ['"Aller"', '"Mulish"', '"Open Sans"', 'sans-serif'],
            },
            colors: {
                apple: {
                    bg: '#F5F5F7',       // Classic Apple light gray background
                    card: '#FFFFFF',     // Clean white for cards
                    text: '#1D1D1F',     // Almost black
                    subtext: '#86868B',  // Apple gray text
                    border: '#D2D2D7',   // Apple border gray
                    blue: '#6B2B82',     // Eminence Purple (Primary)
                    blueHover: '#4A1D5A', // Darker purple for hover
                    primary: '#6B2B82',  // Eminence
                    secondary: '#D4198C', // Vivid Cerise
                    tertiary: '#EB754F',  // Burnt Sienna
                    neutral: '#707072',   // Dark Silver
                }
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '18px',     // Apple typically uses slightly larger, smoother corners
                '3xl': '24px',
            },
            boxShadow: {
                'apple': '0 4px 24px rgba(0, 0, 0, 0.04)', // Very subtle, diffuse shadow
                'apple-hover': '0 8px 32px rgba(0, 0, 0, 0.08)',
            }
        },
    },
    plugins: [],
}
