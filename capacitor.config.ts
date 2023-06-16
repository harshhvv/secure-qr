import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.harshuwu.bmi',
  appName: 'BroMI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
