/** FreshCart Tailwind theme derived from the Google Stitch design tokens. */
module.exports = {
  content: ['./index.html', './pages/**/*.html', './public/partials/**/*.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        "tertiary": "#4e5a53",
        "on-tertiary-container": "#eaf7ee",
        "error-container": "#ffdad6",
        "secondary-fixed": "#6bff8f",
        "outline-variant": "#becabc",
        "on-secondary-fixed-variant": "#005321",
        "on-surface": "#121c2a",
        "primary-container": "#15803d",
        "background": "#f8f9ff",
        "primary": "#00652c",
        "surface-bright": "#f8f9ff",
        "on-primary-container": "#d3ffd5",
        "tertiary-fixed-dim": "#bdcac1",
        "surface-tint": "#006d30",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#007432",
        "surface-container-lowest": "#ffffff",
        "on-secondary-fixed": "#002109",
        "on-tertiary": "#ffffff",
        "tertiary-fixed": "#d9e6dd",
        "on-surface-variant": "#3f493f",
        "surface": "#f8f9ff",
        "on-background": "#121c2a",
        "tertiary-container": "#66726b",
        "primary-fixed-dim": "#79db8d",
        "on-tertiary-fixed-variant": "#3e4943",
        "outline": "#6f7a6e",
        "inverse-surface": "#27313f",
        "on-primary-fixed-variant": "#005323",
        "surface-variant": "#d9e3f6",
        "surface-container-highest": "#d9e3f6",
        "on-primary": "#ffffff",
        "error": "#ba1a1a",
        "on-primary-fixed": "#00210a",
        "inverse-primary": "#79db8d",
        "on-error": "#ffffff",
        "surface-container-low": "#eff4ff",
        "surface-dim": "#d0dbed",
        "surface-container-high": "#dee9fc",
        "inverse-on-surface": "#eaf1ff",
        "on-error-container": "#93000a",
        "secondary-fixed-dim": "#4ae176",
        "primary-fixed": "#95f8a7",
        "secondary": "#006e2f",
        "on-tertiary-fixed": "#131e19",
        "secondary-container": "#6bff8f",
        "surface-container": "#e6eeff"
},
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
},
      spacing: {
        "gutter": "1.5rem",
        "gutter-mobile": "0.75rem",
        "margin": "2rem",
        "space-sm": "0.5rem",
        "margin-mobile": "1rem",
        "space-xs": "0.25rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem"
},
      fontFamily: {
        "headline-lg": [
                "Inter"
        ],
        "display-hero": [
                "Inter"
        ],
        "headline-md": [
                "Inter"
        ],
        "currency-md": [
                "Inter"
        ],
        "title-md": [
                "Inter"
        ],
        "body-sm": [
                "Inter"
        ],
        "body-md": [
                "Inter"
        ],
        "headline-lg-mobile": [
                "Inter"
        ],
        "body-lg": [
                "Inter"
        ],
        "headline-sm": [
                "Inter"
        ],
        "title-sm": [
                "Inter"
        ],
        "display-hero-mobile": [
                "Inter"
        ],
        "label-caption": [
                "Inter"
        ],
        "currency-lg": [
                "Inter"
        ],
        "label-badge": [
                "Inter"
        ]
},
      fontSize: {
        "display-hero": [
                "40px",
                {
                        "lineHeight": "48px",
                        "letterSpacing": "-0.02em",
                        "fontWeight": "700"
                }
        ],
        "display-hero-mobile": [
                "30px",
                {
                        "lineHeight": "38px",
                        "letterSpacing": "-0.015em",
                        "fontWeight": "700"
                }
        ],
        "headline-lg": [
                "32px",
                {
                        "lineHeight": "40px",
                        "letterSpacing": "-0.02em",
                        "fontWeight": "700"
                }
        ],
        "headline-lg-mobile": [
                "24px",
                {
                        "lineHeight": "32px",
                        "letterSpacing": "-0.01em",
                        "fontWeight": "700"
                }
        ],
        "headline-md": [
                "24px",
                {
                        "lineHeight": "32px",
                        "letterSpacing": "-0.01em",
                        "fontWeight": "600"
                }
        ],
        "headline-sm": [
                "20px",
                {
                        "lineHeight": "28px",
                        "letterSpacing": "-0.005em",
                        "fontWeight": "600"
                }
        ],
        "title-md": [
                "16px",
                {
                        "lineHeight": "24px",
                        "letterSpacing": "0em",
                        "fontWeight": "600"
                }
        ],
        "title-sm": [
                "14px",
                {
                        "lineHeight": "20px",
                        "letterSpacing": "0em",
                        "fontWeight": "600"
                }
        ],
        "body-lg": [
                "16px",
                {
                        "lineHeight": "24px",
                        "letterSpacing": "0em",
                        "fontWeight": "400"
                }
        ],
        "body-md": [
                "14px",
                {
                        "lineHeight": "20px",
                        "letterSpacing": "0em",
                        "fontWeight": "400"
                }
        ],
        "body-sm": [
                "12px",
                {
                        "lineHeight": "16px",
                        "letterSpacing": "0.01em",
                        "fontWeight": "400"
                }
        ],
        "currency-lg": [
                "20px",
                {
                        "lineHeight": "26px",
                        "letterSpacing": "-0.02em",
                        "fontWeight": "700"
                }
        ],
        "currency-md": [
                "16px",
                {
                        "lineHeight": "22px",
                        "letterSpacing": "-0.01em",
                        "fontWeight": "700"
                }
        ],
        "label-badge": [
                "11px",
                {
                        "lineHeight": "14px",
                        "letterSpacing": "0.04em",
                        "fontWeight": "700"
                }
        ],
        "label-caption": [
                "10px",
                {
                        "lineHeight": "14px",
                        "letterSpacing": "0.02em",
                        "fontWeight": "500"
                }
        ]
},
    }
  },
  plugins: [],
};
