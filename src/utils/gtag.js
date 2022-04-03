export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-8LX81K259F"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-8LX81K259F');
</script>
 */
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages

export const pageview = (url) => {
  if (!GA_TRACKING_ID) return // GA_TRACKING_ID が設定されていない場合は、処理しない
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (!GA_TRACKING_ID) return // GA_TRACKING_ID が設定されていない場合は、処理しない
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
