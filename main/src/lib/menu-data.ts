
export type MenuItem = {
    id: string;
    label: string;
    href: string;
}

export type FooterMenu = {
    brands: MenuItem[];
    categories: MenuItem[];
    quickLinks: MenuItem[];
    company: MenuItem[];
}

export type MenuStructure = {
    header: MenuItem[];
    footer: FooterMenu;
}

export const initialMenuData: MenuStructure = {
    header: [
        { id: 'h1', href: '/compare', label: 'Compare' },
        { id: 'h2', href: '/brands', label: 'Brands' },
        { id: 'h3', href: '/news', label: 'News' },
        { id: 'h4', href: '/guides', label: 'Guides' },
        { id: 'h5', href: '/deals', label: 'Deals' },
    ],
    footer: {
        brands: [
            { id: 'f1-1', href: '/search?brand=Apple', label: 'Apple' },
            { id: 'f1-2', href: '/search?brand=Samsung', label: 'Samsung' },
            { id: 'f1-3', href: '/search?brand=Google', label: 'Google' },
        ],
        categories: [
            { id: 'f2-1', href: '/category/best-gaming-phones', label: 'Gaming Phones' },
            { id: 'f2-2', href: '/category/best-camera-phones', label: 'Camera Phones' },
            { id: 'f2-3', href: '/category/5g-phones', label: '5G Phones' },
        ],
        quickLinks: [
            { id: 'f3-1', href: '/compare', label: 'Compare' },
            { id: 'f3-2', href: '/news', label: 'News' },
            { id: 'f3-3', href: '/sitemap.xml', label: 'Sitemap' },
        ],
        company: [
            { id: 'f4-1', href: '/about', label: 'About' },
            { id: 'f4-2', href: '/contact', label: 'Contact' },
            { id: 'f4-3', href: '/privacy', label: 'Privacy' },
        ]
    }
};
