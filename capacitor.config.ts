import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.app.lostFound',
  appName: 'LostAndFound',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
