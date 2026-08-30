# authsignal-flows-react-native

The official React Native library for [Authsignal Flows](https://authsignal.com), wrapping the
[Authsignal Flows iOS SDK](https://github.com/authsignal/authsignal-flows-ios).

Currently supports email OTP and passkey authentication (registration is not yet supported) on
iOS. Android support is planned for a future release.

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
| ------------- | ------------------------------ |
| US (Oregon)   | https://api.authsignal.com     |
| CA (Montreal) | https://ca.api.authsignal.com  |
| AU (Sydney)   | https://au.api.authsignal.com  |
| EU (Dublin)   | https://eu.api.authsignal.com  |
| UK (London)   | https://uk.api.authsignal.com  |

### Setting the challenge token

Each flow starts with a challenge token you obtain from your own backend (via the Authsignal
server-side SDK/API). Set it before calling `email` or `passkey` methods:

```ts
authsignal.setChallengeToken(challengeToken);
```

### Email OTP

```ts
const { data, error } = await authsignal.email.challenge();

// ... user receives an email with a code ...

const { data, error } = await authsignal.email.verify(verificationCode);
```

### Passkey

```ts
if (authsignal.passkey.isSupported()) {
  const { data, error } = await authsignal.passkey.verify();
}
```

To cancel an in-flight request (e.g. an autofill/conditional UI request when unmounting a
screen):

```ts
authsignal.passkey.cancel();
```

## Development

This package has no bundled example app yet. To try it locally, link it into a test app with
[`npx expo install authsignal-flows-react-native`](https://docs.expo.dev/modules/get-started/) or
`npm link`, and run `npm run build` to compile the TypeScript sources.

- `npm run build` — compile TypeScript
- `npm run lint` — lint the TypeScript sources
- `npm run test` — run Jest tests
- `npm run open:ios` — open the example app's iOS project in Xcode (once an example app exists)
