import { createI18n } from "vue-i18n";

const messages = {
  zh: {
    brand: "IPNEXO",
    tagline: "稳定 · 高速 · 优雅 的跨境网络解决方案",
    nav: { services: "服务", features: "优势", contact: "联系" },
    hero: {
      title: "为企业构建稳定、高速的跨境网络",
      desc: "我们提供全球优质境外 IP、SDWAN 专线以及定制跨境网络解决方案。",
      btn1: "获取方案",
      btn2: "查看服务",
    },
    contact: {
      title: "联系我们",
      submit: "提交咨询",
      alt: "已提交，我们的销售将尽快与您联系。",
    },
  },
  en: {
    brand: "IPNEXO",
    tagline: "Stable · Fast · Elegant Cross-border Network Solutions",
    nav: { services: "Services", features: "Advantages", contact: "Contact" },
    hero: {
      title: "Building Stable and Fast Cross-border Networks for Enterprises",
      desc: "We provide high-quality overseas IPs, SDWAN dedicated lines, and custom cross-border network solutions.",
      btn1: "Get a Proposal",
      btn2: "View Services",
    },
    contact: {
      title: "Contact Us",
      submit: "Submit",
      alt: "Submitted. Our sales will contact you soon.",
    },
  },
};

export default createI18n({
  locale: "zh",
  fallbackLocale: "en",
  messages,
});
