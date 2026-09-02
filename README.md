# authsignal-flows-react-native

The official React Native library for [Authsignal Flows](https://authsignal.com), wrapping the
[Authsignal Flows iOS SDK](https://github.com/authsignal/authsignal-flows-ios).

Built with the [Expo Modules API](https://docs.expo.dev/modules/overview/), so it works in:

- Expo apps (with a [development build](https://docs.expo.dev/develop/development-builds/introduction/) — it is not available in Expo Go, since it includes custom native code)
- Bare/vanilla React Native apps, after running `npx install-expo-modules` once (see below)

## Installation

### Expo apps

```sh
npx expo install authsignal-flows-react-native
npx expo prebuild
```

### Bare React Native apps

This library uses the [Expo Modules API](https://docs.expo.dev/modules/overview/), which works
in bare React Native apps too. If your app doesn't already depend on `expo`, install it first:

```sh
npx install-expo-modules@latest
```

Then add this library:

```sh
npm install authsignal-flows-react-native
cd ios && pod install
```

## Usage

```ts
import { AuthsignalFlow } from 'authsignal-flows-react-native';

const authsignal = new AuthsignalFlow({
  tenantId: 'YOUR_TENANT_ID',
  apiUrl: 'YOUR_REGION_API_URL',
});
```

You can find your tenant ID in the [Authsignal Portal](https://portal.authsignal.com/organisations/tenants/api).

You must specify the correct `apiUrl` for your tenant's region.

| Region        | Base URL                      |
| ------------- | ----------------------------- |
| US (Oregon)   | https://api.authsignal.com    |
| CA (Montreal) | https://ca.api.authsignal.com |
| AU (Sydney)   | https://au.api.authsignal.com |
| EU (Dublin)   | https://eu.api.authsignal.com |
| UK (London)   | https://uk.api.authsignal.com |
