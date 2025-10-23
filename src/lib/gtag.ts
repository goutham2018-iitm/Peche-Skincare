export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const pageview = (url: string) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_path: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number | string;
}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: action,
    event_category: category,
    event_label: label,
    value,
  });
};

export const trackProductClick = (productName: string) => {
  event({
    action: "select_item",
    category: "engagement",
    label: productName,
  });
};

export const trackAddToCart = (productName: string, price: number) => {
  event({
    action: "add_to_cart",
    category: "ecommerce",
    label: productName,
    value: price,
  });
};

export const trackBeginCheckout = (cartValue: number) => {
  event({
    action: "begin_checkout",
    category: "ecommerce",
    label: "Checkout Started",
    value: cartValue,
  });
};

export const trackPurchase = (orderId: string, total: number) => {
  event({
    action: "purchase",
    category: "ecommerce",
    label: orderId,
    value: total,
  });
};
