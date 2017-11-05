import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings,
} from 'react-native-google-analytics-bridge';

export default (screen, obj) => {
  let tracker = new GoogleAnalyticsTracker('UA-79370514-2');

  tracker.trackScreenView(screen);

  if (obj && obj.trackEvent) {
    tracker.trackEvent(obj.catagory, obj.action);
  }
};
