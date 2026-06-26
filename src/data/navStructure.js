// Mirrors the navigation structure of the existing royal-techgroup.com website
export const navStructure = {
  en: [
    { label: 'Home', to: '/' },
    {
      label: 'Royal Tech Oil and Gas Fields Services',
      to: '/rofs-uae',
      mega: [
        {
          title: 'Business Units',
          items: [
            { label: 'Upstream', to: '/rofs-uae/upstream' },
            { label: 'Downstream', to: '/rofs-uae/downstream' },
            { label: 'QHSE', to: '/rofs-uae/qhse' },
          ],
        },
        {
          title: 'Solutions',
          items: [
            { label: 'Oil Field Development Solutions', to: '/rofs-uae/solutions/oil-field-development' },
            { label: 'Asset Management Solutions', to: '/rofs-uae/solutions/asset-management' },
            { label: 'Environmental Solutions', to: '/rofs-uae/solutions/environmental' },
            { label: 'Smart Solutions', to: '/rofs-uae/solutions/smart-solutions' },
          ],
        },
        {
          title: 'Supply',
          items: [
            { label: "Oil and Gas Equipment's", to: '/rofs-uae/supply/equipment' },
            { label: 'Oil and Gas Material & Chemicals', to: '/rofs-uae/supply/chemicals' },
          ],
        },
      ],
    },
    {
      label: 'Royal Tech Oil and Gas Trading',
      to: '/trading',
      flat: [
        { label: 'About Us', to: '/trading/about' },
        { label: 'Values', to: '/trading/values' },
        { label: 'Our Partners', to: '/trading/partners' },
        { label: 'Products Providing', to: '/trading/products' },
        { label: 'Logistics Services Providing', to: '/trading/logistics' },
      ],
    },
    {
      label: 'Royal Tech General Trading',
      to: '/general-trading',
      flat: [
        { label: 'Royal Tech General Trading', to: '/general-trading' },
        { label: 'MR. BUFFALO', to: '/general-trading/mr-buffalo' },
      ],
    },
    { label: 'Products', to: '/products' },
    { label: 'Contact', to: '/contact' },
  ],
  ar: [
    { label: 'الرئيسية', to: '/' },
    {
      label: 'رويال تك لخدمات حقول النفط والغاز',
      to: '/rofs-uae',
      mega: [
        {
          title: 'وحدات الأعمال',
          items: [
            { label: 'الاستخراج', to: '/rofs-uae/upstream' },
            { label: 'التكرير', to: '/rofs-uae/downstream' },
            { label: 'QHSE', to: '/rofs-uae/qhse' },
          ],
        },
        {
          title: 'الحلول',
          items: [
            { label: 'حلول تطوير حقول النفط', to: '/rofs-uae/solutions/oil-field-development' },
            { label: 'حلول إدارة الأصول', to: '/rofs-uae/solutions/asset-management' },
            { label: 'الحلول البيئية', to: '/rofs-uae/solutions/environmental' },
            { label: 'الحلول الذكية', to: '/rofs-uae/solutions/smart-solutions' },
          ],
        },
        {
          title: 'التوريد',
          items: [
            { label: 'معدات النفط والغاز', to: '/rofs-uae/supply/equipment' },
            { label: 'مواد وكيماويات النفط والغاز', to: '/rofs-uae/supply/chemicals' },
          ],
        },
      ],
    },
    {
      label: 'رويال تك لتجارة النفط والغاز',
      to: '/trading',
      flat: [
        { label: 'من نحن', to: '/trading/about' },
        { label: 'قيمنا', to: '/trading/values' },
        { label: 'شركاؤنا', to: '/trading/partners' },
        { label: 'المنتجات', to: '/trading/products' },
        { label: 'الخدمات اللوجستية', to: '/trading/logistics' },
      ],
    },
    {
      label: 'رويال تك للتجارة العامة',
      to: '/general-trading',
      flat: [
        { label: 'رويال تك للتجارة العامة', to: '/general-trading' },
        { label: 'MR. BUFFALO', to: '/general-trading/mr-buffalo' },
      ],
    },
    { label: 'المنتجات', to: '/products' },
    { label: 'تواصل معنا', to: '/contact' },
  ],
}
