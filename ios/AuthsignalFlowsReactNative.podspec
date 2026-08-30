Pod::Spec.new do |s|
  s.name           = 'AuthsignalFlowsReactNative'
  s.version        = '0.1.0'
  s.summary        = 'The official Authsignal Flows React Native library.'
  s.description    = 'React Native wrapper around the Authsignal Flows iOS SDK (email OTP and passkey authentication).'
  s.author         = 'Authsignal'
  s.homepage       = 'https://github.com/authsignal/authsignal-flows-react-native'
  # 15.1 is ExpoModulesCore's own floor (see its podspec) — there's nothing in this
  # wrapper or in authsignal-flows-ios (13.0+) that needs anything higher than that.
  s.platforms      = {
    :ios => '15.1'
  }
  s.source         = { git: 'https://github.com/authsignal/authsignal-flows-react-native.git', tag: "v#{s.version}" }
  s.license        = { :type => 'MIT', :file => '../LICENSE' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'
  s.dependency 'AuthsignalFlows', '~> 1.0.0-alpha1'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
