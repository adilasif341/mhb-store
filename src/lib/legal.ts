import { siteConfig } from "@/lib/catalog";

export type LegalSection = {
  heading: string;
  body: string[];
};

export type LegalPage = {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

const updatedAt = "June 25, 2026";

export const legalPages: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "How MHB Natural collects, uses, protects, and manages customer information for online orders in Pakistan.",
    updatedAt,
    sections: [
      {
        heading: "Information we collect",
        body: [
          `When you place an order or contact ${siteConfig.name}, we may collect your name, phone number, email address, delivery address, city, order details, payment method, and support messages.`,
          "We may also collect basic website usage information such as device type, browser, referring pages, and pages visited to improve store performance and customer experience.",
        ],
      },
      {
        heading: "How we use information",
        body: [
          "We use customer information to confirm orders, deliver products, process payments, provide support, prevent fraud, improve our store, and send order-related updates.",
          "Marketing messages are sent only where allowed and can be stopped by contacting us through WhatsApp or email.",
        ],
      },
      {
        heading: "Sharing information",
        body: [
          "We share only the information needed with courier partners, payment providers, technical service providers, and support tools used to complete your order.",
          "We do not sell customer personal information.",
        ],
      },
      {
        heading: "Data protection",
        body: [
          "We use reasonable administrative and technical safeguards to protect customer information.",
          "No online system is fully risk free, so customers should avoid sending passwords, banking credentials, OTP codes, or unnecessary sensitive information through messages.",
        ],
      },
      {
        heading: "Contact",
        body: [
          `For privacy questions, contact us at ${siteConfig.email} or through WhatsApp at ${siteConfig.phone}.`,
        ],
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    description:
      "The terms that apply when customers browse, order, pay for, or use products from MHB Natural.",
    updatedAt,
    sections: [
      {
        heading: "Use of this website",
        body: [
          `By using ${siteConfig.url}, you agree to use the store lawfully, provide accurate order details, and avoid misuse of the website, checkout, product reviews, or support channels.`,
          "We may update products, prices, promotions, stock, delivery charges, and website content without prior notice.",
        ],
      },
      {
        heading: "Orders and acceptance",
        body: [
          "An order is confirmed only after our team or system accepts it. We may contact you to verify address, phone number, payment status, or product availability.",
          "We may cancel or refuse an order if information is incomplete, payment cannot be verified, stock is unavailable, or the order appears suspicious.",
        ],
      },
      {
        heading: "Product information",
        body: [
          "We try to keep product names, prices, images, ingredients, usage instructions, and stock information accurate.",
          "Packaging, batches, labels, colors, or minor visual details may vary from images shown on the website.",
        ],
      },
      {
        heading: "Customer responsibility",
        body: [
          "Customers are responsible for reading product details, ingredients, warnings, and usage instructions before use.",
          "Patch testing is recommended for skincare and haircare products, especially for sensitive skin or scalp.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          `${siteConfig.name} is not responsible for indirect losses, misuse of products, incorrect address details, courier delays outside our control, or allergic reactions where product warnings were not followed.`,
        ],
      },
    ],
  },
  {
    slug: "shipping-policy",
    title: "Shipping Policy",
    description:
      "Delivery timelines, shipping charges, courier handling, and order tracking information for MHB Natural orders.",
    updatedAt,
    sections: [
      {
        heading: "Delivery coverage",
        body: [
          "We deliver across Pakistan where courier service is available.",
          "Some remote locations may require additional delivery time or courier confirmation before dispatch.",
        ],
      },
      {
        heading: "Processing time",
        body: [
          "Orders are normally processed after confirmation of customer details, payment method, and stock availability.",
          "Processing may take longer during sale campaigns, public holidays, courier disruptions, or high order volume.",
        ],
      },
      {
        heading: "Delivery time",
        body: [
          "Estimated delivery is usually 2 to 5 working days for major cities and may be longer for remote areas.",
          "Delivery timelines are estimates and can be affected by weather, strikes, courier load, address issues, or events outside our control.",
        ],
      },
      {
        heading: "Shipping charges",
        body: [
          "Shipping charges are shown at checkout or confirmed by the support team before dispatch.",
          "Free shipping or discounted shipping may be offered during specific promotions and can be changed at any time.",
        ],
      },
      {
        heading: "Tracking",
        body: [
          "When tracking information is available, customers can use the order tracking page or contact support for delivery updates.",
        ],
      },
    ],
  },
  {
    slug: "returns-refunds",
    title: "Returns and Refunds Policy",
    description:
      "Return, exchange, damaged item, and refund rules for MHB Natural ecommerce orders.",
    updatedAt,
    sections: [
      {
        heading: "Return eligibility",
        body: [
          "Returns or exchanges may be accepted for wrong, damaged, defective, or incomplete products reported within 48 hours of delivery.",
          "Products must be unused, sealed where applicable, and returned with original packaging, invoice, and proof of issue.",
        ],
      },
      {
        heading: "Items not eligible",
        body: [
          "Opened, used, damaged after delivery, or hygiene-sensitive products are not eligible for return unless the issue is due to our error or verified damage during delivery.",
          "Products purchased during clearance or special final-sale campaigns may not be returnable unless required by applicable rules.",
        ],
      },
      {
        heading: "Refund method",
        body: [
          "Approved refunds are processed through the original payment method where possible or through another agreed method.",
          "Cash on Delivery orders may require bank or wallet details for approved refunds.",
        ],
      },
      {
        heading: "Return shipping",
        body: [
          "If the return is due to our error, we will guide the customer about return shipping.",
          "If the return is requested for another reason, return shipping charges may be the customer responsibility.",
        ],
      },
      {
        heading: "How to request a return",
        body: [
          `Contact ${siteConfig.name} on WhatsApp at ${siteConfig.phone} or email ${siteConfig.email} with order number, product photos, parcel photos, and issue details.`,
        ],
      },
    ],
  },
  {
    slug: "cancellation-policy",
    title: "Cancellation Policy",
    description:
      "When customers can cancel an order and how MHB Natural handles cancellation requests.",
    updatedAt,
    sections: [
      {
        heading: "Before dispatch",
        body: [
          "Customers may request cancellation before an order is packed or handed to the courier.",
          "Cancellation is confirmed only after our team verifies that dispatch has not started.",
        ],
      },
      {
        heading: "After dispatch",
        body: [
          "Once an order has been dispatched, cancellation may not be possible.",
          "If the parcel is already with the courier, the customer may need to follow the returns process after delivery, subject to return eligibility.",
        ],
      },
      {
        heading: "Store cancellation rights",
        body: [
          "We may cancel orders for incorrect information, failed verification, unavailable stock, pricing errors, payment issues, or suspected misuse.",
        ],
      },
      {
        heading: "How to cancel",
        body: [
          `To request cancellation, contact us immediately through WhatsApp at ${siteConfig.phone} with your order number and phone number used at checkout.`,
        ],
      },
    ],
  },
  {
    slug: "payment-policy",
    title: "Payment Policy",
    description:
      "Accepted payment methods, Cash on Delivery handling, payment confirmation, and pricing rules.",
    updatedAt,
    sections: [
      {
        heading: "Accepted payment methods",
        body: [
          "Available payment methods may include Cash on Delivery, bank transfer, wallet transfer, or online payment methods shown at checkout.",
          "Payment options can vary by city, order amount, promotion, or operational requirement.",
        ],
      },
      {
        heading: "Cash on Delivery",
        body: [
          "For Cash on Delivery orders, payment is collected by the courier at delivery.",
          "Customers should prepare the correct amount and inspect parcel condition before accepting delivery where courier rules allow.",
        ],
      },
      {
        heading: "Pricing",
        body: [
          "All prices are shown in Pakistani Rupees unless stated otherwise.",
          "Prices, discounts, bundles, and shipping charges may change without prior notice.",
        ],
      },
      {
        heading: "Payment verification",
        body: [
          "Orders paid by bank transfer, wallet, or online method may require verification before dispatch.",
          "If payment cannot be verified, dispatch may be delayed or the order may be cancelled.",
        ],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description:
      "How MHB Natural may use cookies and similar technologies to run and improve the ecommerce website.",
    updatedAt,
    sections: [
      {
        heading: "What cookies are",
        body: [
          "Cookies are small files stored on a device to help websites remember preferences, improve performance, and understand usage.",
        ],
      },
      {
        heading: "How we use cookies",
        body: [
          "We may use essential cookies for cart, checkout, security, and website operation.",
          "We may also use analytics or marketing cookies to understand store performance and improve product discovery.",
        ],
      },
      {
        heading: "Managing cookies",
        body: [
          "Customers can block or delete cookies through their browser settings.",
          "Some features, such as cart or checkout, may not work properly if essential cookies are disabled.",
        ],
      },
    ],
  },
  {
    slug: "product-disclaimer",
    title: "Product Disclaimer",
    description:
      "Important skincare, haircare, allergy, and product-use disclaimers for MHB Natural customers.",
    updatedAt,
    sections: [
      {
        heading: "General product use",
        body: [
          "MHB Natural products are cosmetic, personal care, haircare, or wellness products unless specifically stated otherwise.",
          "Product results vary by skin type, hair type, routine, environment, consistency, and individual sensitivity.",
        ],
      },
      {
        heading: "Not medical advice",
        body: [
          "Product information on this website is not medical advice and should not replace advice from a qualified healthcare professional.",
          "If you have a medical condition, pregnancy concern, allergy, active skin disease, scalp infection, or severe reaction history, consult a qualified professional before use.",
        ],
      },
      {
        heading: "Patch testing",
        body: [
          "Patch testing is recommended before using any new skincare or haircare product.",
          "Stop use and seek appropriate help if irritation, burning, swelling, rash, breathing difficulty, or any severe reaction occurs.",
        ],
      },
      {
        heading: "Images and packaging",
        body: [
          "Product images are for representation. Packaging, labels, bottle shape, or batch details may vary.",
        ],
      },
    ],
  },
];

export function getLegalPage(slug: string) {
  return legalPages.find((page) => page.slug === slug);
}
